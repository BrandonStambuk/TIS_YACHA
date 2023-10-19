import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
import izqImage from "./images/izq.png";
import derImage from "./images/der.png";
import cenImage from "./images/cen.png";
import jusImage from "./images/jus.png";

import Swal from 'sweetalert2';
const inputStyle = {
  width: "170px",
  height: "30px",
  fontSize: "14px",
};

const endpoint = "http://localhost:8000/api/crearevento";

const CreateEvento = () => {
  const [nombre_evento, setNombreEvento] = useState("");
  const [tipo_evento, setTipoEvento] = useState("");
  const [fecha_inicio, setFechaInicio] = useState("");
  const [fecha_fin, setFechaFin] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreEventoError, setNombreEventoError] = useState("");
  const navigate = useNavigate();
  const [fechaInicioError, setFechaInicioError] = useState("");
  const [fechaFinError, setFechaFinError] = useState("");
  const [publico, setPublico] = useState(false);
  const handleTipoEventoChange = (event) => {
    setTipoEvento(event.target.value);
  };

  const handleFechaInicioChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      setFechaInicioError(
        "La fecha de inicio debe ser posterior al día de hoy."
      );
    } else {
      setFechaInicioError("");
    }

    setFechaInicio(event.target.value);
  };
  const handleFechaFinChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const startDate = new Date(fecha_inicio); // Convierte la fecha de inicio a objeto Date

    if (selectedDate < startDate) {
      setFechaFinError(
        "La fecha de fin no puede ser anterior a la fecha de inicio."
      );
    } else {
      setFechaFinError("");
    }

    setFechaFin(event.target.value);
  };

  const handleHorasChange = (event) => {
    setHora(event.target.value);
  };

  const store = async (e) => {
    e.preventDefault();
    const selectedStartDate = new Date(fecha_inicio);
    const selectedEndDate = new Date(fecha_fin);
    const currentDate = new Date();
    let todosErrores=[];
    // Validación del nombre del evento
    if (
      !nombre_evento ||
      !tipo_evento ||
      !fecha_inicio ||
      !fecha_fin ||
      !hora ||
      !descripcion
    ) {
      Swal.fire('Ingrese todos los datos!')
      return;
    }
    let errores = [];
    if (!/^[A-Z]/.test(nombre_evento)) {
      errores.push('El primer carácter debe ser una letra mayúscula.');
    }

    if (!/^[A-Za-z\- ]+$/.test(nombre_evento)) {
      errores.push('Solo están permitidos letras, espacios y guiones.');
    }

    if (nombre_evento.length > 21) {
      errores.push('No se permiten más de 21 caracteres.');
    }

    if (errores.length > 0) {
      setNombreEventoError(errores.join(' '));
      todosErrores.push("a");
    } else {
      setNombreEventoError("");
    }
    if (selectedStartDate <= currentDate) {
      setFechaInicioError('La fecha de inicio debe ser posterior al día de hoy.');
      todosErrores.push("a");
    } else {
      setFechaInicioError('');
    }
    if (selectedEndDate < selectedStartDate) {
      setFechaFinError('La fecha de fin no puede ser anterior a la fecha de inicio.');
      todosErrores.push("a");
    } else {
      setFechaFinError('');
    }
    if (todosErrores.length===0) {
      await axios.post(endpoint, {
        nombre_evento: nombre_evento,
        tipo_evento: tipo_evento,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        hora: hora,
        publico: publico,
        descripcion: descripcion,
      });
      navigate("/ListaEventos");
    }

  };
  // Estados para el tamaño de fuente y la alineación del texto
  const [fontSize, setFontSize] = useState(16); // Tamaño de fuente inicial
  const [textAlign, setTextAlign] = useState("left"); // Alineación inicial

  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  const handleTextAlignChange = (alignment) => {
    setTextAlign(alignment);
  };

  const buttonImageStyle = {
    maxWidth: "24px",
    maxHeight: "24px",
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-body tarjeta">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="card-title text-center text-white">Crear Evento</h2>
                  </div>
                </div>
                <div className="row text-white">
                  <div className="col-md-6">
                    <form onSubmit={store} className="text-left">
                      <div className="mb-3">
                        <label htmlFor="nombreEvento" className="form-label">
                          Nombre de evento
                        </label>
                        <input
                          value={nombre_evento}
                          onChange={(e) => setNombreEvento(e.target.value)}
                          type="text"
                          className={`form-control ${nombreEventoError ? "is-invalid" : ""
                            }`}
                          id="nombreEvento"
                          name="nombreEvento"
                          style={inputStyle}
                        />
                        {nombreEventoError && (
                          <div className="invalid-feedback">
                            {nombreEventoError}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Tipo de Evento</label>
                        <div>
                          <label>
                            <input
                              type="radio"
                              value="Reclutamiento"
                              onChange={handleTipoEventoChange}
                              checked={tipo_evento === "Reclutamiento"}
                            />
                            Reclutamiento
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="radio"
                              value="Taller de reclutamiento"
                              onChange={handleTipoEventoChange}
                              checked={
                                tipo_evento === "Taller de reclutamiento"
                              }
                            />
                            Taller de reclutamiento
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="radio"
                              value="Competencia de entrenamiento"
                              onChange={handleTipoEventoChange}
                              checked={
                                tipo_evento === "Competencia de entrenamiento"
                              }
                            />
                            Competencia de entrenamiento
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="radio"
                              value="Competencia interna"
                              onChange={handleTipoEventoChange}
                              checked={tipo_evento === "Competencia interna"}
                            />
                            Competencia interna
                          </label>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="fechaInicio" className="form-label">
                          Fecha de Inicio
                        </label>
                        <input
                          type="date"
                          className={`form-control ${fechaInicioError ? "is-invalid" : ""
                            }`}
                          id="fechaInicio"
                          name="fechaInicio"
                          style={inputStyle}
                          value={fecha_inicio}
                          onChange={handleFechaInicioChange}
                        />
                        {fechaInicioError && (
                          <div className="invalid-feedback">
                            {fechaInicioError}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="fechaFin" className="form-label">
                          Fecha de Fin
                        </label>
                        <input
                          type="date"
                          className={`form-control ${fechaFinError ? "is-invalid" : ""
                            }`}
                          id="fechaFin"
                          name="fechaFin"
                          style={inputStyle}
                          value={fecha_fin}
                          onChange={handleFechaFinChange}
                        />
                        {fechaFinError && (
                          <div className="invalid-feedback">
                            {fechaFinError}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="horas" className="form-label">
                          Horas
                        </label>
                        <select
                          className="form-select"
                          id="horas"
                          name="horas"
                          style={inputStyle}
                          value={hora}
                          onChange={handleHorasChange}
                        >
                          <option value="">Seleccionar horas</option>
                          <option value="1">1 hora</option>
                          <option value="2">2 horas</option>
                          <option value="3">3 horas</option>
                          <option value="4">4 horas</option>
                        </select>
                      </div>
                      <div><label class="form-check-label" for="flexSwitchCheckDefault">Publicar evento</label> </div>
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                          checked={publico}
                          onChange={(e) => setPublico(e.target.checked)} />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Guardar
                      </button>
                    </form>
                  </div>
                  <div className="col-md-6 mx-auto">
                    <div className="mb-3">
                      <label htmlFor="descripcion" className="form-label">
                        Descripción
                      </label>
                      <div className="mb-3">
                        <div className="btn-group me-2">
                          <button
                            onClick={() => handleFontSizeChange(fontSize + 2)}
                            className="btn btn-light btn-lg"
                          >
                            <strong>A</strong>
                          </button>
                          <button
                            onClick={() => handleFontSizeChange(fontSize - 2)}
                            className="btn btn-light btn-sm"
                          >
                            <small>A</small>
                          </button>
                        </div>
                        <div className="btn-group">
                          <button
                            onClick={() => handleTextAlignChange("left")}
                            className={`btn btn-light ${textAlign === "left" ? "active" : ""
                              }`}
                          >
                            <img
                              src={izqImage}
                              alt="Izquierda"
                              style={buttonImageStyle}
                            />
                          </button>
                          <button
                            onClick={() => handleTextAlignChange("center")}
                            className={`btn btn-light ${textAlign === "center" ? "active" : ""
                              }`}
                          >
                            <img
                              src={cenImage}
                              alt="Centro"
                              style={buttonImageStyle}
                            />
                          </button>
                          <button
                            onClick={() => handleTextAlignChange("right")}
                            className={`btn btn-light ${textAlign === "right" ? "active" : ""
                              }`}
                          >
                            <img
                              src={derImage}
                              alt="Derecha"
                              style={buttonImageStyle}
                            />
                          </button>
                          <button
                            onClick={() => handleTextAlignChange("justify")}
                            className={`btn btn-light ${textAlign === "justify" ? "active" : ""
                              }`}
                          >
                            <img
                              src={jusImage}
                              alt="Justificado"
                              style={buttonImageStyle}
                            />
                          </button>
                        </div>
                      </div>
                      <textarea
                        className="form-control-descArea textarea-estilo"

                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows="4"
                        style={{
                          fontSize: `${fontSize}px`,
                          textAlign: textAlign,
                          width: "100%",
                          height: "200px",
                          resize: "none",
                        }}
                      ></textarea>
                    </div>
                    <div>
                      <button type="button" className="btn btn-warning btn-lg btn-block mx-auto boton-2" onClick={() => navigate('/crearafiche')} >Crear afiche</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvento;