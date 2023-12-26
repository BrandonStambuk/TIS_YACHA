import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './css/eventList.css';
import Swal from 'sweetalert2';
import { URL_API } from '../const';

const endpoint = URL_API;

const ListaUsuarios = () => {
  const [pagina, setPagina] = useState(0);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getAllUsuarios();
  }, []);

  const getAllUsuarios = async () => {
    const response = await axios.get(`${endpoint}/usuarioss`);
    setUsuarios(response.data);
  };

  const confirmarEliminacion = (id) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este usuario?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, elimina el evento
        deleteUsuarios(id);

        Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
      }
    });
  };

  const deleteUsuarios= async (id) => {
    await axios.delete(`${endpoint}/usuarioss/${id}`);

    getAllUsuarios();
  };

  const cambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  const usuariosPorPagina = 5;
  const inicio = pagina * usuariosPorPagina;
  const fin = inicio + usuariosPorPagina;
  const usuariosVisibles = usuarios.slice(inicio, fin);
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  return (
    <div>
      <NavbarAdmin />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-10">
            <div className="card card-translucent">
              <h3 className="card-header">Usuarios Registrados</h3>
              <div className="card-body table-responsive tabla-contenedor">
                <table>
                  <thead className='text-white'>
                    <tr>
                      <th className="centrado">Nombre</th>
                      <th className="centrado">Apellido</th>
                      <th className="centrado">Email</th>
                      <th className="centrado">Rol</th>
                      <th className="centrado">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosVisibles && usuariosVisibles.length > 0 && (() => {
                      let rows = [];
                      for (let i = 0; i < usuariosVisibles.length; i++) {
                        let usuario = usuariosVisibles[i];
                        rows.push(
                          <tr key={usuario.id}>
                            <td className="centrado">{usuario.firstName}</td>
                            <td className="centrado">{usuario.lastName}</td>
                            <td className="centrado">{usuario.email}</td>
                            <td className="centrado">{usuario.role === 'Creador' ? 'Organizador' : usuario.role}</td>
                            <td className="centrado centrar-botones">
                              <button
                                onClick={() => confirmarEliminacion(usuario.id)}
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

export default ListaUsuarios;