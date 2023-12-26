import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './css/eventList.css';
import Swal from 'sweetalert2';
import { URL_API } from '../const';
import NavbarOrganizador from './NavbarOrganizador';

const endpoint = URL_API;

const ListaEventos = () => {
  const [pagina, setPagina] = useState(0);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    getAllEventos();
  }, []);

  const getAllEventos = async () => {
    const response = await axios.get(`${endpoint}/eventosDinamicosCompetencia`);
    setEventos(response.data);
    console.log(response.data);
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
      cancelButtonText: 'Cancelar',
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await axios.get(`${endpoint}/existeInscripcion/${id}`);        
        console.log(response.data);
        if (response.data){
          const { isConfirmed } = await Swal.fire({
            title: '¡Advertencia!',
            text: 'La competencia tiene inscripciones activas. ¿Deseas eliminarlo de todos modos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar',
          });
          if (isConfirmed){
            const { value: extraMessage } = await Swal.fire({
              title: '¿Desea adjuntar información adicional?',
              html: '<input type="text" id="extra-message" class="swal2-input" placeholder="Mensaje extra">',
              icon: 'info',
              showCancelButton: true,
              cancelButtonColor: '#d33',
              cancelButtonText: 'No, solo notificar',
              showConfirmButton: true,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Adjuntar',
              allowOutsideClick: false,
              preConfirm: () => {
                  return document.getElementById('extra-message').value;
              }
            });
            if (extraMessage){
              Swal.fire({
                title: 'Adjuntando información adicional a las notificaciones',
                text: 'Espere un momento por favor',
                icon: 'info',
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                },
              });
              await axios.post(`${endpoint}/notificarEliminado/${id}?personalizedMessage=${encodeURIComponent(extraMessage)}`);
              Swal.fire({
                title: 'Notificación Enviada',
                text: 'Se ha notificado a los inscritos',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: true,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Entendido',
              });
              deleteEvento(id);
              Swal.fire('¡Eliminado!', 'La competencia ha sido eliminado.', 'success');
            }else{
              Swal.fire({
                title: 'Notificando a los inscritos',
                text: 'Espere un momento por favor',
                icon: 'info',
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                },
              });
              await axios.post(`${endpoint}/notificarEliminado/${id}`);
              Swal.fire({
                title: 'Notificación Enviada',
                text: 'Se ha notificado a los inscritos',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: true,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Entendido',
              });
              deleteEvento(id);
              Swal.fire('¡Eliminado!', 'La competencia ha sido eliminado.', 'success');
            }
          }else{
            Swal.fire('Cancelado', 'La competencia no ha sido eliminado', 'error');
          }
        }else{
          deleteEvento(id);
          Swal.fire('¡Eliminado!', 'La competencia ha sido eliminado.', 'success');
        }        
      }
    });
  };

  const deleteEvento = async (id) => {
    await axios.delete(`${endpoint}/eliminarEventoDinamico/${id}`);
    getAllEventos();
  };

  const cambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  const eventosPorPagina = 5;
  const inicio = pagina * eventosPorPagina;
  const fin = inicio + eventosPorPagina;
  const eventosVisibles = eventos.slice(inicio, fin);
  const totalPaginas = Math.ceil(eventos.length / eventosPorPagina);

  const isAuthenticated = localStorage.getItem('token');
  const rol = localStorage.getItem('role');

  return (
    <div>
      {isAuthenticated && (
      rol === "Admin" ? <NavbarAdmin /> : (rol === "Creador" ? <NavbarOrganizador /> : null)
      )}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-10">
            <div className="card card-translucent">
              <h3 className="card-header">Competencias Disponibles</h3>
              <div className="card-body table-responsive tabla-contenedor">
                <table>
                  <thead className='text-white'>
                    <tr>
                      <th className="centrado">Nombre</th>
                      <th className="centrado">Tipo</th>
                      <th className="centrado">Fecha de inicio Inscripción</th>
                      <th className="centrado">Competencia Publicada</th>
                      <th className="centrado">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventosVisibles && eventosVisibles.length > 0 && (() => {
                      let rows = [];
                      for (let i = 0; i < eventosVisibles.length; i++) {
                        let evento = eventosVisibles[i];
                        rows.push(
                          <tr key={evento.id}>
                            <td className="centrado"><Link className="text-black" to={`/detalles/${evento.id}`}>{evento.nombre_evento_dinamico}</Link></td>
                            <td className="centrado">{evento.tipo_evento_dinamico.nombre_tipo_evento_dinamico}</td>
                            <td className="centrado">{evento.fecha_inscripcion_evento[0].fecha_inicio_inscripcion}</td>
                            <td className="centrado">{evento?.mostrar_publico? "Si": "No"}</td>
                            <td className="centrado centrar-botones">
                              <Link to={`/editCompetencia/${evento.id}`} className="btn btn-editar">
                                Editar
                              </Link>
                              <button
                                onClick={() => confirmarEliminacion(evento.id)}
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

export default ListaEventos;