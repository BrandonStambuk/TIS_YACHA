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
  const [filtroTipo, setFiltroTipo] = useState(''); // Estado para el tipo de evento seleccionado

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
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="card card-translucent">
              <h3 className="card-header">Competencia Local UMSS</h3>
              {/* Filtro */}
              <div className="mb-3">
                <select id="tipoEvento" className="form-select form-select-lg" value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Reclutamiento">Reclutamiento</option>
                  <option value="Taller de reclutamiento">Taller de reclutamiento</option>
                  <option value="Competencia de entrenamiento">Competencia de entrenamiento</option>
                  <option value="Competencia interna">Reclutamiento</option>
                  {/* Refactorizar */}
                </select>
              </div>
              <div ref={containerRef} className="card-body event-container">
                {eventos.map((evento) => (
                  (filtroTipo === '' || evento.tipo_evento === filtroTipo) && (
                    <div className="mt-1" key={evento.id}>
                      <div className="image-container">
                        <img src={imagen1} alt="Cabeza" />
                        <p className="test">{evento.nombre_evento}</p>
                      </div>
                      <div className="card-footer bg-white shadow image-container">
                        <div className="event-info">
                          <p className="event-info-text left"><strong>Tipo de evento: </strong>{evento.tipo_evento}</p>
                          <div className="row">
                            <p className="event-info-text left col-md-8"><strong>Inicio: </strong>{evento.fecha_inicio}</p>
                            <p className="event-info-text left col-md-4"><strong></strong>{evento.hora} Horas</p>
                          </div>
                          <Link to={`/mostrar/${evento.id}`} className='btn btn-info'>Ver</Link>
                        </div>
                      </div>
                    </div>
                  )
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