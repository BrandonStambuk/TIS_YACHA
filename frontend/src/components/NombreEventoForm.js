// NombreEventoForm.js

import React from "react";

const NombreEventoForm = ({
  nombre_evento,
  setNombreEvento,
  nombreEventoError,
  store,
  inputStyle,
}) => {
  return (
    <div className="card-body tarjeta">
      <form onSubmit={store} className="text-left">
        <div className="mb-3">
          <h2 htmlFor="nombreEvento" className="card-title text-center text-blue">
            Creacion de evento
          </h2>
          <label>Nombre</label>
          <input
            value={nombre_evento}
            onChange={(e) => setNombreEvento(e.target.value)}
            type="text"
            className={`form-control ${
              nombreEventoError ? "is-invalid" : ""
            }`}
            id="nombreEvento"
            name="nombreEvento"
            style={inputStyle}
          />
          {nombreEventoError && (
            <div className="invalid-feedback">{nombreEventoError}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
                Guardar
              </button>
      </form>
    </div>
  );
};

export default NombreEventoForm;