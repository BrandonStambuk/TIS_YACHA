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
    const [eventos, setEventos] = useState([]);
    const [fecha_evento, setFecha_evento] = useState([]);

    const cambiarPagina = (nuevaPagina) => {
        setPagina(nuevaPagina);
    };

    const getAllEventos = async () => {
        const response = await axios.get(`${endpoint}/eventosDinamicos`);
        setEventos(response.data);
        const fechas = await axios.get(`${endpoint}/fechasInscripcion`);
        setFecha_evento(fechas.data);
    };

    const eventosPorPagina = 5;
    const inicio = pagina * eventosPorPagina;
    const fin = inicio + eventosPorPagina;
    const eventosVisibles = eventos.slice(inicio, fin);
    const totalPaginas = Math.ceil(eventos.length / eventosPorPagina);

    useEffect(() => {
        getAllEventos();
    }, []);
    return(
        <div>
        <NavbarAdmin />
        <div className="container mt-5">
        <div className="row">
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
                      <th className="centrado">Lugar del evento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventosVisibles && eventosVisibles.length > 0 && (() => {
                      let rows = [];
                      for (let i = 0; i < eventosVisibles.length; i++) {
                        let evento = eventosVisibles[i];
                        rows.push(
                          <tr key={evento.id}>
                            <td className="centrado">{evento.nombre_evento_dinamico}</td>
                            <td className="centrado">{evento.tipo_evento_dinamico.nombre_tipo_evento_dinamico}</td>
                            <td className="centrado">{evento.fecha_inscripcion_evento[0].fecha_inicio_inscripcion}</td>
                            <td className="centrado">{evento.lugar_evento_dinamico}</td>
                            <td className="centrado">{evento.cantidad_participantes_evento_dinamico}</td>
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
