import React, { useState, useEffect } from "react";

const FechasHorasForm = ({
  onFechaInicioInscripcion,
  onFechaFinInscripcion,
  onFechasHorasChange,
  FechaInicioIn,
  FechaFinIn,
  FechasHorasNuevo
}) => {
  const [fecha_inicio_inscripcion, setFechaInicioInscripcion] = useState(FechaInicioIn || "");
  const [fecha_fin_inscripcion, setFechaFinInscripcion] = useState(FechaFinIn || "");
  const [fechaInicioError,set1]=useState("");
  const [fechaFinError,set2]=useState("");
  const [fechaInicioEventError,set3]=useState("");
  const [fechaFinEventError,set4]=useState("");
  const [horaEventoError,set5]=useState("");
  const [fechasHorasLocal, setFechasHorasLocal] = useState(FechasHorasNuevo || [{}]);

  useEffect(() => {
    onFechasHorasChange(fechasHorasLocal || [{}]);
  }, [fechasHorasLocal, onFechasHorasChange]);

  const agregarFechasHoras = () => {
    setFechasHorasLocal([...fechasHorasLocal, {}]);
  };

  const handleFechasHorasChange = (index, field, value) => {
    const nuevasFechasHoras = [...fechasHorasLocal];
    nuevasFechasHoras[index][field] = value;
    setFechasHorasLocal(nuevasFechasHoras);
  };

const handleFechaInicioInscripcionChange = (event, index) => {
  onFechaInicioInscripcion(event.target.value);
  setFechaInicioInscripcion(event.target.value);
};

const handleFechaFinInscripcionChange = (event) =>{
  onFechaFinInscripcion(event.target.value);
  setFechaFinInscripcion(event.target.value);
};

  const inputStyle = {
    width: "170px",
    height: "30px",
    fontSize: "14px",
  };

  return (
    <div className="card-body tarjeta">
        <div className="mb-3">
          <h2 className="card-title text-center text-blue">Fechas y Horas</h2>
          <div className="mb-3">
            <label htmlFor="fechaInicio" className="form-label">
              Fecha de Inicio inscripción
            </label>
            <input
              type="date"
              className={`form-control ${
                fechaInicioError ? "is-invalid" : ""
              }`}
              id="fechaInicio"
              name="fechaInicio"
              style={inputStyle}
              value={fecha_inicio_inscripcion}
              onChange={handleFechaInicioInscripcionChange}
            />
            {fechaInicioError && (
              <div className="invalid-feedback">{fechaInicioError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="fechaFin" className="form-label">
              Fecha de Fin inscripcion
            </label>
            <input
              type="date"
              className={`form-control ${fechaFinError ? "is-invalid" : ""}`}
              id="fechaFin"
              name="fechaFin"
              style={inputStyle}
              value={fecha_fin_inscripcion}
              onChange={handleFechaFinInscripcionChange}
            />
            {fechaFinError && (
              <div className="invalid-feedback">{fechaFinError}</div>
            )}
          </div>
          <button onClick={agregarFechasHoras}>Agregar Fechas y Horas</button>
          {fechasHorasLocal.map((fechaHora, index) => (
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
            {fechaInicioEventError && (
              <div className="invalid-feedback">
                {fechaInicioEventError}
              </div>
            )}
          </div>

          <div className="mb-3">
          <label htmlFor={`fechaFinEtapa${index}`} className="form-label">
              Fecha de Fin Etapa
            </label>
            <input
              type="date"
              className="form-control"
              id={`fechaFinEtapa${index}`}
              name={`fechaFinEtapa${index}`}
              style={inputStyle}
              value={fechaHora.fecha_fin_etapa}
              onChange={(e) =>
                handleFechasHorasChange(index, "fecha_fin_etapa", e.target.value)
              }
            />
            {fechaFinEventError && (
              <div className="invalid-feedback">{fechaFinEventError}</div>
            )}
          </div>

          <div className="mb-3">
          <label htmlFor={`horaInicio${index}`} className="form-label">
              hora inicio Etapa
            </label>
            <input
              type="time"
              className="form-control"
              id={`horaInicio${index}`}
              name={`horaInicio${index}`}
              style={inputStyle}
              value={fechaHora.hora_inicio}
              onChange={(e) =>
                handleFechasHorasChange(index, "hora_inicio", e.target.value)
              }
            />
            {horaEventoError && (
              <div className="invalid-feedback">{horaEventoError}</div>
            )}
          </div>
          <div className="mb-3">
          <label htmlFor={`horaFin${index}`} className="form-label">
              hora Fin Etapa
            </label>
            <input
              type="time"
              className="form-control"
              id={`horaFin${index}`}
              name={`horaFin${index}`}
              style={inputStyle}
              value={fechaHora.hora_fin}
              onChange={(e) =>
                handleFechasHorasChange(index, "hora_fin", e.target.value)
              }
            />
            {horaEventoError && (
              <div className="invalid-feedback">{horaEventoError}</div>
            )}
          </div>
          </div>
          ))}
          
        </div>
    </div>
  );
};

export default FechasHorasForm;