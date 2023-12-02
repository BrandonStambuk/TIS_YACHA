import React from "react";

import { useState } from "react";

const NombreEventoForm = ({nombreEvento,lugarEvento,cantidadParticiapantesEvento, onNombreEventoChange, onLugarEventoChange, onCantidadParticipantesChange}) => {
    const [nombreEventoError, setNombreEventoError] = useState("");

    const handleNombreEventoChange = (event) => {
        onNombreEventoChange(event.target.value);
    };
    const handleLugarEventoChange = (event) => {
        onLugarEventoChange(event.target.value);
    }
    const handleCantidadParticipanetesEventoChange = (event) => {
        onCantidadParticipantesChange(event.target.value);
    }

  return (
    <div className="card-body tarjeta">
        <div className="mb-3">
          <h2 htmlFor="nombreEvento" className="card-title text-center text-blue">
            Creacion de evento
          </h2>
          <label>Nombre Evento</label>
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
          <label>Lugar Evento</label>
          <input
            value={lugarEvento}
            onChange={handleLugarEventoChange}
            type="text"
            className={`form-control ${
              nombreEventoError ? "is-invalid" : ""
            }`}
            id="nombreEvento"
            name="nombreEvento"
          />
          <label>Cantidad Participantes</label>
          <input
            value={cantidadParticiapantesEvento}
            onChange={handleCantidadParticipanetesEventoChange}
            type="number"
            className={`form-control ${
              nombreEventoError ? "is-invalid" : ""
            }`}
            id="nombreEvento"
            name="nombreEvento"
          />
        </div>
    </div>
  );
};

export default NombreEventoForm;