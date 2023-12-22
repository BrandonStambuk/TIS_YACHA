import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { URL_API } from "../../const";

const endpoint = URL_API;

const ConfiguracionTipoEvento = ({onValorSeleccionado }) => {
  const [nombre_tipo_evento_dinamico, setTipoEventoDinamico] = useState("");
  const [nombreTipoEventoError, setNombreTipoEventoError] = useState("");
  const [opciones, setOpciones] = useState([]);
  const [valorSeleccionado, setValorSeleccionado] = useState("");
  const [etapasAbiertas, setEtapasAbiertas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [mostrarTabla, setMostrarTabla] = useState(false);

  useEffect(() => {
    axios
      .get(`${endpoint}/tipoEventosDinamicos`)
      .then((response) => {
        setOpciones(response.data);
        setValorSeleccionado(onValorSeleccionado);
      })
      .catch((error) => {
        console.error("Error al obtener las opciones:", error);
      });
  }, []);

  const handleDeleteTipoEvento = async (id) => {
    try {
      await axios.delete(`${endpoint}/eliminarTipoEventoDinamico/${id}`);
      const response = await axios.get(`${endpoint}/tipoEventosDinamicos`);
      const data = response.data;
      setOpciones(data);

      if (data.length > 0) {
        setValorSeleccionado(data[0].id);
      } else {
        setValorSeleccionado("");
      }
    } catch (error) {
      console.error("Error al eliminar el tipo de evento:", error);
    }
  };

  const handleEditTipoEvento = (id) => {
    setEditingId(id);
    const tipoEventoSeleccionado = opciones.find((opcion) => opcion.id === id);
    setTipoEventoDinamico(tipoEventoSeleccionado.nombre_tipo_evento_dinamico);
  };

  const handleUpdateTipoEvento = async () => {
    try {
      await axios.put(`${endpoint}/actualizarTipoEventoDinamico/${editingId}`, {
        nombre_tipo_evento_dinamico: nombre_tipo_evento_dinamico,
      });

      const response = await axios.get(`${endpoint}/tipoEventosDinamicos`);
      const data = response.data;
      setOpciones(data);

      setEditingId(null);
      setTipoEventoDinamico("");
    } catch (error) {
      console.error("Error al actualizar el tipo de evento:", error);
    }
  };

  const toggleTabla = () => {
    setMostrarTabla((prevMostrarTabla) => !prevMostrarTabla);
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
    let error = validateTipoEvento(nombre_tipo_evento_dinamico);
    setNombreTipoEventoError(error);
    if (!error) {
      e.preventDefault();
      await axios.post(`${endpoint}/crearTipoEventoDinamico`, {
        nombre_tipo_evento_dinamico: nombre_tipo_evento_dinamico,
      });
      const response = await axios.get(`${endpoint}/tipoEventosDinamicos`);
      setOpciones(response.data);
      setValorSeleccionado(response.data[0]);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card border-0">
            <div className="card-body tarjeta">
              <div className="row">
              </div>
              <div className="row text-black">
                <div className="col-md-6">

                    <div>
                      <div className="mb-3">
                        <label htmlFor="tipoEvento" className="form-label">
                          Tipo de Evento
                        </label>
                        <input
                          value={nombre_tipo_evento_dinamico}
                          onChange={(e) =>
                            setTipoEventoDinamico(e.target.value)
                          }
                          type="text"
                          className={`form-control ${
                            nombreTipoEventoError ? "is-invalid" : ""
                          }`}
                          id="tipoEvento"
                          name="tipoEvento"
                        />
                        {nombreTipoEventoError && (
                          <div className="invalid-feedback">
                            {nombreTipoEventoError}
                          </div>
                        )}
                      </div>
                
                    </div>
                    <button
                        onClick={handleSubmitStoreTipo}
                        id="botoncito"
                        className="btn btn-primary"
                      >
                        Guardar
                      </button>
                  
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre Tipo Evento</th>
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
                                  <input
                                    value={nombre_tipo_evento_dinamico}
                                    onChange={(e) =>
                                      setTipoEventoDinamico(e.target.value)
                                    }
                                    type="text"
                                    className={`form-control ${
                                      nombreTipoEventoError ? "is-invalid" : ""
                                    }`}
                                  />
                                ) : (
                                  opcion?.nombre_tipo_evento_dinamico
                                )}
                              </td>
                              <td>
                                {editingId === opcion?.id ? (
                                  <button
                                    onClick={handleUpdateTipoEvento}
                                    className="btn btn-success"
                                  >
                                    Actualizar
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleDeleteTipoEvento(opcion?.id)
                                      }
                                      className="btn btn-danger"
                                    >
                                      Eliminar
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleEditTipoEvento(opcion?.id)
                                      }
                                      className="btn btn-warning"
                                    >
                                      Editar
                                    </button>
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
