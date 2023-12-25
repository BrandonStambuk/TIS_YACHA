import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { URL_API } from "../const";

const endpoint = URL_API;

const TipoEventoForm = ({ onTipoEvento, onValorSeleccionado, onGuardarEvento,contador,onContadorChange}) => {
  const [opciones, setOpciones] = useState([]);
  const [valorSeleccionado, setValorSeleccionado] = useState("");
  const [puedeGuardar, setPuedeGuardar] = useState(onGuardarEvento);

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
  }, [onValorSeleccionado]);

  const handleChangeTipoEvento = (event) => {
    const selectedValue = event.target.value;
    onTipoEvento(selectedValue);
    setValorSeleccionado(selectedValue);
    onGuardarEvento(true);
    onContadorChange(contador + 1);

    console.log("se puede guardar tipo") // Llamar a onGuardarEvento con true cuando se selecciona un valor
  };


  useEffect(() => {

    onGuardarEvento(puedeGuardar);
  }, [puedeGuardar, onGuardarEvento]);


  return (
   
            <div className="card-body tarjeta">
              <div className="row"></div>
              <div className="row text-black">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="selector">Selecciona una opción:</label>
                    <select
                      id="selector"
                      value={valorSeleccionado}
                      onChange={handleChangeTipoEvento}
                    >
                      <option value="" disabled>
                        Elige una opción
                      </option>
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
    
  );
};

export default TipoEventoForm;
