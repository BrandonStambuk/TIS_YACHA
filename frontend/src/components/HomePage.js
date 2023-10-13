import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    const response = await axios.get(`${endpoint}/mostrarPublico`);
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
                <div className="row mt-3">                  
                  <div className="col-md-6">
                    <img src={imagen1} alt="Afiche de Evento" />
                  </div>
                  <div className="col-md-6">                    
                    <div className="event-info">
                      <p className="event-info-text left"> <strong>Inicio del evento: </strong>{evento.fecha_inicio}</p>
                      <p className="event-info-text left"><strong>Duracion: </strong>{evento.hora} Horas </p>  
                      <p className="event-info-text left"> <strong>Descripción: </strong>{evento.descripcion}</p>                   
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