import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './css/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from '../components/images/mi_afiche.png';

const endpoint = 'http://localhost:8000/api';

const HomePage = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    getAllEventos();
  }, []);

  const getAllEventos = async () => {
    const response = await axios.get(`${endpoint}/eventos`);
    setEventos(response.data);
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card card-translucent">
              <h3 className="card-header">Competencia Local UMSS</h3>
              <div className="card-body">
                {eventos.map((evento) => (
                <div className="row">                  
                  <div className="col-md-8">
                    <img src={imagen1} alt="Afiche de Evento" />
                  </div>
                  <div className="col-md-6">                    
                    <div className="event-info">
                      <p className="event-info-text left">Inicio del evento: {evento.fecha_inicio}</p>
                      <p className="event-info-text left">Descripción:{evento.descripcion}</p>
                      <p className="event-info-text left">Lugar: Laboratorio 1 del Departamento de Informática</p>                     
                    </div>                    
                  </div>                  
                </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;