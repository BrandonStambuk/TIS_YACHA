import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './css/CrearEvento.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { URL_API } from '../const';
import izqImage from "./images/izq.png";
import derImage from "./images/der.png";
import cenImage from "./images/cen.png";
import jusImage from "./images/jus.png";
import NavbarOrganizador from './NavbarOrganizador';

const inputStyle = {
  width: '170px',
  height: '30px',
  fontSize: '14px',
};

const endpoint = `${URL_API}/crearevento`;

const EditEvento = () => {
  const [nombre_evento, setNombreEvento] = useState('');
  const [tipo_evento, setTipoEvento] = useState('');
  const [fecha_inicio_inscripcion, setFechaInicioIns] = useState("");
  const [fecha_fin_inscripcion, setFechaFinIns] = useState("");
  const [fecha_inicio_evento, setFechaInicioEvent] = useState("");
  const [fecha_fin_evento, setFechaFinEvent] = useState("");
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicioError, setFechaInicioError] = useState("");
  const [fechaFinError, setFechaFinError] = useState("");
  const [fechaInicioEventError, setFechaInicioEventError] = useState("");
  const [fechaFinEventError, setFechaFinEventError] = useState("");
  const [horaEventoError, sethoraEventoError] = useState("");
  const [nombreEventoError, setNombreEventoError] = useState('');
  const [publico, setPublico] = useState(false);
  const [mensajePublico, setMensajePublico] = useState("Publicar Evento");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleTipoEventoChange = (event) => {
    setTipoEvento(event.target.value);
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

  const update = async (e) => {
    e.preventDefault();
    const selectedStartDate = new Date(fecha_inicio_inscripcion);
    const selectedEndDate = new Date(fecha_fin_inscripcion);
    const currentDate = new Date();
    let todosErrores=[];
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
    // Validación del nombre del evento
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
      setNombreEventoError('');
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
    if (todosErrores.length===0) {
      await axios.put(`${endpoint}/${id}`, {
        // Todas las validaciones pasaron
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
      navigate('/ListaEventos');
    }
  };


  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await axios.get(`${endpoint}/${id}`);
        setNombreEvento(response.data.nombre_evento);
        setTipoEvento(response.data.tipo_evento);
        setFechaInicioIns(response.data.fecha_inicio_inscripcion);
        setFechaFinIns(response.data.fecha_fin_inscripcion);
        setFechaInicioEvent(response.data.fecha_inicio_evento);
        setFechaFinEvent(response.data.fecha_fin_evento);
        setHora(response.data.hora);
        setPublico(response.data.publico)
        setDescripcion(response.data.descripcion);
        
      } catch (error) {
        console.error('Error al obtener los datos del evento:', error);
      }
    };
    getEventById();
  }, []);

  // Estados para el tamaño de fuente y la alineación del texto
  const [fontSize, setFontSize] = useState(16); // Tamaño de fuente inicial
  const [textAlign, setTextAlign] = useState('left'); // Alineación inicial

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
  const isAuthenticated = localStorage.getItem('token');
  const rol = localStorage.getItem('role');

  return (
    <div>
      {isAuthenticated && (
      rol === "Admin" ? <NavbarAdmin /> : (rol === "Creador" ? <NavbarOrganizador /> : null)
      )}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-body tarjeta">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="card-title text-center text-blue">Editar Evento</h2>
                  </div>
                </div>
                <div className="row text-black">
                  <div className="col-md-6">
                    <form onSubmit={update} className="text-left">
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
                      <button type="submit" id="botoncito"className="btn btn-primary">
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
    </div>
  );
};

export default EditEvento;