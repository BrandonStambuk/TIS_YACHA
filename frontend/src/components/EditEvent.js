import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'

const inputStyle = {
    width: '170px',
    height: '30px',
    fontSize: '14px',
  };

const endpoint = 'http://localhost:8000/api/crearevento/'

const EditEvento = () => {

    const [nombre_evento, setNombreEvento] = useState('')
    //const [tipo_evento, setTipoEvento] = useState('')
    //const [fecha_inicio, setFechaInicio] = useState('')
    //const [fecha_fin, setFechaFin] = useState('')
    //const [descripcion, setDescripcion] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
/*
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
        setDescripcion(event.target.value);
      };*/

    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${endpoint}${id}`, {
            nombre_evento: nombre_evento,
            //tipo_evento: tipo_evento,
            //fecha_inicio: fecha_inicio,
            //fecha_fin: fecha_fin,
            //descripcion: descripcion,
        })
        navigate('/')
    }

    useEffect( () =>{

        const getEventoById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setNombreEvento(response.data.nombre_evento)
            //setTipoEvento(response.data.tipo_evento)
            //setFechaInicio(response.data.fecha_inicio)
            //setFechaFin(response.data.fecha_fin)
            //setDescripcion(response.data.descripcion)            
        }
        getEventoById()
        
    }, [])
  return (
    <div>
        <Navbar />
        <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="cardd">
            <div className="card-body">
              <div className="row">
                {/* Columna izquierda para el form */}
                <div className="col-md-8">
                  <h2 className="card-title">Editar Evento</h2>
                  <form onSubmit={update}>
                    <div className="mb-3">
                      <label htmlFor="nombreEvento" className="form-label">Nombre del Evento</label>
                      <input
                        value={nombre_evento} 
                        onChange={ (e)=> setNombreEvento(e.target.value)}
                        type="text"
                        className="form-control"
                        id="nombreEvento"
                        name="nombreEvento"
                        style={inputStyle}
                      />
                    </div>
                    {/*<div className="mb-3">
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
                      <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio</label>
                      <input
                        type="date"
                        className="form-control"
                        id="fechaInicio"
                        name="fechaInicio"
                        style={inputStyle}
                        value={fecha_inicio}
                        onChange={handleFechaInicioChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fechaFin" className="form-label">Fecha de Fin</label>
                      <input
                        type="date"
                        className="form-control"
                        id="fechaFin"
                        name="fechaFin"
                        style={inputStyle}
                        value={fecha_fin}
                        onChange={handleFechaFinChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="horas" className="form-label">Horas</label>
                      <select
                        className="form-select"
                        id="horas"
                        name="horas"
                        style={inputStyle}
                        value={descripcion}
                        onChange={handleHorasChange}
                      >
                        <option value="">Seleccionar horas</option>
                        <option value="1">1 hora</option>
                        <option value="2">2 horas</option>
                        <option value="3">3 horas</option>
                        <option value="4">4 horas</option>                        
                      </select>
                    </div>*/}
                    <button type="submit" className="btn btn-primary">actualizar</button>
                  </form>
                </div>
                {/* Columna derecha para el título "Descripción" */}
                {/* <div className="col-md-4">
                  <h3>Descripción</h3>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* Columna derecha vacía para editar no consigo mover la tarjeta un poco mas al centro xd
        <div className="col-md-4">
            <p>estoy aqui</p>
        </div> */}
      </div>
    </div>
    </div>
  )
}

export default EditEvento