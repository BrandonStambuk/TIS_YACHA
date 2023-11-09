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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { urlApi } from "./const";


import Swal from 'sweetalert2';
const inputStyle = {
  width: "170px",
  height: "30px",
  fontSize: "14px",
};

const endpoint = `${urlApi}/crearcompe`;

const EditComp = () => {
  const [nombre_compe, setNombreCompe] = useState("");
  const [numero_miembro, setMiembro] = useState("");
  const [fecha_inicio, setFechaInicio] = useState("");
  const [fecha_fin, setFechaFin] = useState("");
  //const [fecha_compe, setFechaCompe] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreCompeError, setNombreCompeError] = useState("");
  const navigate = useNavigate();
  const [fechaInicioError, setFechaInicioError] = useState("");
  const [fechaFinError, setFechaFinError] = useState("");
  //const [fechaCompeError, setFechaCompeError] = useState("");
  const [publico, setPublico] = useState(false);
  const {id} = useParams();

  const handleMiembroChange = (event) => {
    setMiembro(event.target.value);
  };

  const [file, setFile] = useState(null);

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
  /*const handleFechaCompeChange = (event) => {
    const startDate = new Date(fecha_fin); // Convierte la fecha de inicio a objeto Date
    const selectedDate = new Date(event.target.value);

    if (selectedDate < startDate) {
      setFechaCompeError(
        "La fecha de competencia debe estar fuera del rango de las fechas de inscripcion."
      );
    } else {
      setFechaCompeError("");
    }

    setFechaCompe(event.target.value);
  };*/

  const handleHorasChange = (event) => {
    setHora(event.target.value);
  };

  const update = async (e) => {
    e.preventDefault();
    const selectedStartDate = new Date(fecha_inicio);
    const selectedEndDate = new Date(fecha_fin);
    //const nuevaFecha = new Date (fecha_compe);
    const currentDate = new Date();
    let todosErrores = [];
    // Validación del nombre del evento
    if (
      !nombre_compe ||
      !numero_miembro ||
      !fecha_inicio ||
      !fecha_fin ||
      //!fecha_compe ||
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
      try{
        let response = await axios.put(`${endpoint}/${id}`, {
          nombre_competencia: nombre_compe,
          integrantes_competencia: numero_miembro,
          fecha_inicio_competencia: fecha_inicio,
          fecha_fin_competencia: fecha_fin,
          horas_competencia: hora,
          publicado_competencia: publico,
          descripcion_competencia: descripcion,
        });
        handleUpload(response.data.id);
        navigate("/listacompetencias");
      } catch(error){
        console.error('Error al actualizar los datos de la competencia', error);
      }  
    }

  };

  useEffect(() => {
    const getCompe = async () => {
      try{
      const response = await axios.get(`${endpoint}/${id}`);
      setNombreCompe(response.data.nombre_competencia);
      setMiembro(response.data.integrantes_competencia);
      setFechaInicio(response.data.fecha_inicio_competencia);
      setFechaFin(response.data.fecha_fin_competencia);
      //setFechaCompe(response.data.fecha_compe);
      setHora(response.data.horas_competencia);
      setPublico(response.data.publicado_competencia);
      setDescripcion(response.data.descripcion_competencia);
      }catch(error){
        console.error('Error al obtener los datos de la competencia', error);
      }
    };
    getCompe();
  }, []);


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
                    <h2 className="card-title text-center text-white">Editar Competencia</h2>
                  </div>
                </div>
                <div className="row text-white">
                  <div className="col-md-6">
                    <form onSubmit={update} className="text-left">
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
                          Fecha inicio Inscripcion.
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
                          Fecha fin Inscripcion.
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
                          <option value="">Seleccionar</option>
                          <option value="1">1 hora</option>
                          <option value="2">2 horas</option>
                          <option value="3">3 horas</option>
                          <option value="4">4 horas</option>
                        </select>
                      </div>
                      <div><label className="form-check-label" htmlFor="flexSwitchCheckDefault">Publicar evento</label> </div>
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
                      <button type="button" className="btn btn-warning btn-lg btn-block mx-auto boton-2" onClick={() => navigate('/crearafiche')} >Cambiar afiche</button>
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

export default EditComp;