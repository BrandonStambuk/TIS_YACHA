import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { URL_API } from "../const";

const endpoint = URL_API;

const TipoEventoForm = ({ onTipoEvento, onValorSeleccionado }) => {
  const [opciones, setOpciones] = useState([]);
  const [valorSeleccionado, setValorSeleccionado] = useState("");


  useEffect(() => {
    axios
      .get(`${endpoint}/tipoEventosDinamicos`)
      .then((response) => {
        setOpciones(response.data);
        setValorSeleccionado(onValorSeleccionado);
      })
      .catch((error) => {
        console.error("Error al obtener las opciones:", error);
      });
  }, []);


  const handleChangeTipoEvento = (event) => {
    onTipoEvento(event.target.value);
    setValorSeleccionado(event.target.value);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card border-0">
            <div className="card-body tarjeta">
              <div className="row">
              </div>
              <div className="row text-black">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="selector">Selecciona una opción:</label>
                    <select
                      id="selector"
                      value={valorSeleccionado}
                      onChange={handleChangeTipoEvento}
                    >
                      {opciones.map((opcion) => (
                        <option key={opcion.id} value={opcion.id}>
                          {opcion.nombre_tipo_evento_dinamico}
                        </option>
                      ))}
                    </select>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipoEventoForm;
