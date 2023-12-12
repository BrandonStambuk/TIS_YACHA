import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './css/eventList.css';
import { URL_API } from '../const';
import Swal from 'sweetalert2';

const endpoint = URL_API;

const Reportes = () => {
  const [pagina, setPagina] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtronroRegistrado, setFiltronroRegistrado] = useState('');
  const [filtrofechainicio, setFiltrofechainicio] = useState('');
  const [filtrofechafin, setFiltrofechafin] = useState('');
  const [filtroGestion, setFiltrogestion] = useState('');

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
      <div className="mb-5">
                <select id="gestion" className="form-select form-select-lg" value={filtroGestion}
                  onChange={(e) => setFiltrogestion(e.target.value)} //copia del filtrado del homepage de eventos, sin funcionalidad
                >
                  <option value="">Gestion</option>
                  <option value="Reclutamiento">2022</option> 
                  <option value="Taller de reclutamiento">2023</option>
                </select>
              
                <select id="inicio" className="form-select form-select-lg" value={filtroGestion}
                  onChange={(e) => setFiltrogestion(e.target.value)} //copia del filtrado del homepage de eventos, sin funcionalidad
                >
                  <option value="">Fecha Inicio</option>
                  <option value="Reclutamiento">Enero</option> 
                  <option value="Taller de reclutamiento">Febrero</option>
                  <option value="Reclutamiento">Marzo</option>
                  <option value="Reclutamiento">Abril</option> 
                  <option value="Reclutamiento">Mayo</option> 
                  <option value="Reclutamiento">Junio</option> 
                  <option value="Reclutamiento">Julio</option> 
                  <option value="Reclutamiento">Agosto</option> 
                  <option value="Reclutamiento">Septiembre</option>
                  <option value="Reclutamiento">Octubre</option> 
                  <option value="Reclutamiento">Noviembre</option> 
                  <option value="Reclutamiento">Diciembre</option> 
                </select>
              
                <select id="inicio" className="form-select form-select-lg" value={filtroGestion}
                  onChange={(e) => setFiltrogestion(e.target.value)} //copia del filtrado del homepage de eventos, sin funcionalidad
                >
                  <option value="">Fecha Fin</option>
                  <option value="Reclutamiento">Enero</option> 
                  <option value="Taller de reclutamiento">Febrero</option>
                  <option value="Reclutamiento">Marzo</option>
                  <option value="Reclutamiento">Abril</option> 
                  <option value="Reclutamiento">Mayo</option> 
                  <option value="Reclutamiento">Junio</option> 
                  <option value="Reclutamiento">Julio</option> 
                  <option value="Reclutamiento">Agosto</option> 
                  <option value="Reclutamiento">Septiembre</option>
                  <option value="Reclutamiento">Octubre</option> 
                  <option value="Reclutamiento">Noviembre</option> 
                  <option value="Reclutamiento">Diciembre</option> 
                </select>

                <select id="tipoEvento" className="form-select form-select-lg" value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Reclutamiento">Reclutamiento</option>
                  <option value="Taller de reclutamiento">Taller de reclutamiento</option>
                  <option value="Competencia de entrenamiento">Competencia de entrenamiento</option>
                  <option value="Competencia interna">Competencia interna</option>
                </select>

                <select id="inicio" className="form-select form-select-lg" value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  <option value="">Institucion</option>
                  <option value="Reclutamiento">UMSS</option>
                  <option value="Taller de reclutamiento">Universidad Católica</option>
                  <option value="Competencia de entrenamiento">Universidad Domingo Sabio</option>
                  <option value="Competencia interna">Universidad del Valle</option>
                </select>
              </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-translucent">
              <h3 className="card-header">Reportes Eventos</h3>
              <div className="card-body table-responsive tabla-contenedor">
                <table>
                  <thead className='text-white'>
                    <tr>
                    <th className="centrado">N°</th>
                      <th className="centrado">Nombre</th>
                      <th className="centrado">Tipo</th>
                      <th className="centrado">Fecha inicio</th>
                      <th className="centrado">Fecha Fin</th>
                      <th className="centrado">N° Registrados</th>
                      <th className="centrado">Nombre Equipo</th>
                    </tr>
                  </thead>
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

export default Reportes;