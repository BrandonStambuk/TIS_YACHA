import React, { useState, useEffect } from 'react';
import NavbarAdmin from './NavbarAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Noticia.css";
import { URL_API } from './const';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const endpoint = URL_API;

// Función para truncar el contenido
const truncate = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const TablaNoticia = () => {
  const [noticias, setNoticias] = useState([]);
  const [pagina, setPagina] = useState(0);

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
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar esta noticia?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNoticia(id);
        Swal.fire('¡Eliminado!', 'La noticia ha sido eliminada.', 'success');
      }
    });
  };
  const deleteNoticia = (id) => {

    axios.delete(`${endpoint}/eliminarNoticia/${id}`)
      .then(response => {
        setNoticias(prevNoticias => prevNoticias.filter(noticia => noticia.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar noticia:', error);
      });
  };
  const cambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  const noticiasPorPagina = 5;
  const inicio = pagina * noticiasPorPagina;
  const fin = inicio + noticiasPorPagina;
  const noticiasVisibles = noticias.slice(inicio, fin);
  const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);

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
                          <th className='centrado'>Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {noticiasVisibles && noticiasVisibles.length > 0 && (() => {
                          let rows = [];
                          for (let i = 0; i < noticiasVisibles.length; i++) {
                            let noticia = noticiasVisibles[i];
                            rows.push(
                              <tr key={noticia.id}>
                                <td className='centrado'>{noticia.titulo}</td>
                                <td className="event-description centrado" dangerouslySetInnerHTML={{ __html: truncate(noticia.contenido, 20) }} />
                                <td className='centrado'>
                                  <Link
                                    className="btn btn-warning centrado"
                                    to={`/editNoticia/${noticia.id}`}
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    className="btn btn-danger centrado"
                                    onClick={() => handleEliminarNoticia(noticia.id)}
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
            </div>
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <Link to="/crear-noticia" className="btn btn-success text-white crear">
              Crear Noticia
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

export default TablaNoticia;