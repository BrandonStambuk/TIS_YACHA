import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './css/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from '../components/images/cabeza.jpg';
import imagen2 from '../components/images/cabeza2.jpg';
import imagen3 from '../components/images/cabeza3.jpg';
import imagen4 from '../components/images/cabeza4.jpg';
import { Link } from 'react-router-dom';
import { URL_API } from '../const';
import Cabecera from './Cabecera';

const endpoint = URL_API;

const HomePage = () => {
  const containerRef = useRef();
  const [eventos, setEventos] = useState([]);
  const [scrolling, setScrolling] = useState(0);
  const [filtroTipo, setFiltroTipo] = useState('');

  useEffect(() => {
    getAllEventos();
  }, []);

  const imagenesEvento = {
    "Reclutamiento": imagen1,
    "Taller de reclutamiento": imagen2,
    "Competencia de entrenamiento": imagen3,
    "Competencia interna": imagen4
  };

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

  const resetScroll = () => {
    const container = containerRef.current;
    container.scrollTo({ left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    resetScroll();
  }, [filtroTipo]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="card card-translucent">
              <h3 className="card-header">Eventos Próximos UMSS</h3>
              <div className="mb-3">
                <select id="tipoEvento" className="form-select form-select-lg" value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Reclutamiento">Reclutamiento</option>
                  <option value="Taller de reclutamiento">Taller de reclutamiento</option>
                  <option value="Competencia de entrenamiento">Competencia de entrenamiento</option>
                  <option value="Competencia interna">Competencia interna</option>
                </select>
              </div>
              <div ref={containerRef} className="card-body event-container">
                {eventos && eventos.length > 0 && (() => {
                  let elements = [];
                  for (let i = 0; i < eventos.length; i++) {
                    let evento = eventos[i];
                    if (filtroTipo === '' || evento.tipo_evento === filtroTipo) {
                      elements.push(
                        <div className="mt-1" key={evento.id}>
                          <div className="image-container">
                            <img src={imagenesEvento[evento.tipo_evento]} alt="Cabeza" />
                            <p className="test">{evento.nombre_evento}</p>
                          </div>
                          <div className="card-footer bg-white shadow-lg image-container">
                            <div className="event-info">
                              <p className="event-info-text left"><strong>Tipo de evento: </strong>{evento.tipo_evento}</p>
                              <div className="row">
                                <p className="event-info-text left col-md-8"><strong>Inicio: </strong>{evento.fecha_inicio}</p>
                                <p className="event-info-text left col-md-4"><strong></strong>{evento.hora} Horas</p>
                              </div>
                              <Link to={`/mostrar/${evento.id}`} className='boton-ver'>Ver</Link>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                  return elements;
                })()}
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