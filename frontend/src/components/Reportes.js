import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './css/eventList.css';
import Swal from 'sweetalert2';
import { URL_API } from '../const';

const endpoint = URL_API;



const Reportes = () => {
    const [pagina, setPagina] = useState(0);
    const [tipoEventos, setTipoEventos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [filtroGestion, setFiltroGestion] = useState("todos");
    const [filtroEstado, setFiltroEstado] = useState("todos");
    const [filtroTipo, setFiltroTipo] = useState("todos");

    const cambiarPagina = (nuevaPagina) => {
        setPagina(nuevaPagina);
    };
    const getTipoEventosDinamicos = async () => {
        const response = await axios.get(`${endpoint}/tipoEventosDinamicos`);
        setTipoEventos(response.data);
    };

    const opcionesTipoEventos = () => {
        let opciones = [];
        opciones.push(<option value="todos">Todos</option>);
        for (let i = 0; i < tipoEventos.length; i++) {
            let tipoEvento = tipoEventos[i];
            opciones.push(
                <option value={tipoEvento.id}>{tipoEvento.nombre_tipo_evento_dinamico}</option>
            );
        }
        return opciones;
    };


    const getAllEventos = async () => {
        const response = await axios.get(`${endpoint}/eventosDinamicos`);
        setEventos(response.data);
    };

    const getEventosPasados = async () => {
        const response = await axios.get(`${endpoint}/eventosPasados`);
        setEventos(response.data);
    }

    const getEventosAcivos = async () => {
        const response = await axios.get(`${endpoint}/eventosActivos`);
        setEventos(response.data);
    }

    const getEventosGestion = async (e) => {
        const response = await axios.get(`${endpoint}/eventosGestion/${e}`);
        setEventos(response.data);
    }

    const getEventosPorTipo = async (e) => {
        const response = await axios.get(`${endpoint}/eventosPorTipo/${e}`);
        setEventos(response.data);
    }

    const filtrarPorEstado = async () => {
        switch (filtroEstado) {
            case "todos":
                await getAllEventos();
                break;
            case "pasado":
                await getEventosPasados();
                break;
            case "activo":
                await getEventosAcivos();
                break;
            default:
                break;
        }
    };

    const filtrarPorTipo = async () => {
        switch (filtroTipo) {
            case "todos":
                await getAllEventos();
                break;
            default:
                await getEventosPorTipo(filtroTipo);
                break;
        }
    };

    const filtrarPorGestion = async () => {
        switch (filtroGestion) {
            case "todos":
                await getAllEventos();
                break;
            default:
                await getEventosGestion(filtroGestion);
                break;
        }
    };

    const eventosPorPagina = 5;
    const inicio = pagina * eventosPorPagina;
    const fin = inicio + eventosPorPagina;
    const eventosVisibles = eventos.slice(inicio, fin);
    const totalPaginas = Math.ceil(eventos.length / eventosPorPagina);

    useEffect(() => {
        getAllEventos();
        getTipoEventosDinamicos();
    }, []);

    return (
        <div>
            <NavbarAdmin />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={filtrarPorGestion} className='btn btn-secondary'>
                            Gestion:
                        </button>
                        <select
                            className='col-md-2'
                            value={filtroGestion}
                            onChange={(e) => setFiltroGestion(e.target.value)}>
                            <option value="todos">Todos</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>


                        <button onClick={filtrarPorEstado} className='btn btn-secondary'>
                            Estado:
                        </button>
                        <select
                            className='col-md-2'
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                        >
                            <option value="todos">Todos</option>
                            <option value="pasado">Pasado</option>
                            <option value="activo">Activo</option>
                        </select>


                        <button onClick={filtrarPorTipo} className='btn btn-secondary'>
                            Tipo:
                        </button><select
                            className='col-md-2'
                            value={filtroTipo}
                            onChange={(e) => setFiltroTipo(e.target.value)}
                        >
                            {opcionesTipoEventos()}
                        </select>


                    </div>
                    <div className="col-md-12">
                        <div className="card card-translucent">
                            <h3 className="card-header">Reporte </h3>
                            <div className="card-body table-responsive tabla-contenedor">
                                <table>
                                    <thead className='text-white'>
                                        <tr>
                                            <th className="centrado">N°</th>
                                            <th className="centrado">Nombre</th>
                                            <th className="centrado">Tipo</th>
                                            <th className="centrado">Fecha de inicio Inscripcion</th>
                                            <th className="centrado">Fecha de fin Inscripcion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eventosVisibles && eventosVisibles.length > 0 && (() => {
                                            let rows = [];
                                            for (let i = 0; i < eventosVisibles.length; i++) {
                                                let evento = eventosVisibles[i];
                                                rows.push(
                                                    <tr key={evento.id}>
                                                        <td className="centrado">{i + 1}</td>
                                                        <td className="centrado">{evento.nombre_evento_dinamico}</td>
                                                        <td className="centrado">{evento.tipo_evento_dinamico.nombre_tipo_evento_dinamico}</td>
                                                        <td className="centrado">{evento.fecha_inscripcion_evento[0].fecha_inicio_inscripcion}</td>
                                                        <td className="centrado">{evento.fecha_inscripcion_evento[0].fecha_fin_inscripcion}</td>
                                                    </tr>
                                                );
                                            }
                                            return rows;
                                        })()}
                                    </tbody>
                                </table>
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
            </div>
        </div>
    );
};

export default Reportes;
