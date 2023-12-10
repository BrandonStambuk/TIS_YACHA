import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NombreEventoForm from "./componentesEventoDinamico/NombreEventoForm";
import TipoEventoForm from "./componentesEventoDinamico/TipoEventoForm";
import FechasHorasForm from "./componentesEventoDinamico/FechasHorasForm";
import DescripcionForm from "./componentesEventoDinamico/DescripcionForm";
import RequisitosForm from "./componentesEventoDinamico/RequisitosForm";


import { URL_API } from "../const";


const endpoint = URL_API;

const CreateEvento = () => {
  const [nombre_evento_dinamico, setNombreEventoDinamico] = useState("");
  const [tipo_evento_dinamico_id, setTipoEventoDinamicoId] = useState("");
  const [fecha_inicio_inscripcion, setFechaInicioInscripcion] = useState("");
  const [fecha_fin_inscripcion, setFechaFinInscripcion] = useState(""); 
  const [activeSection, setActiveSection] = useState("nombreEvento");
  const [fechasHoras, setFechasHoras] = useState([{}]);
  const [descripcion, setDescripcion] = useState("");
  const [lugar_evento_dinamico, setLugarEventoDinamico] = useState("");
  const [cantidad_participantes_evento_dinamico, setCantidadParticipantesEventoDinamico] = useState("");
  const [requisitosSeleccionados, setRequisitosSeleccionados] = useState([]);

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
  for (const fechaHora of fechasHoras) {    
    const fechaInicioEtapa = fechaHora.fecha_inicio_etapa;
    const fechaFinEtapa = fechaHora.fecha_fin_etapa;
    const horaInicioEtapa = fechaHora.hora_inicio;
    const horaFinEtapa = fechaHora.hora_fin;
    const contenidoEtapa = fechaHora.contenido_etapa;

    await axios.post(`${endpoint}/crearEtapaEvento`, {
      fecha_inicio_etapa: fechaInicioEtapa,
      fecha_fin_etapa: fechaFinEtapa,
      hora_inicio_etapa:horaInicioEtapa,
      hora_fin_etapa:horaFinEtapa,
      contenido_etapa:contenidoEtapa,
      etapa_fecha_inscripcion_eventos_id: idFechaIns      
    });
  }

  await axios.post(`${endpoint}/crearEventoDinamico`, {
    nombre_evento_dinamico: nombre_evento_dinamico,
    tipo_evento_dinamico_id:tipo_evento_dinamico_id,
    fecha_inscripcion_eventos_id:idFechaIns,
    descripcion_evento_dinamico:descripcion,
    lugar_evento_dinamico:lugar_evento_dinamico,
    cantidad_participantes_evento_dinamico:cantidad_participantes_evento_dinamico
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

const handleFechasHorasChange = (fechas) => {
  setFechasHoras(fechas);  
}

const handleDescripcion = (descripcion) => {
  setDescripcion(descripcion);
}

const handleLugarEventoChange = (lugar) => {
  setLugarEventoDinamico(lugar);
}
const handleCantidadParticipanetesEventoChange = (cantidad) => {
  setCantidadParticipantesEventoDinamico(cantidad);
}

const handleRequisitosSeleccionados = (requisitos) => {
  setRequisitosSeleccionados(requisitos);
}

  return (
    <div>
      <NavbarAdmin />
      <div className="mt-5">
        <div className="row">
          <div className="col-md-2 p-0">
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
              <button
                onClick={() => handleSectionClick("requisitos")}
                className={`button mb-2${activeSection === "requisitos" ? "active" : ""
                  }`}
              >
                Requisitos
              </button>
              <button onClick={handleStoreEventoDinamico} className='btn btn-success'>Guardar</button>  
            </div>
          </div>
          <div className="col-md-6">
              {activeSection === "nombreEvento" && (
                <NombreEventoForm
                  nombreEvento={nombre_evento_dinamico}
                  lugarEvento={lugar_evento_dinamico}
                  cantidadParticiapantesEvento={cantidad_participantes_evento_dinamico} 
                onNombreEventoChange={handleNombreEventoChange}
                onLugarEventoChange={handleLugarEventoChange}
                onCantidadParticipantesChange={handleCantidadParticipanetesEventoChange}

                />
              )}
              {activeSection === "tipoEvento" && (
                <TipoEventoForm 
                onTipoEvento={handleTipoEventoChange}
                onValorSeleccionado={tipo_evento_dinamico_id}
                />
              )}
              {activeSection === "fechasHoras" && (                
                <FechasHorasForm 
                onFechaInicioInscripcion={handleFechaInicioInscripcion}
                onFechaFinInscripcion={handleFechaFinInscripcion}
                onFechasHorasChange={handleFechasHorasChange}
                FechaInicioIn={fecha_inicio_inscripcion}
                FechaFinIn={fecha_fin_inscripcion} 
                FechasHorasNuevo={fechasHoras}
                />
              )}
              {activeSection === "descripcion" && (
                <DescripcionForm onDescripcionChange={handleDescripcion}/>
              )}
              {activeSection === "requisitos" && (
                <RequisitosForm onRequisitos={handleRequisitosSeleccionados} />
              )}                         
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvento;