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
import Footer from './Footer';
import { URL_API } from '../const';
import Cabecera from './Cabecera';

const endpoint = URL_API;

const HomePage = () => {
  const containerRef = useRef();
  const [eventos, setEventos] = useState([]);
  const [fecha_inicio_evento, setFecha_inicio_evento] = useState([]);
  const [eventosPasados, setEventosPasados] = useState([]);
  const [scrolling, setScrolling] = useState(0);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroTipoPasados, setFiltroTipoPasados] = useState('');
  const [noticias, setNoticias] = useState([]);
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(`${endpoint}/noticiasDisponibles`);
        setNoticias(response.data);
      } catch (error) {
        console.error('Error al obtener noticias:', error);
      }
    };
    getAllEventos();
    fetchNoticias();
  }, []);

  const imagenesEvento = {
    "Reclutamiento": imagen1,
    "Taller de reclutamiento": imagen2,
    "Competencia de entrenamiento": imagen3,
    "Competencia interna": imagen4
  };

  const getAllEventos = async () => {
    const event = await axios.get(`${endpoint}/eventosDinamicos`);
    setEventos(event.data);
    const fechas = await axios.get(`${endpoint}/fechasInscripcion`);
    setFecha_inicio_evento(fechas.data);
  };
  // const getAllFechasInicio = async () => {
  //   const response = await axios.get(`${endpoint}/fechasInscripcion`);
  //   setFecha_inicio_evento(response.data);
  //   console.log(response.data);
  // };
  /*const getAllEventosPasados = async () => {
    const response = await axios.get(`${endpoint}/mostrarPublicoPasados`);
    setEventosPasados(response.data);
  };*/

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
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 flex-grow-1">
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
                    let fechaInicio = fecha_inicio_evento.find(fecha => fecha.evento_dinamicos_id === evento.id);
                    if (filtroTipo === '' || evento.tipo_evento === filtroTipo) {
                      elements.push(
                        <div className="mt-1" key={evento.id}>
                          <div className="image-container">
                            <img src={imagen1} alt="Cabeza" />
                            <p className="test">{evento.nombre_evento_dinamico}</p>
                          </div>
                          <div className="card-footer image-container">
                            <div className="event-info">
                              <p className="event-info-text left"><strong>Nombre: </strong>{evento.nombre_evento_dinamico}</p>
                              <p className="event-info-text left"><strong>Tipo de evento: </strong>{evento.tipo_evento_dinamico.nombre_tipo_evento_dinamico}</p>
                              <p className="event-info-text left col-md-12"><strong>Inscripciones: </strong>{fechaInicio ? fechaInicio.fecha_inicio_inscripcion : 'Fecha no disponible'}</p>
                              <p className="event-info-text left"><strong>Lugar: </strong>{evento.lugar_evento_dinamico}</p>
                              <Link to={`/mostrar/${evento.id}`} className='text-decoration-none boton-ver'>Ver</Link>
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
            {noticias.map((noticia) => (
                      <div key={noticia.id} className="card card-translucent mt-5">
                        <div className="card-body">
                          <h5 className="card-title">{noticia.titulo}</h5>
                          <p className="card-text">{noticia.contenido}</p>
                          {/* Otros detalles de la noticia */}
                        </div>
                      </div>
                    ))}
          </div>
        </div>
      </div>
      <div className="scroll-buttons">
        <button onMouseDown={() => startScrolling(-10)} onMouseUp={() => stopScrolling()}>&lt;</button>
        <button onMouseDown={() => startScrolling(10)} onMouseUp={() => stopScrolling()}>&gt;</button>
      </div>





      <Footer />
    </div>
  );
};

export default HomePage;