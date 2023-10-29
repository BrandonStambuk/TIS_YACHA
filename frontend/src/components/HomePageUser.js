import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './css/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from '../components/images/cabeza.jpg';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';

const HomePage = () => {
  const containerRef = useRef();
  const [eventos, setEventos] = useState([]);
  const [scrolling, setScrolling] = useState(0);

  useEffect(() => {
    getAllEventos();
  }, []);

  const getAllEventos = async () => {
    const response = await axios.get(`${endpoint}/mostrarPublico`);
    setEventos(response.data);
  };

  const scrollContainer = (scrollAmount) => {
    const container = containerRef.current;
    container.scrollLeft += scrollAmount;
  };

  const startScrolling = (scrollAmount) => {
    setScrolling(setInterval(() => scrollContainer(scrollAmount), 10));
  };

  const stopScrolling = () => {
    clearInterval(scrolling);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-translucent">
              <h3 className="card-header">Competencia Local UMSS</h3>
              <div ref={containerRef} className="card-body event-container">
                {eventos.map((evento) => (
                  <div className="mt-3">
                    <div className="image-container">
                      <img src={imagen1} alt="Cabeza" />
                      <p className="test">{evento.nombre_evento}</p>
                    </div>
                    <div className="card-footer bg-white shadow">
                      <div className="event-info">
                        <p className="event-info-text left"><strong>Tipo de evento: </strong>{evento.tipo_evento}</p>
                        <div className="row">
                          <p className="event-info-text left col-md-8"><strong>Inicio: </strong>{evento.fecha_inicio}</p>
                          <p className="event-info-text left col-md-4"><strong></strong>{evento.hora} Horas</p>
                        </div>
                        <Link to={`/registroEvento/${evento.id}`} className="btn btn-info">inscripción</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-buttons">
        <button onMouseDown={() => startScrolling(-10)} onMouseUp={() => stopScrolling()}>&lt;</button>
        <button onMouseDown={() => startScrolling(10)} onMouseUp={() => stopScrolling()}>&gt;</button>
      </div>
    </div>
  );
};

export default HomePage;