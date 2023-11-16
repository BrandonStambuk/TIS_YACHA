import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
import izqImage from "./images/izq.png";
import derImage from "./images/der.png";
import cenImage from "./images/cen.png";
import jusImage from "./images/jus.png";
import { URL_API } from "./const";

import Swal from 'sweetalert2';
const inputStyle = {
  width: "170px",
  height: "30px",
  fontSize: "14px",
};

const endpoint = `${URL_API}/crearcompe`;

const CreateCompe = () => {
  const [nombre_compe, setNombreCompe] = useState("");
  const [numero_miembro, setMiembro] = useState("");
  const [fecha_inicio, setFechaInicio] = useState("");
  const [fecha_fin, setFechaFin] = useState("");
  const [fecha_competencia, setFechaCompetencia] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreCompeError, setNombreCompeError] = useState("");
  const navigate = useNavigate();
  const [fechaInicioError, setFechaInicioError] = useState("");
  const [fechaFinError, setFechaFinError] = useState("");
  const [fechaCompError, setfechaCompError] = useState("");
  const [horaEventoError, sethoraEventoError] = useState("");
  const [publico, setPublico] = useState(false);

  const handleMiembroChange = (event) => {
    setMiembro(event.target.value);
  };

  const [file, setFile] = useState(null);

  const handleFechaInicioChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      setFechaInicioError(
        "La fecha de inicio inscripcion debe ser posterior al día de hoy."
      );
    } else {
      setFechaInicioError("");
    }

    setFechaInicio(event.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

  };
  const handleUpload = async (id) => {
    if (!file) {
      console.error('No file selected');
      return;
    }
    let fileName = id + '.jpg';
    const formData = new FormData();
    formData.append('image', file, fileName);

    try {
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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

  const handleFechaFinCompetenciaChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const startDate = new Date(fecha_fin)
    if (selectedDate <= startDate) {
      setfechaCompError(
        "La fecha de inicio de la competencia debe ser posterior a la fecha de inscripcion"
      );
    } else {
      setfechaCompError("");
    }

    setFechaCompetencia(event.target.value);
  };

  const handleHorasChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue !== "0") {
      if (!/^(0|[1-9][0-9]*)$/.test(inputValue)) {
        sethoraEventoError("El valor no puede empezar con 0");
      } else if (inputValue.length <= 3) {
        setHora(inputValue);
        sethoraEventoError(null);
      } else {
        sethoraEventoError("No se permiten más de 3 caracteres.");
      }
    } else {
      sethoraEventoError("No se permiten 0 horas.");
    }
       
  };

  const store = async (e) => {
    e.preventDefault();
    const selectedStartDate = new Date(fecha_inicio);
    const selectedEndDate = new Date(fecha_fin);
    const currentDate = new Date();
    let todosErrores = [];
    // Validación del nombre del evento
    if (
      !nombre_compe ||
      !numero_miembro ||
      !fecha_inicio ||
      !fecha_fin ||
      !fecha_competencia||
      !hora ||
      !descripcion
    ) {
      Swal.fire('Ingrese todos los datos!')
      return;
    }
    let errores = [];
    if (!/^[A-Z]/.test(nombre_compe)) {
      errores.push('El primer carácter debe ser una letra mayúscula.');
    }

    if (!/^[A-Za-z\- ]+$/.test(nombre_compe)) {
      errores.push('Solo están permitidos letras, espacios y guiones.');
    }

    if (nombre_compe.length > 21) {
      errores.push('No se permiten más de 21 caracteres.');
    }

    if (errores.length > 0) {
      setNombreCompeError(errores.join(' '));
      todosErrores.push(errores);
    } else {
      setNombreCompeError("");
    }
    if (selectedStartDate <= currentDate) {
      setFechaInicioError('La fecha de inicio debe ser posterior al día de hoy.');
      todosErrores.push('La fecha de inicio debe ser posterior al día de hoy.');
    } else {
      setFechaInicioError('');
    }
    if (selectedEndDate < selectedStartDate) {
      setFechaFinError('La fecha de fin no puede ser anterior a la fecha de inicio.');
      todosErrores.push('La fecha de fin no puede ser anterior a la fecha de inicio.');
    } else {
      setFechaFinError('');
    }
    if (todosErrores.length === 0) {
      let response = await axios.post(endpoint, {
        nombre_competencia: nombre_compe,
        integrantes_competencia: numero_miembro,
        fecha_inicio_competencia: fecha_inicio,
        fecha_fin_competencia: fecha_fin,
        fecha_competencia:fecha_competencia,
        horas_competencia: hora,
        publicado_competencia: publico,
        descripcion_competencia: descripcion,
      });
      handleUpload(response.data);
      navigate("/listaCompetencias");
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
      <NavbarAdmin />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-body tarjeta">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="card-title text-center text-black">Crear Competencia</h2>
                  </div>
                </div>
                <div className="row text-black">
                  <div className="col-md-6">
                    <form onSubmit={store} className="text-left">
                      <div className="mb-3">
                        <label htmlFor="nombreEvento" className="form-label">
                          Nombre de la Competencia
                        </label>
                        <input
                          value={nombre_compe}
                          onChange={(e) => setNombreCompe(e.target.value)}
                          type="text"
                          className={`form-control ${nombreCompeError ? "is-invalid" : ""
                            }`}
                          id="nombreEvento"
                          name="nombreEvento"
                          style={inputStyle}
                        />
                        {nombreCompeError && (
                          <div className="invalid-feedback">
                            {nombreCompeError}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Número de Integrantes</label>
                        <select
                          className="form-select"
                          id="horas"
                          name="horas"
                          style={inputStyle}
                          value={numero_miembro}
                          onChange={handleMiembroChange}
                        >
                          <option value="">Seleccionar</option>
                          <option value="1">1 miembro</option>
                          <option value="2">2 miembros</option>
                          <option value="3">3 miembros</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="fechaInicio" className="form-label">
                          Fecha de Inicio Inscripción
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
                          Fecha de Fin Inscripción
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
                        <label htmlFor="fechaInicio" className="form-label">
                          Fecha de Inicio Competencia
                        </label>
                        <input
                          type="date"
                          className={`form-control ${fechaCompError ? "is-invalid" : ""
                            }`}
                          id="fechaInicio"
                          name="fechaInicio"
                          style={inputStyle}
                          value={fecha_competencia}
                          onChange={handleFechaFinCompetenciaChange}
                        />
                        {fechaCompError && (
                          <div className="invalid-feedback">
                            {fechaCompError}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="horas" className="form-label">
                          Horas
                        </label>
                        <input
                          onKeyDown={(event) => {                            
                            if (!(event.key === 'Backspace' ||event.key ==='ArrowLeft'||event.key ==='ArrowRight'|| event.key === 'Tab' || /[0-9]/.test(event.key))) {
                              event.preventDefault();
                            }}}
                          value={hora}
                          onChange={handleHorasChange}
                          type="number"
                          className={`form-control ${horaEventoError ? "is-invalid" : ""
                            }`}
                          id="horaEvento"
                          name="horaEvento"
                          style={inputStyle}
                        />
                        {horaEventoError && (
                          <div className="invalid-feedback">
                            {horaEventoError}
                          </div>
                        )}
                      </div>
                      <div><label className="form-check-label" htmlFor="flexSwitchCheckDefault">Publicar Competencia</label> </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
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
                      <br></br>
                      <input type="file" onChange={handleFileChange} style={{ display: 'none', visibility: 'hidden' }} id="subirAfiche" />
                      <label htmlFor="subirAfiche" type="button" className="btn btn-warning btn-lg btn-block mx-auto boton-2">Subir afiche</label>
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

export default CreateCompe;