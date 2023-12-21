import React, { useState, useEffect } from 'react';
import NavbarAdmin from './NavbarAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Noticia.css";
import { URL_API } from './const';
import axios from 'axios';
import { Link } from 'react-router-dom';

const endpoint = URL_API;

const TablaNoticia = () => {
  const [noticias, setNoticias] = useState([]);

  // Recuperar noticias al montar el componente
  useEffect(() => {
    axios.get(`${endpoint}/noticiasDisponibles`)
      .then(response => {
        setNoticias(response.data);
      })
      .catch(error => {
        console.error('Error al recuperar noticias:', error);
      });
  }, []); // La dependencia vacía asegura que se ejecute solo al montar el componente


  const handleEliminarNoticia = (id) => {
    // Lógica para eliminar la noticia con el ID proporcionado
    axios.delete(`${endpoint}/eliminarNoticia/${id}`)

      .then(response => {
        // Actualizar la lista de noticias después de eliminar
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
            {/* Card translucent que envuelve la tabla */}
            <div className="card card-translucent">
              {/* Card header */}
              <h3 className='card-header'>Noticias Disponibles</h3>
              <div className="card-body">
                {/* Tabla para mostrar las noticias */}
                <div className="row">
                  <div className="col-md-12">
                    <table>
                      <thead className='text-white'>
                        <tr>
                          <th className='centrado'>Título</th>
                          <th className='centrado'>Contenido</th>
                          <th className='centraod'>Eliminar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {noticias.map(noticia => (
                          <tr key={noticia.id}>
                            <td className='centrado'>{noticia.titulo}</td>
                            <td className='centrado'>{noticia.contenido}</td>
                            <td>
                              <button
                                className="btn btn-danger"
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
