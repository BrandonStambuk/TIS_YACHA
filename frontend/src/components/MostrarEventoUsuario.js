import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './css/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from '../components/images/mi_afiche.png';
import { Link } from 'react-router-dom';
import { URL_API } from '../const';

const endpoint = `${URL_API}/crearevento`;

const HomePage = () => {
    const [nombre_evento, setNombreEvento] = useState('');
    const [tipo_evento, setTipoEvento] = useState('');
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_fin, setFechaFin] = useState('');
    const [hora, setHora] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const gradientBackground = {
  background: 'linear-gradient(to bottom,#007bff ,#ffffff )'
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
        console.log(response.data.nombre_evento);
      } catch (error) {
        
        console.error('Error al obtener los datos del evento:', error);
      }
    };
    getEventById();
  }, []);

  const getEventoImage = (id) => {
    try {
      return require(`../../../BackendICPC/storage/app/public/uploads/${id}.jpg`);
    } catch (err) {
      return imagen1;      
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
            <img className="imagenevento" src={getEventoImage(id)} alt={nombre_evento} />
          </div>
          <div className="event-info-text left">
            <h2 event-info-text left>{nombre_evento}</h2>
          </div>
          <div className="col-md-6">                    
                    <div className="event-info">
                      <p className="event-info-text left"> <strong>Tipo de evento: </strong>{tipo_evento}</p>
                      <p className="event-info-text left"> <strong>Inicio del evento: </strong>{fecha_inicio}</p>
                      <p className="event-info-text left"><strong>Duracion: </strong>{hora} Horas </p>
                    </div>                    
                  </div>
          <div>
          <p className="event-info-text left"> <strong>Descripción:</strong></p>
          <p className="event-info-text left"> {descripcion}</p>  
          </div>
          <div>
          <Link to={`/home`} className='btn btn-danger'>Atras</Link> 
          <Link to={`/registroEvento/${id}`} className='btn btn-info'>Ir a registro</Link> 
          </div>                  
        </div>
          
                
      </div>
    </div>
      
  );
};

export default HomePage;