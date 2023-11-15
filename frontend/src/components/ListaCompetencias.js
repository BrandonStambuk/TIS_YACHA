import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './css/eventList.css';
import Swal from 'sweetalert2';
import { URL_API } from "./const";
const endpoint = URL_API;

const ListaCompetecias = () => {
  const [pagina, setPagina] = useState(0);
  const [competencias, setCompetencias] = useState([]);

  useEffect(() => {
    getAllCompetencias();
  }, []);

  const getAllCompetencias = async () => {
    const response = await axios.get(`${endpoint}/competencias`);
    setCompetencias(response.data);
  };

  const confirmarEliminacion = (id) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar esta competencia?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, elimina el evento
        deleteCompetencia(id);
        Swal.fire('¡Eliminado!', 'El evento ha sido eliminado.', 'success');
      }
    });
  };

  const deleteCompetencia = async (id) => {
    await axios.delete(`${endpoint}/competencias/${id}`);
    getAllCompetencias();
  };

  const cambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  const eventosPorPagina = 5;
  const inicio = pagina * eventosPorPagina;
  const fin = inicio + eventosPorPagina;
  const eventosVisibles =  competencias.slice(inicio, fin);
  const totalPaginas = Math.ceil(competencias.length / eventosPorPagina);

  return (
    <div>
      <NavbarAdmin />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-10">
            <div className="card card-translucent">
              <h3 className="card-header">Eventos Disponibles</h3>
              <div className="card-body table-responsive tabla-contenedor">
                <table>
                  <thead className='text-white'>
                    <tr>
                      <th className="centrado">Nombre</th>
                      <th className="centrado">Cantidad participantes</th>
                      <th className="centrado">Fecha de inicio Competencia</th>
                      <th className="centrado">Duración (horas)</th>
                      <th className="centrado">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventosVisibles && eventosVisibles.length > 0 && (() => {
                      let rows = [];
                      for (let i = 0; i < eventosVisibles.length; i++) {
                        let competencia = eventosVisibles[i];
                        rows.push(
                          <tr key={competencia.id}>
                            <td className="centrado">{competencia.nombre_competencia}</td>
                            <td className="centrado">{competencia.integrantes_competencia}</td>
                            <td className="centrado">{competencia.fecha_competencia}</td>
                            <td className="centrado">{competencia.horas_competencia}</td>
                            <td className="centrado centrar-botones">
                              <Link to={`/editCompetencia/${competencia.id}`} className="btn btn-editar">
                                Editar
                              </Link>
                              <button
                                onClick={() => confirmarEliminacion(competencia.id)}
                                className="btn btn-eliminar"
                              >
                                Eliminar
                              </button>
                            </td>
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
          <div className="col-md-2 d-flex align-items-center">
            <Link to="/createCompe" className="btn btn-success text-white crear">
              Crear Competencia
            </Link>
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

export default ListaCompetecias;