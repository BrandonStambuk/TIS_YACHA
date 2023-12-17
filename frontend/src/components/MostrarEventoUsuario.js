import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './css/CrearEvento.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from '../components/images/mi_afiche.png';
import { Link } from 'react-router-dom';
import { URL_API } from '../const';

const endpoint = URL_API;

const HomePage = () => {
    const [nombre_evento, setNombreEvento] = useState('');
    const [tipo_evento, setTipoEvento] = useState('');
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_fin, setFechaFin] = useState('');    
    const [descripcion, setDescripcion] = useState('');
    const [participantes, setParticipantes] = useState('');
    const [etapas, setEtapas] = useState([]);
    const [imagen, setImagen] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const gradientBackground = {
  background: 'linear-gradient(to bottom,#007bff ,#ffffff )'
    };
  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await axios.get(`${endpoint}/eventosDinamicos/${id}`);
        console.log(response.data);
        setNombreEvento(response.data.nombre_evento_dinamico);
        setTipoEvento(response.data.tipo_evento_dinamico.nombre_tipo_evento_dinamico);
        setFechaInicio(response.data.fecha_inscripcion_evento[0].fecha_inicio_inscripcion);
        setFechaFin(response.data.fecha_inscripcion_evento[0].fecha_fin_inscripcion);
        setParticipantes(response.data.cantidad_participantes_evento_dinamico);
        setDescripcion(response.data.descripcion_evento_dinamico);
        setEtapas(response.data.fecha_inscripcion_evento[0].etapa_evento);
        console.log(response.data.fecha_inscripcion_evento[0].etapa_evento);
      } catch (error) {
        
        console.error('Error al obtener los datos del evento:', error);
      }
      try {
        const responsePath = await axios.get(`${endpoint}/getImage/${id}`);
        setImagen(getEventoImage(responsePath.data.path));
      } catch (error) {
        setImagen("");
      }
    };
    getEventById();
  }, []);

  const getEventoImage = (name) => {
    try {
      return require(`../../../BackendICPC/storage/app/public/${name}`);
    } catch (err) {
      return null;
    }
  };
  const hide=(id)=>{
    if (getEventoImage(id)===imagen1) {
      return {display: "none"};
    }
    return {};
  }

 return (
    <div>
      <Navbar />
      <div className="container mt-5 center">
      <div className="card card-custom p-4" style={gradientBackground}>

          <div className="" style={hide(id)}>
            <img className="imagenevento" src={imagen} alt={nombre_evento} />
          </div>
          <div className="event-info-text center">
            <h2 event-info-text left>{nombre_evento}</h2>
          </div>
          <div className="col-md-6">                    
                    <div className="event-info">
                      <p className="event-info-text left"> <strong>Tipo de evento: </strong>{tipo_evento}</p>
                      <p className="event-info-text left"> <strong>Inicio Inscripcion evento: </strong>{fecha_inicio}</p>
                      <p className="event-info-text left"> <strong>Fin Inscripcion del evento: </strong>{fecha_fin}</p>
                      <p className="event-info-text left"> <strong>Cantidad de Participantes: </strong>{participantes}</p>
                      <div>
                      <p className="event-info-text left"> <strong>Etapas del evento: </strong></p>
                      <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">hora inicio</th>
                                            <th scope="col">hora fin</th>
                                            <th scope="col">Fecha Inicio</th>
                                            <th scope="col">Fecha Fin</th>
                                            <th scope="col">contenido</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {etapas.map((etapa) => (
                                            <tr key={etapa.id}>
                                                <td>{etapa.hora_inicio_etapa}</td>
                                                <td>{etapa.hora_fin_etapa}</td>
                                                <td>{etapa.fecha_inicio_etapa}</td> 
                                                <td>{etapa.fecha_fin_etapa}</td> 
                                                <td>{etapa.contenido_etapa}</td>                                               
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                      </div>
                      
                    </div>                    
                  </div>
          
          <div className="event-info-container">
            <p className="event-info-text left">
              <strong>Descripción:</strong>
            </p>
            <div className="event-description" style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: descripcion }} />
          </div>

          <div>
          <Link to={`/home`} className='boton-atras'>Atras</Link> 
          <Link to={`/registroEvento/${id}`} className='boton-ver'>Ir a registro</Link> 
          </div>                  
        </div>
          
                
      </div>
    </div>
      
  );
};

export default HomePage;