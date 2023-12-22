import React, { useState, useEffect } from 'react';
import NavbarAdmin from './NavbarAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Noticia.css";
import { URL_API } from './const';
import axios from 'axios';
import { Link } from 'react-router-dom';

const endpoint = URL_API;

// Función para truncar el contenido
const truncate = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const TablaNoticia = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    axios.get(`${endpoint}/noticiasDisponibles`)
      .then(response => {
        setNoticias(response.data);
      })
      .catch(error => {
        console.error('Error al recuperar noticias:', error);
      });
  }, []);

  const handleEliminarNoticia = (id) => {
    axios.delete(`${endpoint}/eliminarNoticia/${id}`)
      .then(response => {
        setNoticias(prevNoticias => prevNoticias.filter(noticia => noticia.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar noticia:', error);
      });
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-10">
            <div className="card card-translucent">
              <h3 className='card-header'>Noticias Disponibles</h3>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <table>
                      <thead className='text-white'>
                        <tr>
                          <th className='centrado'>Título</th>
                          <th className='centrado'>Contenido</th>
                          <th className=''>Eliminar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {noticias.map(noticia => (
                          <tr key={noticia.id}>
                            <td className='centrado'>{noticia.titulo}</td>
                            <td className="event-description centrado" style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: truncate(noticia.contenido, 20) }} />
                            <td>
                              <button
                                className="btn btn-danger centrado"
                                onClick={() => handleEliminarNoticia(noticia.id)}
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
            </div>
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <Link to="/crear-noticia" className="btn btn-success text-white crear">
              Crear Noticia
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaNoticia;