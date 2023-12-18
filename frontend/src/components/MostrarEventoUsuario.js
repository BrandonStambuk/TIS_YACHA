import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './css/CrearEvento.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from '../components/images/mi_afiche.png';
import { Link } from 'react-router-dom';
import { URL_API } from '../const';
import NavbarCoach from './NavbarCoach';

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
  const isAuthenticated = localStorage.getItem('token');
  const rol = localStorage.getItem('role');

 return (
    <div>
      {isAuthenticated && (
      rol === "Coach") ? <NavbarCoach /> : <Navbar />
      }
      <div className="container mt-5">
        <div className="row">
          {/* Image Card */}
          <div className="col-md-6">
            <div className="card card-custom p-4" style={{ border: '4px solid RGB(15, 93, 162)' }}>
              <h2 className='card-title'>Afiche</h2>
              <img className="imagenevento" src={imagen} alt={nombre_evento} />
            </div>
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