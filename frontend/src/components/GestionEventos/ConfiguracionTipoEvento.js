import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

import { URL_API } from "../../const";

const endpoint = URL_API;

const ConfiguracionTipoEvento = () => {
  const [nombre_tipo_evento_dinamico, setTipoEventoDinamico] = useState("");
  const [nombreTipoEventoError, setNombreTipoEventoError] = useState("");
  const [etapasAbiertas, setEtapasAbiertas] = useState([]);
  const [edit_nombre_tipo_evento_dinamico, setEditTipoEventoDinamico] = useState("");
  const [editNombreTipoEventoError, setEditNombreTipoEventoError] = useState("");
  const [opciones, setOpciones] = useState([]);
  const [permitirNota, setPermitirNota] = useState(false);
  const [editPermitirNota, setEditPermitirNota] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios
      .get(`${endpoint}/tipoEventosDinamicos`)
      .then((response) => {
        setOpciones(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las opciones:", error);
      });
  }, []);

  const handleDeleteOpcion = async (id) => {

    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este Tipo de Evento?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          
          const responseDelete = await axios.delete(`${endpoint}/eliminarTipoEventoDinamico/${id}`);
          Swal.fire('¡Eliminado!', 'El requisito ha sido eliminado.', 'success');
          const newTipo = opciones.filter((tipo) => tipo.id !== id);
          setOpciones(newTipo);
        } catch (error) {
          /*  if (error.response) {
                const errorMessage = error.response.data.error || 'Error al eliminar el requisito';
                Swal.fire({
                    title: 'Este requisito esta siendo utilizado por eventos ¿ Estas seguro que deseas eliminarlo ?',
                    text: 'No podrás revertir esta acción.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo',
                    cancelButtonText: 'Cancelar',
                }).then(async (result2) => {
                    if (result2.isConfirmed) {
                        const responseDelete = await axios.delete(`${endpoint}/eliminarTodoRequisito/${id}`);
                        Swal.fire('¡Eliminado!', 'El requisito ha sido eliminado.', 'success');
                        const newRequisitos = requisitos.filter((requisito) => requisito.id !== id);
                        setRequisitos(newRequisitos);
                    }
                });
            }*/
        }
      }
    });



  };
  const handleCancelOpcion = () => {
    setEditingId(null);
    setEditTipoEventoDinamico("");
    setPermitirNota(false);
  };

  const toggleEtapa = (etapa) => {
    setEtapasAbiertas((prevEtapas) => ({
      ...prevEtapas,
      [etapa]: !prevEtapas[etapa],
    }));
  };

  const handleEditOpcion = (id) => {
    setEditingId(id);
    setEditNombreTipoEventoError("");
    const tipoEventoSeleccionado = opciones.find((opcion) => opcion.id === id);
    setEditTipoEventoDinamico(tipoEventoSeleccionado.nombre_tipo_evento_dinamico);
    setEditPermitirNota(tipoEventoSeleccionado.tieneNota);
  };

  const handleUpdateOpcion = async () => {
    try {
      await axios.put(`${endpoint}/actualizarTipoEventoDinamico/${editingId}`, {
        nombre_tipo_evento_dinamico: edit_nombre_tipo_evento_dinamico,
        tieneNota: editPermitirNota,
      });

      const response = await axios.get(`${endpoint}/tipoEventosDinamicos`);
      const data = response.data;
      setOpciones(data);

      setEditingId(null);
      setEditTipoEventoDinamico("");
      setEditNombreTipoEventoError("");
      setEditPermitirNota(false);
    } catch (error) {
      console.error("Error al actualizar el tipo de evento:", error);
    }
  };
  const handleTipoDeEventoDinamicoChange = (e) => {
    let error = validateTipoEvento(e.target.value);
    setNombreTipoEventoError(error);
    if (!error) {
      setTipoEventoDinamico(e.target.value);
    }
  };
  const handleEditNombreTipoEventoDinamicoChange = (e) => {
    let error = validateTipoEvento(e.target.value);
    setEditNombreTipoEventoError(error);
    if (!error) {
      setEditTipoEventoDinamico(e.target.value);
    }
  };

  const validateTipoEvento = (value) => {
    if (!/^[A-Z]/.test(value) && value.length > 0) {
      return "El primer carácter debe ser una letra mayúscula.";
    } else if (!/^[A-Za-z\s\-]*$/.test(value)) {
      return "No se admiten caracteres distintos a números y espacios";
    } else if (value.length > 50) {
      return "No se permiten más de 50 caracteres.";
    }
    return "";
  };

  const handleSubmitStoreTipo = async (e) => {
    if (!nombre_tipo_evento_dinamico) {
      setNombreTipoEventoError("El nombre del tipo de evento no puede estar vacío.");
      return;
    }
    e.preventDefault();
    await axios.post(`${endpoint}/crearTipoEventoDinamico`, {
      nombre_tipo_evento_dinamico: nombre_tipo_evento_dinamico,
      tieneNota: permitirNota,
    });
    const response = await axios.get(`${endpoint}/tipoEventosDinamicos`);
    setOpciones(response.data);
    setTipoEventoDinamico("");
    setPermitirNota(false);
    setNombreTipoEventoError("");
    setEtapasAbiertas([]);
  };

  return (
    <div className="container mt-5">
      <div className="col-md-8 mx-auto">
        <div className="card border-0">
          <div className="card-body tarjeta">
            <div className="row text-black">
              <div className="mb-3">
                <div>
                  <table className="table table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th>ID</th>
                        <th>Nombre Tipo Evento</th>
                        <th>Permite Modificar Notas</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {opciones.length > 0 ? (
                        opciones.map((opcion) => (
                          <tr key={opcion?.id}>
                            <td>{opcion?.id}</td>
                            <td>
                              {editingId === opcion?.id ? (
                                <>
                                  <input
                                    value={edit_nombre_tipo_evento_dinamico}
                                    onChange={handleEditNombreTipoEventoDinamicoChange}
                                    type="text"
                                    className={`form-control ${editNombreTipoEventoError ? "is-invalid" : ""
                                      }`}
                                  />
                                  {editNombreTipoEventoError && (
                                    <div className="invalid-feedback">
                                      {editNombreTipoEventoError}
                                    </div>
                                  )}
                                </>
                              ) : (
                                opcion?.nombre_tipo_evento_dinamico
                              )}
                            </td>
                            <td>
                            {editingId === opcion?.id ? (
                                <>
                              <div className="form-check form-switch">
                              <input
                                className="form-check-input fs-3"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                checked={editPermitirNota}
                                onChange={(e) => setEditPermitirNota(e.target.checked)}
                                style={{ marginLeft: '-20px' }}
                              />
                            </div>
                            </>
                              ) : (
                              opcion?.tieneNota ? "Si" : "No")}</td>
                            <td>{([1, 2, 3, 4, 5].includes(opcion.id)) ? (
                              <span>Valor por defecto</span>
                            ) : (
                              <>
                                {editingId === opcion?.id ? (
                                  <>
                                    <button
                                      onClick={handleUpdateOpcion}
                                      className="btn btn-success">
                                      Actualizar
                                    </button>
                                    <button
                                      onClick={handleCancelOpcion}
                                      className="btn btn-success">
                                      Cancelar
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleDeleteOpcion(opcion?.id)}
                                      className="btn btn-danger">
                                      Eliminar
                                    </button>
                                    <button
                                      onClick={() => handleEditOpcion(opcion?.id)}
                                      className="btn btn-warning">
                                      Editar
                                    </button>
                                  </>
                                )}
                              </>
                            )}

                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No hay tipos de eventos creados</td>
                        </tr>
                      )}
                    </tbody>

                  </table>
                  <div>
                    <button onClick={() => toggleEtapa(1)}>
                      Gestionar requisitos {etapasAbiertas[1]}
                    </button>
                  </div>
                  {etapasAbiertas[1] && (
                    <div>
                      <div className="mt-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
                        <div className="mb-4 col-md-6 col-xs-12">
                          <label htmlFor="tipoEvento" className="form-label">
                            Nombre Tipo de Evento
                          </label>
                          <input
                            value={nombre_tipo_evento_dinamico}
                            onChange={handleTipoDeEventoDinamicoChange}
                            type="text"
                            className={`form-control ${nombreTipoEventoError ? "is-invalid" : ""}`}
                            id="tipoEvento"
                            name="tipoEvento"
                          />
                          {nombreTipoEventoError && (
                            <div className="invalid-feedback">
                              {nombreTipoEventoError}
                            </div>
                          )}
                        </div>

                        <div className="mb-4 col-md-6 col-xs-12">
                          <div>
                            <label className="form-label" htmlFor="flexSwitchCheckDefault">
                              Permitir Modificar Notas
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input fs-3"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              checked={permitirNota}
                              onChange={(e) => setPermitirNota(e.target.checked)}
                              style={{ marginLeft: '-20px' }}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleSubmitStoreTipo}
                        id="botoncito"
                        className="btn btn-primary"
                      >
                        Guardar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ConfiguracionTipoEvento;
