import React, { useState } from "react";

const ContenidoForm = ({
  onContenidoFechasChange,
  persistenciaContenido,
  onContenidoChange,
}) => {
  const [contenido, setDescripcion] = useState(persistenciaContenido || [{}]);
  const inputStyle = {
    width: "170px",
    height: "30px",
    fontSize: "14px",
  };
  const handleContenidoChange = (index, field, value) => { 
    const nuevoContenido = [...contenido];
    nuevoContenido[index][field] = value;
    setDescripcion(nuevoContenido);
  };
  return (
    <div>
      {onContenidoFechasChange.map((fechaHora, index) => (
        <div key={index}>
          <h2>Etapa {index + 1}</h2>
          <div className="mb-3">
            <label htmlFor={`fechaInicioEtapa${index}`} className="form-label">
              Fecha de Inicio Etapa: {fechaHora.fecha_inicio_etapa}
            </label>
            <textarea
              className="form-control-descArea textarea-estilo"

              id="descripcion"
              name="descripcion"
              value={contenido[index].contenido_etapa}
              onChange={(e) =>
                handleContenidoChange(index, "contenido_etapa", e.target.value)
              }
              rows="4"
              style={{
                width: "100%",
                height: "200px",
                resize: "none",
              }}
            ></textarea>
          </div>
        </div>

      ))}
    </div>

  );
};
export default ContenidoForm;