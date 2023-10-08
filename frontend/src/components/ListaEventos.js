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
    await axios.delete(`${endpoint}/evento/${id}`);
    getAllEventos();
  };

  const cambiarPagina=(nuevaPagina)=>{
    setPagina(nuevaPagina);
  };

  const eventosPorPagina=7;
  //const inicio=pagina*eventosPorPagina;
  //const fin=inicio+eventosPorPagina;
  //const eventosVisibles=eventos.slice(inicio,fin);
  const totalPaginas=Math.ceil(eventos.length/eventosPorPagina);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
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
                        <td>{evento.descripcion}</td>
                        <td>
                          <Link to={`/edit/${evento.id}`} className="btn btn-info">
                            Editar
                          </Link>
                          <button
                            onClick={() => deleteEvento(evento.id)}
                            className="btn btn-danger"
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
          <div className="col-md-4">
          <div className="card card-translucent">
            <h3 className="card-header">Eventos Pasados</h3>
            <div className="card-body table-responsive tabla-contenedor">
              <table>
                <thead>
                  <tr>
                    <th className='text-white'>Nombre</th>
                    <th className='text-white'>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Evento 1</td>
                    <td>Tipo 1</td>
                  </tr>
                  <tr>
                    <td>Evento 2</td>
                    <td>Tipo 2</td>
                  </tr>
                 </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row mt-3">
        <div className="col-md-8 text-center">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${pagina===0 ? 'disabled':''}`}>
                <button className="page-link" onClick={()=>cambiarPagina(pagina-1)}>
                  Anterior
                </button>
              </li>
              {Array.from({length:totalPaginas}).map((_,index)=>(
                <li key={index} className={`page-item ${pagina===index ? 'active':''}`}>
                  <button className="page-link" onClick={()=>cambiarPagina(index)}>
                    {index+1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${pagina===totalPaginas-1 ? 'disabled':''}`}>
                <button className="page-link" onClick={()=>cambiarPagina(pagina+1)}>
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div>
        <Link to="/create" className="btn btn-success mt-1 mb-2 text-white crear">
          Crear Evento
        </Link>
      </div>
     </div>
     
      </div>
    </div>
  );
};

export default ListaEventos;
