import React, { useState } from "react";

const ContenidoForm = ({
    onContenidoFechasChange,

  }) => {

    const inputStyle = {
        width: "170px",
        height: "30px",
        fontSize: "14px",
      };
const handleFechasHorasChange = (index, field, value) => {};    
    return (
        <div>
{onContenidoFechasChange.map((fechaHora, index) => (
    <div key={index}>
      <h2>Etapa {index + 1}</h2>
        <div className="mb-3">
      <label htmlFor={`fechaInicioEtapa${index}`} className="form-label">
        Fecha de Inicio Etapa
      </label>
      <input
        type="date"
        className="form-control"
        id={`fechaInicioEtapa${index}`}
        name={`fechaInicioEtapa${index}`}
        style={inputStyle}
        value={fechaHora.fecha_inicio_etapa}
        onChange={(e) =>
          handleFechasHorasChange(index, "fecha_inicio_etapa", e.target.value)
        }
      />
    </div>
    </div>
    
      ))}
    </div>
          
);
};
export default ContenidoForm;