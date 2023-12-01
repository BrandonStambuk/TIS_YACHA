import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NombreEventoForm from "./componentesEventoDinamico/NombreEventoForm";
import TipoEventoForm from "./componentesEventoDinamico/TipoEventoForm";

import { URL_API } from "../const";


const endpoint = `${URL_API}/crearEventoDinamico`;

const CreateEvento = () => {
  const [nombre_evento_dinamico, setNombreEventoDinamico] = useState("");
  const [tipo_evento_dinamico_id, setTipoEventoDinamicoId] = useState("");
  const [activeSection, setActiveSection] = useState("nombreEvento");

const handleSectionClick = (section) => {
  setActiveSection(section);
};
const handleStoreEventoDinamico = async (e) => {
  e.preventDefault();
  console.log(nombre_evento_dinamico);
  console.log(tipo_evento_dinamico_id);
  await axios.post(endpoint, {
    nombre_evento_dinamico: nombre_evento_dinamico,
    tipo_evento_dinamico_id:tipo_evento_dinamico_id
  });
}

const handleNombreEventoChange = (nombre_evento) => {
  setNombreEventoDinamico(nombre_evento);  
};

const handleTipoEventoChange = (tipo_evento) => {
  setTipoEventoDinamicoId(tipo_evento);  
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
                <h1>Fechas y Horas</h1>
                /*<FechasHorasForm/>*/
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
