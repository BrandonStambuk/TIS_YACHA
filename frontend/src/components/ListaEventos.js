import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './css/eventList.css';

const endpoint = 'http://localhost:8000/api';

const ListaEventos = () => {
  const [pagina, setPagina] = useState(0);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    getAllEventos();
  }, []);

  const getAllEventos = async () => {
    const response = await axios.get(`${endpoint}/eventos`);
    setEventos(response.data);
  };

  const deleteEvento = async (id) => {
    await axios.delete(`${endpoint}/eventos/${id}`);
    getAllEventos();
  };

  const cambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  const eventosPorPagina = 7;
  const totalPaginas = Math.ceil(eventos.length / eventosPorPagina);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-10">
            <div className="card card-translucent">
              <h3 className="card-header">Eventos Disponibles</h3>
              <div className="card-body table-responsive tabla-contenedor">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Fecha de inicio</th>
                      <th>Fecha Fin</th>
                      <th>Duración (horas)</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventos.map((evento) => (
                      <tr key={evento.id}>
                        <td>{evento.nombre_evento}</td>
                        <td>{evento.tipo_evento}</td>
                        <td>{evento.fecha_inicio}</td>
                        <td>{evento.fecha_fin}</td>
                        <td className="centrado">{evento.hora}</td>
                        <td className="centrar-botones">
                          <Link to={`/edit/${evento.id}`} className="btn btn-editar">
                            Editar
                          </Link>
                          <button
                            onClick={() => deleteEvento(evento.id)}
                            className="btn btn-eliminar"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <Link to="/create" className="btn btn-success text-white crear">
              Crear Evento
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

export default ListaEventos;
