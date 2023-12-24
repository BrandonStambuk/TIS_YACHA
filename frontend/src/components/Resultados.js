import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './css/eventList.css';
import Swal from 'sweetalert2';
import { URL_API } from '../const';

const endpoint = URL_API;

const Resultados = () => {
  const [pagina, setPagina] = useState(0);
  const [participantes, setParticipantes] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    getAllParticipantes();
  }, []);

  const getAllParticipantes = async () => {
    const response = await axios.get(`${endpoint}/inscritos/${id}`);
    setParticipantes(response.data);
  };

  const cambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };
  const handleEditar = () => {
  }

  const participantesPorPagina = 5;
  const inicio = pagina * participantesPorPagina;
  const fin = inicio + participantesPorPagina;
  const participantesVisibles = participantes.slice(inicio, fin);
  const totalPaginas = Math.ceil(participantes.length / participantesPorPagina);

  return (
    <div>
      <NavbarAdmin />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-10">
            <div className="card card-translucent">
              <h3 className="card-header">Participantes</h3>
              <div className="card-body table-responsive tabla-contenedor">
                <table>
                  <thead className='text-white'>
                    <tr>
                      <th className="centrado">Nombre</th>
                      <th className="centrado">Apellido</th>
                      <th className="centrado">Equipo</th>
                      <th className="centrado">Problemas Resueltos</th>
                      <th className="centrado">Penalidad</th>
                      <th className="centrado">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participantesVisibles && participantesVisibles.length > 0 && (() => {
                      let rows = [];
                      for (let i = 0; i < participantesVisibles.length; i++) {
                        let usuario = participantesVisibles[i];
                        rows.push(
                          <tr key={usuario.id}>
                            <td className="centrado">{usuario.nombre}</td>
                            <td className="centrado">{usuario.apellido}</td>
                            <td className="centrado">{usuario.nombre_equipo}</td>
                            <td className="centrado">{usuario.problemas_resueltos ? usuario.problemas_resueltos : "Sin definir"}</td>
                            <td className="centrado">{usuario.penalidad ? usuario.penalidad : "Sin definir"}</td>
                            <td className="centrado centrar-botones">
                                <button onClick={handleEditar} className="btn btn-editar">
                                    Modificar Notas
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

export default Resultados;