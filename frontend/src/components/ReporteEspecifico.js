import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './css/eventList.css';
import Swal from 'sweetalert2';
import { URL_API } from '../const';
import NavbarOrganizador from './NavbarOrganizador';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const endpoint = URL_API;


const ReporteEspecifico = () => {
    const [pagina, setPagina] = useState(0);
    const [eventos, setEventos] = useState([])
    const [tipoEvento, setTipoEvento] = useState()
    const [nombreEvento, setNombreEvento] = useState('');
    const { id } = useParams();
    const [cantidadParticipante, setCantidadParticipante] = useState(0);

    useEffect(() => {
        getAllEventos();
    }, []);

    const getAllEventos = async () => {
        const response = await axios.get(`${endpoint}/eventosDinamicos/${id}`);
        setNombreEvento(response.data.nombre_evento_dinamico);
        const eventosOrdenados = response.data.inscripcion.sort((a, b) => {
            if (a.problemas_resueltos !== b.problemas_resueltos) {
                return b.problemas_resueltos - a.problemas_resueltos;
            }
            return a.penalidad - b.penalidad;
        });
        setEventos(eventosOrdenados);
        setTipoEvento(response.data.tipo_evento_dinamico.tieneNota);
        setCantidadParticipante(response.data.cantidad_participantes_evento_dinamico);
    };

    const cambiarPagina = (nuevaPagina) => {
        setPagina(nuevaPagina);
    };

    const eventosPorPagina = 5;
    const inicio = pagina * eventosPorPagina;
    const fin = inicio + eventosPorPagina;
    const eventosVisibles = eventos.slice(inicio, fin);
    const totalPaginas = Math.ceil(eventos.length / eventosPorPagina);

    const isAuthenticated = localStorage.getItem('token');
    const rol = localStorage.getItem('role');

    const exportarExcel = () => {
        let data = [];
        if (tipoEvento === 1) {
            data = eventos.flatMap((evento) => {
                return evento.paticipante.map((paticipante) => ({
                    "Nombre Equipo": evento.nombre_equipo,
                    "Problemas": evento.problemas_resueltos ? evento.problemas_resueltos : "0",
                    "Penalidad": evento.penalidad ? evento.penalidad : "0",
                    "Nombre Participante": paticipante.nombre,
                    "Apellido Participante": paticipante.apellido,
                    "Correo Participante": paticipante.correo,
                }));
            });
        } else {
            data = eventos.flatMap((evento) => {
                return evento.paticipante.map((paticipante) => ({
                    "Nombre Equipo": evento.nombre_equipo,
                    "Nombre Participante": paticipante.nombre,
                    "Apellido Participante": paticipante.apellido,
                    "Correo Participante": paticipante.correo,
                }));
            });
        }

        if (cantidadParticipante === 1) {
            data.forEach(item => {
                delete item["Nombre Equipo"];
            });
        }

        const wscols = Object.keys(data[0] || {}).map(key => ({ wch: Math.max(15, ...data.map(item => item[key].length)) }));
        const workSheet = XLSX.utils.json_to_sheet(data);
        workSheet['!cols'] = wscols;
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Reporte");
        XLSX.writeFile(workBook, "Reporte_Especifico.xlsx");
    }

    const exportarPDF = () => {
        const doc = new jsPDF();

        if (tipoEvento === 1) {

            let headData = cantidadParticipante === 1
                ? [['Problemas', 'Penalidad', 'Nombre Participante', 'Apellido Participante', 'Correo Participante']]
                : [['Nombre Equipo', 'Problemas', 'Penalidad', 'Nombre Participante', 'Apellido Participante', 'Correo Participante']];
            doc.autoTable({
                head: headData,
                body: eventos.flatMap((evento) => {
                    return evento.paticipante.map((paticipante) => {
                        if (cantidadParticipante === 1) {
                            return [
                                evento.problemas_resueltos ? evento.problemas_resueltos : "0",
                                evento.penalidad ? evento.penalidad : "0",
                                paticipante.nombre,
                                paticipante.apellido,
                                paticipante.correo,
                            ];
                        } else {
                            return [
                                evento.nombre_equipo,
                                evento.problemas_resueltos ? evento.problemas_resueltos : "0",
                                evento.penalidad ? evento.penalidad : "0",
                                paticipante.nombre,
                                paticipante.apellido,
                                paticipante.correo,
                            ];
                        }
                    });
                }),
            });
        } else {
            let headData = cantidadParticipante === 1
                ? [['Nombre Participante', 'Apellido Participante', 'Correo Participante']]
                : [['Nombre Equipo', 'Nombre Participante', 'Apellido Participante', 'Correo Participante']];
            doc.autoTable({
                head: headData,
                body: eventos.flatMap((evento) => {
                    return evento.paticipante.map((paticipante) => {
                        if (cantidadParticipante === 1) {
                            return [
                                paticipante.nombre,
                                paticipante.apellido,
                                paticipante.correo,
                            ];
                        } else {
                            return [
                                evento.nombre_equipo,
                                paticipante.nombre,
                                paticipante.apellido,
                                paticipante.correo,
                            ];
                        }
                    });
                }),
            });
        }
        doc.save("Reporte_Especifico.pdf");
    }

    return (
        <div>
            {isAuthenticated && (
                rol === "Admin" ? <NavbarAdmin /> : (rol === "Creador" ? <NavbarOrganizador /> : null)
            )}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-translucent">
                            <h3 className="card-header">Reporte {nombreEvento}</h3>
                            <div className="card-body table-responsive tabla-contenedor">
                                {tipoEvento === 1 ? (
                                    <table>
                                        <thead className='text-white'>
                                            <tr>
                                                {cantidadParticipante === 1 ? null : (<th className="centrado">Nombre Equipo</th>)}
                                                <th className="centrado">Problemas Resueltos</th>
                                                <th className="centrado">Penalidad</th>
                                                <th className="centrado">Nombre Participante</th>
                                                <th className="centrado">Apellido Participante</th>
                                                <th className="centrado">Correo Participante</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventosVisibles.map((evento) => (
                                                <React.Fragment key={evento.id}>
                                                    <tr>
                                                        {cantidadParticipante === 1 ? null : (<td className="centrado" rowSpan={evento.paticipante.length}>
                                                            {evento.nombre_equipo}
                                                        </td>)}
                                                        <td className="centrado" rowSpan={evento.paticipante.length}>
                                                            {evento.problemas_resueltos ? evento.problemas_resueltos : 0}
                                                        </td>
                                                        <td className="centrado" rowSpan={evento.paticipante.length}>
                                                            {evento.penalidad ? evento.penalidad : 0}
                                                        </td>
                                                        {evento.paticipante.length > 0 && (
                                                            <>
                                                                <td className="centrado">{evento.paticipante[0].nombre}</td>
                                                                <td className="centrado">{evento.paticipante[0].apellido}</td>
                                                                <td className="centrado">{evento.paticipante[0].correo}</td>
                                                            </>
                                                        )}
                                                    </tr>
                                                    {evento.paticipante.slice(1).map((participante) => (
                                                        <tr key={participante.id}>
                                                            <td className="centrado">{participante.nombre}</td>
                                                            <td className="centrado">{participante.apellido}</td>
                                                            <td className="centrado">{participante.correo}</td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <table>
                                        <thead className='text-white'>
                                            <tr>
                                                {cantidadParticipante === 1 ? null : (<th className="centrado">Nombre Equipo</th>)}
                                                <th className="centrado">Nombre Participante</th>
                                                <th className="centrado">Apellido Participante</th>
                                                <th className="centrado">Correo Participante</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventosVisibles.map((evento) => (
                                                <React.Fragment key={evento.id}>
                                                    <tr>
                                                        {cantidadParticipante === 1 ? null : (<td className="centrado" rowSpan={evento.paticipante.length}>
                                                            {evento.nombre_equipo}
                                                        </td>)}
                                                        {evento.paticipante.length > 0 && (
                                                            <>
                                                                <td className="centrado">{evento.paticipante[0].nombre}</td>
                                                                <td className="centrado">{evento.paticipante[0].apellido}</td>
                                                                <td className="centrado">{evento.paticipante[0].correo}</td>
                                                            </>
                                                        )}
                                                    </tr>
                                                    {evento.paticipante.slice(1).map((participante) => (
                                                        <tr key={participante.id}>
                                                            <td className="centrado">{participante.nombre}</td>
                                                            <td className="centrado">{participante.apellido}</td>
                                                            <td className="centrado">{participante.correo}</td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-8 text-center">
                        <nav>
                            <ul className="pagination">
                                <li className={`page-item ${pagina === 0 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => cambiarPagina(pagina - 1)}>
                                        Anterior
                                    </button>
                                </li>
                                {Array.from({ length: totalPaginas }).map((_, index) => (
                                    <li key={index} className={`page-item ${pagina === index ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => cambiarPagina(index)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${pagina === totalPaginas - 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => cambiarPagina(pagina + 1)}>
                                        Siguiente
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <button className='btn btn-primary float-end' onClick={() => exportarExcel()}>
                    Exportar a Excel
                </button>
                <button className='btn btn-primary float-end' onClick={() => exportarPDF()}>
                    Exportar a PDF
                </button>
            </div>
        </div>
    );
};

export default ReporteEspecifico;