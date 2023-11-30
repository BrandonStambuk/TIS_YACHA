import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { URL_API } from "../const";


const endpoint = `${URL_API}/crearevento`;

const CreateEvento = () => {
  const [activeSection, setActiveSection] = useState("nombreEvento");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
const store = async (e) => {
  e.preventDefault();
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

            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={store}>
              {activeSection === "nombreEvento" && (
                <h1>Nombre Evento</h1>

                /*<NombreEventoForm/>*/
              )}
              {activeSection === "tipoEvento" && (
                <h1>Tipo Evento</h1>
                /*<TipoEventoForm/>*/
              )}
              {activeSection === "fechasHoras" && (
                <h1>Fechas y Horas</h1>
                /*<FechasHorasForm/>*/
              )}
              {activeSection === "descripcion" && (
                <h1>Descripción</h1>
                /*<DescripcionForm/>*/
              )}
              <button type='submit' className='btn btn-success'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvento;
