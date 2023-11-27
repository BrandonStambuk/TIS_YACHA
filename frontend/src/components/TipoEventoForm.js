import React from "react";

const TipoEventoForm = ({ tipo_evento, handleTipoEventoChange }) => {
  return (
    <div className="card-body tarjeta">
      <form className="text-left">
        <div className="mb-3">
          <h2 className="card-title text-center text-blue">Tipo de Evento</h2>
          <div>
            <label>
              <input
                type="radio"
                value="Reclutamiento"
                onChange={handleTipoEventoChange}
                checked={tipo_evento === "Reclutamiento"}
              />
              Reclutamiento
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Taller de reclutamiento"
                onChange={handleTipoEventoChange}
                checked={tipo_evento === "Taller de reclutamiento"}
              />
              Taller de reclutamiento
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Competencia de entrenamiento"
                onChange={handleTipoEventoChange}
                checked={tipo_evento === "Competencia de entrenamiento"}
              />
              Competencia de entrenamiento
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Competencia interna"
                onChange={handleTipoEventoChange}
                checked={tipo_evento === "Competencia interna"}
              />
              Competencia interna
            </label>
          </div>
        </div>
        {/* Otros campos relacionados con el tipo de evento */}
      </form>
    </div>
  );
};

export default TipoEventoForm;