import React from "react";

import { useState } from "react";

const NombreEventoForm = ({onNombreEventoChange}) => {
    const [nombreEvento, setNombreEvento] = useState("");
    const [nombreEventoError, setNombreEventoError] = useState("");

    const handleNombreEventoChange = (event) => {
        setNombreEvento(event.target.value);
        onNombreEventoChange(event.target.value);
    };

  return (
    <div className="card-body tarjeta">
        <div className="mb-3">
          <h2 htmlFor="nombreEvento" className="card-title text-center text-blue">
            Creacion de evento
          </h2>
          <label>Nombre</label>
          <input
            value={nombreEvento}
            onChange={handleNombreEventoChange}
            type="text"
            className={`form-control ${
              nombreEventoError ? "is-invalid" : ""
            }`}
            id="nombreEvento"
            name="nombreEvento"
          />
          {nombreEventoError && (
            <div className="invalid-feedback">{nombreEventoError}</div>
          )}
        </div>
    </div>
  );
};

export default NombreEventoForm;