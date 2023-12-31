import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import {Editor} from '@tinymce/tinymce-react';

import { Editor } from '@tinymce/tinymce-react';
//import 'tinymce/tinymce'; // Importa la librería principal de TinyMCE
//import 'tinymce/themes/silver/theme'; // Importa el tema que deseas utilizar
//import 'tinymce/plugins/advlist/plugin.min.js'; // Importa un plugin específico (puedes agregar más plugins de manera similar)
/*import izqImage from "./images/izq.png";
import derImage from "./images/der.png";
import cenImage from "./images/cen.png";
import jusImage from "./images/jus.png";*/
import { URL_API } from "../const";

import Swal from 'sweetalert2';
const inputStyle = {
  width: "170px",
  height: "30px",
  fontSize: "14px",
};

const endpoint = `${URL_API}/crearevento`;


const Decription = () => {
  const [nombre_evento, setNombreEvento] = useState("");
  const [tipo_evento, setTipoEvento] = useState("");
  const [fecha_inicio_inscripcion, setFechaInicioIns] = useState("");
  const [fecha_fin_inscripcion, setFechaFinIns] = useState("");
  const [fecha_inicio_evento, setFechaInicioEvent] = useState("");
  const [fecha_fin_evento, setFechaFinEvent] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreEventoError, setNombreEventoError] = useState("");
  const navigate = useNavigate();
  const [fechaInicioError, setFechaInicioError] = useState("");
  const [fechaFinError, setFechaFinError] = useState("");
  const [fechaInicioEventError, setFechaInicioEventError] = useState("");
  const [fechaFinEventError, setFechaFinEventError] = useState("");
  const [horaEventoError, sethoraEventoError] = useState("");
  const [publico, setPublico] = useState(false);
  const handleTipoEventoChange = (event) => {
    setTipoEvento(event.target.value);
  };
  const [file, setFile] = useState(null);
//const editorRef = useState();

// Fechas inscripcion ******************************************************

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

    setFechaInicioIns(event.target.value);
  };
  const handleFechaFinChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const startDate = new Date(fecha_inicio_inscripcion); // Convierte la fecha de inicio a objeto Date

    if (selectedDate < startDate) {
      setFechaFinError(
        "La fecha de fin no puede ser anterior a la fecha de inicio."
      );
    } else {
      setFechaFinError("");
    }

    setFechaFinIns(event.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

  };
  // Fechas Evento ******************************************************

  const handleFechaInicioEventChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const startDate = new Date(fecha_fin_inscripcion)
    if (selectedDate <= startDate) {
      setFechaInicioEventError(
        "La fecha de inicio debe ser posterior al día de hoy."
      );
    } else {
      setFechaInicioEventError("");
    }

    setFechaInicioEvent(event.target.value);
  };
  const handleFechaFinEventChange = (event) => {
    const selectedDate = new Date(event.target.value);// Convierte la fecha de inicio a objeto Date
    const startDate = new Date(fecha_fin_inscripcion)
    if (selectedDate < startDate) {
      setFechaFinEventError(
        "La fecha de fin no puede ser anterior a la fecha de inicio."
      );
    } else {
      setFechaFinEventError("");
    }

    setFechaFinEvent(event.target.value);
  };
  const handleUpload = async (id) => {
    if (!file) {
      console.error('No file selected');
      return;
    }
    let fileName=id+'.jpg';
    const formData = new FormData();
    formData.append('image', file,fileName);

    try {
      const response = await axios.post(`${URL_API}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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

  const handleDescripcionChange = (content, editor) => {
    setDescripcion(content);
  };

  const store = async (e) => {
    e.preventDefault();
    const selectedStartDate = new Date(fecha_inicio_inscripcion);
    const selectedEndDate = new Date(fecha_fin_inscripcion);
    const currentDate = new Date();
    let todosErrores = [];
    // Validación del nombre del evento
    if (
      !nombre_evento ||
      !tipo_evento ||
      !fecha_inicio_inscripcion ||
      !fecha_fin_inscripcion ||      
      !fecha_inicio_evento ||
      !fecha_fin_evento ||
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
      todosErrores.push(errores);
    } else {
      setNombreEventoError("");
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
      let response=await axios.post(endpoint, {
        nombre_evento: nombre_evento,
        tipo_evento: tipo_evento,
        fecha_inicio_inscripcion: fecha_inicio_inscripcion,
        fecha_fin_inscripcion: fecha_fin_inscripcion,
        fecha_inicio_evento: fecha_inicio_evento,
        fecha_fin_evento: fecha_fin_evento,
        hora: hora,
        publico: publico,
        descripcion: descripcion,
      });
      handleUpload(response.data.id);
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
      <NavbarAdmin />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card border-0">
              <div className="card-body tarjeta">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="text-center mb-4 heading">Crear Evento</h2>
                  </div>
                </div>
                <div className="row text-black">
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
                          Fecha de Inicio inscripción
                        </label>
                        <input
                          type="date"
                          className={`form-control ${fechaInicioError ? "is-invalid" : ""
                            }`}
                          id="fechaInicio"
                          name="fechaInicio"
                          style={inputStyle}
                          value={fecha_inicio_inscripcion}
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
                          Fecha de Fin inscripcion
                        </label>
                        <input
                          type="date"
                          className={`form-control ${fechaFinError ? "is-invalid" : ""
                            }`}
                          id="fechaFin"
                          name="fechaFin"
                          style={inputStyle}
                          value={fecha_fin_inscripcion}
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
                          Fecha de Inicio Evento
                        </label>
                        <input
                          type="date"
                          className={`form-control ${fechaInicioEventError ? "is-invalid" : ""
                            }`}
                          id="fechaInicio"
                          name="fechaInicio"
                          style={inputStyle}
                          value={fecha_inicio_evento}
                          onChange={handleFechaInicioEventChange}
                        />
                        {fechaInicioEventError && (
                          <div className="invalid-feedback">
                            {fechaInicioEventError}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="fechaFin" className="form-label">
                          Fecha de Fin Evento
                        </label>
                        <input
                          type="date"
                          className={`form-control ${fechaFinEventError ? "is-invalid" : ""
                            }`}
                          id="fechaFin"
                          name="fechaFin"
                          style={inputStyle}
                          value={fecha_fin_evento}
                          onChange={handleFechaFinEventChange}
                        />
                        {fechaFinEventError && (
                          <div className="invalid-feedback">
                            {fechaFinEventError}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="horas" className="form-label">
                          horas
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
                      <div><label className="form-check-label" htmlFor="flexSwitchCheckDefault">Publicar evento</label> </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                          checked={publico}
                          onChange={(e) => setPublico(e.target.checked)} />
                      </div>

                    
                      <div className="mb-3" style={{ direction: 'ltr', textAlign: 'left' }}>
                        <label htmlFor="descripcion" className="form-label">
                          Descripción
                        </label>
                        <Editor
                          apiKey="et3kv22txmedmy751hwdgrmywr1k93evr5t5in9vmjh0mze8"
                          initialValue={descripcion}
                          init={{
                            directionality: 'ltr', 
                          }}
                          onEditorChange={handleDescripcionChange}
                        />
                      </div>



                      <button type="submit" id="botoncito"className="btn btn-primary">
                        Guardar
                      </button>
                    </form>
                  </div>
                  
                    <div>
                      <button type="button" className="btn btn-warning btn-lg btn-block mx-auto boton-2" id="Afiche" onClick={() => navigate('/crearafiche')} >Crear afiche</button>
                      <br></br>
                      <input type="file" onChange={handleFileChange} style={{ display: 'none', visibility: 'hidden' }}/>
                      <label htmlFor="subirAfiche" type="button" className="btn btn-warning btn-lg btn-block mx-auto boton-2" >Subir afiche</label>
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

export default Decription;