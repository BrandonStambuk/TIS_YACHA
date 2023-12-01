import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NombreEventoForm from "./componentesEventoDinamico/NombreEventoForm";
import TipoEventoForm from "./componentesEventoDinamico/TipoEventoForm";
import FechasHorasForm from "./componentesEventoDinamico/FechasHorasForm"; 

import { URL_API } from "../const";


const endpoint = URL_API;

const CreateEvento = () => {
  const [nombre_evento_dinamico, setNombreEventoDinamico] = useState("");
  const [tipo_evento_dinamico_id, setTipoEventoDinamicoId] = useState("");
  const [fecha_inscripcion_eventos_id, setFechaInscripcionEventosId] = useState("");
  const [fecha_inicio_inscripcion, setFechaInicioInscripcion] = useState("");
  const [fecha_fin_inscripcion, setFechaFinInscripcion] = useState("");
  const [fecha_inicio_etapa, setfechaInicioEtapa] = useState("");
  const [fecha_fin_etapa, setFechaFinEtapa] = useState("");
  const [hora_inicio_etapa, setHoraInicioEtapa] = useState("");
  const [hora_fin_etapa, setHoraFinEtapa] = useState("");
  const [etapa_fecha_inscripcion_eventos_id, setEtapaFechaInscripcionEventosId] = useState("");
  const [activeSection, setActiveSection] = useState("nombreEvento");

const handleSectionClick = (section) => {
  setActiveSection(section);
};

const handleStoreEventoDinamico = async (e) => {
  e.preventDefault();
  const response =await axios.post(`${endpoint}/crearFechaInscripcion`, {
    fecha_inicio_inscripcion: fecha_inicio_inscripcion,
    fecha_fin_inscripcion:fecha_fin_inscripcion
  });
  const idFechaIns =response.data.id;  

  await axios.post(`${endpoint}/crearEtapaEvento`, {
    fecha_inicio_etapa: fecha_inicio_etapa,
    fecha_fin_etapa:fecha_fin_etapa,
    etapa_fecha_inscripcion_eventos_id:idFechaIns
  });

  await axios.post(`${endpoint}/crearEventoDinamico`, {
    nombre_evento_dinamico: nombre_evento_dinamico,
    tipo_evento_dinamico_id:tipo_evento_dinamico_id,
    fecha_inscripcion_eventos_id:idFechaIns
  });


}

const handleNombreEventoChange = (nombre_evento) => {
  setNombreEventoDinamico(nombre_evento);  
};

const handleTipoEventoChange = (tipo_evento) => {
  setTipoEventoDinamicoId(tipo_evento);  
}


const handleFechaInicioInscripcion = (fecha) => {
  setFechaInicioInscripcion(fecha);  
}
const handleFechaFinInscripcion = (fecha) => {
  setFechaFinInscripcion(fecha);  
}
const handleInicioEtapa = (fecha) => {
  setfechaInicioEtapa(fecha);  
}
const handleFinEtapa = (fecha) => {
  setFechaFinEtapa(fecha);  
}
const handleHoraInicio = (fecha) => {
  setHoraInicioEtapa(fecha);  
}
const handleHoraFin = (fecha) => {
  setHoraFinEtapa(fecha);  
}

  return (
    <div>
      <NavbarAdmin />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-2">
            <div className="d-flex flex-column">
              <button
                onClick={() => handleSectionClick("nombreEvento")}
                className={`button mb-2 ${activeSection === "nombreEvento" ? "active" : ""
                  }`}
              >
                Nombre Evento
              </button>
              <button
                onClick={() => handleSectionClick("tipoEvento")}
                className={`button mb-2 ${activeSection === "tipoEvento" ? "active" : ""
                  }`}
              >
                Tipo Evento
              </button>
              <button
                onClick={() => handleSectionClick("fechasHoras")}
                className={`button mb-2 ${activeSection === "fechasHoras" ? "active" : ""
                  }`}
              >
                Fechas y Horas
              </button>
              <button
                onClick={() => handleSectionClick("descripcion")}
                className={`button mb-2${activeSection === "descripcion" ? "active" : ""
                  }`}
              >
                Descripción
              </button>
              <button onClick={handleStoreEventoDinamico} className='btn btn-success'>Guardar</button>  
            </div>
          </div>
          <div className="col-md-6">
              {activeSection === "nombreEvento" && (
                <NombreEventoForm onNombreEventoChange={handleNombreEventoChange}/>
              )}
              {activeSection === "tipoEvento" && (
                <TipoEventoForm onTipoEvento={handleTipoEventoChange}/>
              )}
              {activeSection === "fechasHoras" && (                
                <FechasHorasForm 
                onFechaInicioInscripcion={handleFechaInicioInscripcion}
                onFechaFinInscripcion={handleFechaFinInscripcion}
                onFechaInicioEtapa={handleInicioEtapa}
                onFechaFinEtapa={handleFinEtapa}
                onHoraInicio={handleHoraInicio}
                onHoraFin={handleHoraFin}
                />
              )}
              {activeSection === "descripcion" && (
                <h1>Descripción</h1>
                /*<DescripcionForm/>*/
              )}                        
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvento;
