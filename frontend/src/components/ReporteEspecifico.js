import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './css/eventList.css';
import Swal from 'sweetalert2';
import { URL_API } from '../const';
import NavbarOrganizador from './NavbarOrganizador';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const endpoint = URL_API;


const ReporteEspecifico = () => {
    const [pagina, setPagina] = useState(0);
    const [eventos, setEventos] = useState([])
    const [tipoEvento, setTipoEvento] = useState("s")
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getAllEventos();
        // console.log(eventosVisibles);
    }, []);

    const getAllEventos = async () => {
        const response = await axios.get(`${endpoint}/eventosDinamicos/${id}`);
        console.log(response.data);
        setEventos(response.data.inscripcion);
        // console.log(eventos);
        // console.log(response.data.tipo_evento_dinamico.tieneNota);
        // setTipoEvento(response.data.tipo_evento_dinamico.tieneNota);
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
        const data = eventos.map((evento) => ({
            Nombre_Equipo: evento.nombre_equipo,
            Problemas: evento.problemas_resueltos ? evento.problemas_resueltos : "0",
            Penalidad: evento.penalidad ? evento.penalidad : "0",
        }));

        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Reporte");
        XLSX.writeFile(workBook, "Reporte_Especifico.xlsx");
    }

    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Nombre_Equipo', 'Problemas', 'Penalidad', 'Nombre_Participante', 'Apellido_Participante', 'Correo_Participante']],
            body: eventos.map((evento) => [
                evento.nombre_equipo,
                evento.problemas_resueltos ? evento.problemas_resueltos : "0",
                evento.penalidad ? evento.penalidad : "0",
            ]),
        });
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
                            <h3 className="card-header">Reporte Especifico</h3>
                            <div className="card-body table-responsive tabla-contenedor">
                                {tipoEvento === null ? (
                                    <table>
                                        <thead className='text-white'>
                                            <tr>
                                                <th className="centrado">Nombre Equipo</th>
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
                                                        <td className="centrado" rowSpan={evento.paticipante.length}>
                                                            {evento.nombre_equipo}
                                                        </td>
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
                                                <th className="centrado">Nombre Equipo</th>
                                                <th className="centrado">Nombre Participante</th>
                                                <th className="centrado">Apellido Participante</th>
                                                <th className="centrado">Correo Participante</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventosVisibles.map((evento) => (
                                                <React.Fragment key={evento.id}>
                                                    <tr>
                                                        <td className="centrado" rowSpan={evento.paticipante.length}>
                                                            {evento.nombre_equipo}
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