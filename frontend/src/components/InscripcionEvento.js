import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";


import { URL_API } from "../const";


const endpoint = URL_API;

const CreateEvento = () => {
  const [activeSection, setActiveSection] = useState("nombreEvento");


  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

 
const handleStoreInscripcion = async () => {
  
}

 

  

  return (
    <div>
      <NavbarAdmin />
      <div className="mt-5">
        <div className="row">
          <div className="col-md-2 p-0">
            <div className="d-flex flex-column">
              <button
                onClick={() => handleSectionClick("datosGenerales")}
                className={`button mb-2 ${activeSection === "datosGenerales" ? "active" : ""}`}>
                Datos Generales
              </button>
              <button
                onClick={() => handleSectionClick("requisitos")}
                className={`button mb-2 ${activeSection === "requisitos" ? "active" : ""}`}>
                Requisitos
              </button>              
              <button onClick={handleStoreInscripcion} className='btn btn-success'>Guardar</button>
              <Link to="/listaEventos" className='btn btn-danger'>Cancelar</Link>
            </div>
          </div>
          <div className="col-md-6">
            {activeSection === "datosGenerales" && (
              <h1>datos</h1>
            )}
            {activeSection === "requisitos" && (
              <h1>requisitos</h1>
            )}            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvento;