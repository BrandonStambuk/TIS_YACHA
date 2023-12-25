import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './css/eventList.css';
import Swal from 'sweetalert2';
import { URL_API } from '../const';
import NavbarOrganizador from './NavbarOrganizador';
import { useNavigate } from 'react-router-dom';

const endpoint = URL_API;


const ListaParticipantes = () => {
  const [pagina, setPagina] = useState(0);
  const [nombre_evento, setNombreEvento] = useState("");
  const [ponerNota, setPonerNota] = useState(false);
  const [cantidadParticipante, setCantidadParticipante] = useState(0);
  const [eventos, setEventos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [edit_problemas_resueltos, setEditProblemasResueltos] = useState("");
  const [editProblemasResueltosError, setEditProblemasResueltosError] = useState("");
  const [edit_penalidad, setEditPenalidad] = useState("");
  const [editPenalidadError, setEditPenalidadError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getAllEventos();
  }, []);

  const getAllEventos = async () => {
    const response = await axios.get(`${endpoint}/eventosDinamicos/${id}`);
    setNombreEvento(response.data.nombre_evento_dinamico);
    setPonerNota(response.data.tipo_evento_dinamico.tieneNota);
    setEventos(response.data.inscripcion);
  };
  const handleEditPenalidadChange = (e) => {
    let error = validateNota(e.target.value);
    setEditPenalidadError(error);
    if (!error) {
      setEditPenalidad(e.target.value);
    } 
  };

  const handleEditProblemasResueltosChange = (e) => {
    let error = validateNota(e.target.value);
    setEditProblemasResueltosError(error);
    if (!error) {
      setEditProblemasResueltos(e.target.value);
    } 
  };

  const validateNota = (value) => {
    const regex = /^[0-9]*$/;
    if (value === "") {
      return null; // Permitir campo vacío
    } else if (!regex.test(value)) {
      return "Solo se permiten números";
    } else if (parseFloat(value) < 0) {
      return "No se permiten números negativos";
    } else {
      return null;
    }
  };


  const handleUpdateNota = async () => { 
    try {
      const response = await axios.put(`${endpoint}/actualizarInscripcion/${editingId}`, {
        problemas_resueltos: edit_problemas_resueltos,
        penalidad: edit_penalidad,
      });
      setEditingId(null);
      setEditProblemasResueltos("");
      setEditPenalidad("");
      getAllEventos();
      Swal.fire({
        icon: 'success',
        title: 'Nota Actualizada',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setEditProblemasResueltosError(error.response.data.problemas_resueltos);
        setEditPenalidadError(error.response.data.penalidad);
      }
    }

  };


  const handleCancel = () => {
      setEditingId(null);
      setEditProblemasResueltos("");
      setEditPenalidad("");
  };

  const handleEditNota = (id) => {
    setEditingId(id);
    const tipoParticipanteSeleccionado = eventos.find((evento) => evento.id === id);
    setEditProblemasResueltos(tipoParticipanteSeleccionado.problemas_resueltos);
    setEditPenalidad(tipoParticipanteSeleccionado.penalidad);
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
              <h3 className="card-header">{nombre_evento}</h3>
              <div className="card-body table-responsive tabla-contenedor">               
                <table>
                  <thead className='text-white'>
                    <tr>
                      <th className="centrado">Nombre Equipo</th>
                      {ponerNota ? (<th className="centrado">Problemas Resueltos</th>): null}
                      {ponerNota ? (<th className="centrado">Penalidad</th>): null}
                      <th className="centrado">Nombre Participante</th>
                      <th className="centrado">Apellido Participante</th>
                      <th className="centrado">Correo Participante</th>
                      {ponerNota ? (<th className="centrado">Accion</th>): null}
                    </tr>
                  </thead>
                  <tbody>
                    {eventosVisibles.map((evento) => (
                      <React.Fragment key={evento.id}>
                        <tr>
                          <td className="centrado" rowSpan={evento.paticipante.length}>
                            {evento.nombre_equipo}
                          </td>
                          {ponerNota ? (
                          <td className="centrado" rowSpan={evento.paticipante.length}>
                            {editingId === evento?.id ? (
                              <>
                                <input
                                  value={edit_problemas_resueltos}
                                  onChange={handleEditProblemasResueltosChange}
                                  type="number"
                                  className={`form-control ${editProblemasResueltosError ? "is-invalid" : ""
                                    }`}
                                  required
                                />
                                {editProblemasResueltosError && (
                                  <div className="invalid-feedback">
                                    {editProblemasResueltosError}
                                  </div>
                                )}
                              </>
                            ) : (
                              evento.problemas_resueltos ? evento.problemas_resueltos : 0
                            )}
                          </td>): null}
                          {ponerNota ? (
                          <td className="centrado" rowSpan={evento.paticipante.length}>
                            {editingId === evento?.id ? (
                              <>
                                <input
                                  value={edit_penalidad}
                                  onChange={handleEditPenalidadChange}
                                  type="number"
                                  className={`form-control ${editPenalidadError ? "is-invalid" : ""
                                    }`}
                                  required
                                />
                                {editPenalidadError && (
                                  <div className="invalid-feedback">
                                    {editPenalidadError}
                                  </div>
                                )}
                              </>
                            ) : (
                              evento.penalidad ? evento.penalidad : 0
                            )}
                          </td>): null}
                          
                          {evento.paticipante.length > 0 && (
                            <>
                              <td className="centrado">{evento.paticipante[0].nombre}</td>
                              <td className="centrado">{evento.paticipante[0].apellido}</td>
                              <td className="centrado">{evento.paticipante[0].correo}</td>
                            </>
                          )}
                          {ponerNota ? (
                          <td className="centrado" rowSpan={evento.paticipante.length}>
                            <>
                              {editingId === evento?.id ? (
                                <>
                                  <button
                                    onClick={handleUpdateNota}
                                    className="btn btn-success">
                                    Actualizar
                                  </button>
                                  <button
                                    onClick={handleCancel}
                                    className="btn btn-danger">
                                    Cancelar
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleEditNota(evento?.id)}
                                    className="btn btn-warning">
                                    Editar
                                  </button>
                                </>
                              )}
                            </>
                          </td>): null}

                        </tr>
                        {evento.paticipante.slice(1).map((participante) => (
                          <tr key={participante.id}>
                            <td className="centrado">{participante.nombre}</td>
                            <td className="centrado">{participante.apellido}</td>
                            <td className="centrado">{participante.correo}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
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

export default ListaParticipantes;