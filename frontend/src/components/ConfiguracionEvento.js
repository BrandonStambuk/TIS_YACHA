import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NombreEventoForm from "./componentesEventoDinamico/NombreEventoForm";
import TipoEventoForm from "./componentesEventoDinamico/TipoEventoForm";
import NavbarOrganizador from "./NavbarOrganizador";
import ConfiguracionRequisito from "./GestionEventos/ConfiguracionRequisito";
import ConfiguracionTipoEvento from "./GestionEventos/ConfiguracionTipoEvento";



import { URL_API } from "../const";


const endpoint = URL_API;

const CreateEvento = () => {

  const [activeSection, setActiveSection] = useState("configurarTipoEvento");

  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  




  

  const isAuthenticated = localStorage.getItem('token');
  const rol = localStorage.getItem('role');

 

  return (
    <div>
      {isAuthenticated && (
        rol === "Admin" ? <NavbarAdmin /> : (rol === "Creador" ? <NavbarOrganizador /> : null)
      )}
      <div className="mt-5">
        <div className="row">
          <div className="col-md-2 p-0">
            <div className="d-flex flex-column">
              <button
                onClick={() => handleSectionClick("configurarTipoEvento")}
                className={`button mb-2 ${activeSection === "configurarTipoEvento" ? "active" : ""
                  }`}
              >
                Configurar Tipos de Evento
              </button>
              <button
                onClick={() => handleSectionClick("configurarRequisitoEvento")}
                className={`button mb-2 ${activeSection === "configurarRequisitoEvento" ? "active" : ""
                  }`}
              >
                Configurar Requisitos de Evento
              </button>              
            </div>
          </div>
          <div className="col-md-6">
            {activeSection === "configurarTipoEvento" && (
              <ConfiguracionTipoEvento/>
            )}
            {activeSection === "configurarRequisitoEvento" && (
              <ConfiguracionRequisito/>
            )}            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvento;