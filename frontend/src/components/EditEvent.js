import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import Navbar from './Navbar';
import './css/CrearEvento.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import derImage from './images/der.png';
//import izqImage from './images/izq.png';
//import cenImage from './images/cen.png';
//import jusImage from './images/jus.png';

const inputStyle = {
  width: '170px',
  height: '30px',
  fontSize: '14px',
};

const endpoint = 'http://localhost:8000/api/crearevento';

const EditEvento = () => {
  const [nombre_evento, setNombreEvento] = useState('');
  const [tipo_evento, setTipoEvento] = useState('');
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicioError, setFechaInicioError] = useState('');
  const [fechaFinError, setFechaFinError] = useState('');
  const [nombreEventoError, setNombreEventoError] = useState('');
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleTipoEventoChange = (event) => {
    setTipoEvento(event.target.value);
  };

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {

    setFechaFin(event.target.value);
  };

  const handleHorasChange = (event) => {
    setHora(event.target.value);
  };

  const update = async (e) => {
    e.preventDefault();
  
    // Validación del nombre del evento
    if (!/^[A-Z][A-Za-z0-9 ]{0,20}$/.test(nombre_evento)) {
      setNombreEventoError(
        'No están permitidos caracteres especiales ni más de 21 caracteres.'
      );
    } else {
      setNombreEventoError('');
      const selectedStartDate = new Date(fecha_inicio);
      const selectedEndDate = new Date(fecha_fin);
      const currentDate = new Date();
  
      if (selectedStartDate <= currentDate) {
        setFechaInicioError('La fecha de inicio debe ser posterior al día de hoy.');
      } else {
        setFechaInicioError('');
  
        if (selectedEndDate < selectedStartDate) {
          setFechaFinError('La fecha de fin no puede ser anterior a la fecha de inicio.');
        } else {
          setFechaFinError('');
  
          // Todas las validaciones pasaron
          await axios.put(`${endpoint}/${id}`, {
            nombre_evento: nombre_evento,
            tipo_evento: tipo_evento,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            hora: hora,
            descripcion: descripcion,
          });
  
          navigate('/ListaEventos');
        }
      }
    }
  };


  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await axios.get(`${endpoint}/${id}`);
        setNombreEvento(response.data.nombre_evento);
        setTipoEvento(response.data.tipo_evento);
        setFechaInicio(response.data.fecha_inicio);
        setFechaFin(response.data.fecha_fin);
        setHora(response.data.hora);
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
                    <h2 className="card-title text-center">Editar Evento</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <form onSubmit={update} className="text-left">
                    <div className="mb-3">
                        <label htmlFor="nombreEvento" className="form-label">
                          Nombre del Evento
                        </label>
                        <input
                          value={nombre_evento}
                          onChange={(e) => setNombreEvento(e.target.value)}
                          type="text"
                          className={`form-control ${
                            nombreEventoError ? 'is-invalid' : ''
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
                              checked={tipo_evento === 'Reclutamiento'}
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
                              checked={tipo_evento === 'Taller de reclutamiento'}
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
                              checked={tipo_evento === 'Competencia de entrenamiento'}
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
                              checked={tipo_evento === 'Competencia interna'}
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
                          className={`form-control ${
                            fechaInicioError ? "is-invalid" : ""
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
                          className={`form-control ${
                            fechaFinError ? "is-invalid" : ""
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
                        <label htmlFor="horas" className="form-label">Horas</label>
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
                      <button type="submit" className="btn btn-primary">Actualizar</button>
                    </form>
                  </div>
                  <div className="col-md-6 mx-auto">
                    <div className="mb-3">
                      <label htmlFor="descripcion" className="form-label">Descripción</label>
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
                            onClick={() => handleTextAlignChange('left')}
                            className={`btn btn-light ${textAlign === 'left' ? 'active' : ''
                              }`}
                          >
                            Izquierda
                          </button>
                          <button
                            onClick={() => handleTextAlignChange('center')}
                            className={`btn btn-light ${textAlign === 'center' ? 'active' : ''
                              }`}
                          >
                            Centro
                          </button>
                          <button
                            onClick={() => handleTextAlignChange('right')}
                            className={`btn btn-light ${textAlign === 'right' ? 'active' : ''
                              }`}
                          >
                            Derecha
                          </button>
                          <button
                            onClick={() => handleTextAlignChange('justify')}
                            className={`btn btn-light ${textAlign === 'justify' ? 'active' : ''
                              }`}
                          >
                            Justificado
                          </button>
                        </div>
                      </div>
                      <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows="4"
                        style={{
                          fontSize: `${fontSize}px`,
                          textAlign: textAlign,
                          width: '100%',
                          height: '200px',
                          resize: 'none',
                        }}
                      ></textarea>
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