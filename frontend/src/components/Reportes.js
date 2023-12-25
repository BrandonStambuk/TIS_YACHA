import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarAdmin from './NavbarAdmin';
import './css/eventList.css';
import { URL_API } from '../const';
import NavbarOrganizador from './NavbarOrganizador';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';

const endpoint = URL_API;

const Reportes = () => {
    const rol = localStorage.getItem('role');
    const isAuthenticated = localStorage.getItem('token');

    const [pagina, setPagina] = useState(0);
    const [eventos, setEventos] = useState([]);
    const [tipoEventos, setTipoEventos] = useState([]);
    const [tipoEvento, setTipoEvento] = useState("");
    const [gestion, setGestion] = useState("");
    const [estado, setEstado] = useState("");
    const [participantes, setParticipantes] = useState("");

    const cambiarPagina = (nuevaPagina) => {
        setPagina(nuevaPagina);
    };

    const eventosPorPagina = 5;
    const inicio = pagina * eventosPorPagina;
    const fin = inicio + eventosPorPagina;
    const eventosVisibles = eventos.slice(inicio, fin);
    const totalPaginas = Math.ceil(eventos.length / eventosPorPagina);

    const getTipoEventos = async () => {
        const response = await axios.get(`${endpoint}/tipoEventosDinamicosPublicos`);
        setTipoEventos(response.data);
    }

    const getEventosFiltrados = async () => {
        const response = await axios.post(`${endpoint}/reporte`, {
            tipo: tipoEvento,
            gestion: gestion,
            estado: estado,
            participantes: participantes,
        });
        setEventos(response.data);
    };


    const opcionesTipoEventos = tipoEventos.map((tipoEvento) => (
        <option key={tipoEvento.id} value={tipoEvento.id}>
            {tipoEvento.nombre_tipo_evento_dinamico}
        </option>
    ));

    const exportarExcel = () => {
        const data = eventos.map((evento) => ({
            Nombre: evento.nombre_evento_dinamico,
            Tipo: evento.tipo_evento_dinamico.nombre_tipo_evento_dinamico,
            Gestión: evento.fecha_inscripcion_evento[0].fecha_fin_inscripcion.substring(0, 4),
            Estado: evento.mostrar_publico === 1 ? 'Publico':'Privado',
            Participantes: evento.cantidad_participantes_evento_dinamico,
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Eventos');

        XLSX.writeFile(wb, 'reporte_eventos.xlsx');
    };

    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte', 95, 10);
        doc.autoTable({
            head: [['Nombre', 'Tipo', 'Gestión', 'Estado', 'Participantes']],
            body: eventos.map((evento) => [
                evento.nombre_evento_dinamico,
                evento.tipo_evento_dinamico.nombre_tipo_evento_dinamico,
                evento.fecha_inscripcion_evento[0].fecha_fin_inscripcion.substring(0, 4),
                evento.mostrar_publico === 1 ? 'Publico':'Privado',
                evento.cantidad_participantes_evento_dinamico,
            ]),
        });
        doc.save('reporte_eventos.pdf');
    };

    useEffect(() => {
        getEventosFiltrados();
        getTipoEventos();
    }, [tipoEvento, gestion, estado, participantes]);


    return (
        <div>
            {isAuthenticated && (
                rol === "Admin" ? <NavbarAdmin /> : (rol === "Creador" ? <NavbarOrganizador /> : null)
            )}
            <div className="container mt-5">
                <div className="row">
                    <select className="col-md-3" aria-label="Default select example"
                        value={tipoEvento}
                        onChange={(e) => setTipoEvento(e.target.value)}
                    >
                        <option defaultValue value="">Tipo</option>
                        {opcionesTipoEventos}
                    </select>

                    <select className="col-md-3" aria-label="Default select example"
                        value={gestion}
                        onChange={(e) => setGestion(e.target.value)}
                    >
                        <option defaultValue value="">Gestión</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>

                    <select className="col-md-3" aria-label="Default select example"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option defaultValue value="">Estado</option>
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                    <select className="col-md-3" aria-label="Default select example"
                        value={participantes}
                        onChange={(e) => setParticipantes(e.target.value)}
                    >
                        <option defaultValue value="">Participantes</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <div className="col-md-12">
                        <div className="card card-translucent">
                            <h3 className="card-header">Reporte</h3>
                            <div className="card-body table-responsive tabla-contenedor">
                                <table>
                                    <thead className='text-white'>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Tipo</th>
                                            <th>Gestión</th>
                                            <th>Estado</th>
                                            <th>Participantes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eventosVisibles.map((evento) => (
                                            <tr key={evento.id}>
                                                <td><Link to={`/reporte-especifico/${evento.id}`}>{evento.nombre_evento_dinamico}</Link></td>
                                                <td>{evento.tipo_evento_dinamico.nombre_tipo_evento_dinamico}</td>
                                                <td>{evento.fecha_inscripcion_evento[0].fecha_fin_inscripcion.substring(0, 4)}</td>
                                                <td>{evento.mostrar_publico === 1 ? 'Publico':'Privado'}</td>
                                                <td>{evento.cantidad_participantes_evento_dinamico}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-center">
                                <ul className="pagination">
                                    <li className={`page-item ${pagina === 0 && 'disabled'}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => cambiarPagina(pagina - 1)}
                                        >
                                            Anterior
                                        </button>
                                    </li>
                                    {Array(totalPaginas)
                                        .fill(0)
                                        .map((_, index) => (
                                            <li
                                                className={`page-item ${index === pagina && 'active'}`}
                                                key={index}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => cambiarPagina(index)}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                    <li
                                        className={`page-item ${pagina === totalPaginas - 1 && 'disabled'}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => cambiarPagina(pagina + 1)}
                                        >
                                            Siguiente
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button className='btn btn-primary float-end' onClick={exportarExcel}>Exportar a Excel</button>
                        <button className='btn btn-primary float-end' onClick={exportarPDF}>Exportar a PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reportes;