import React, { useState } from "react";

const FechasHorasForm = ({
  onFechaInicioInscripcion,
  onFechaFinInscripcion,
  onFechasHorasChange
}) => {
  const [fecha_inicio_inscripcion, setFechaInicioInscripcion] = useState("");
  const [fecha_fin_inscripcion, setFechaFinInscripcion] = useState("");
  const [fechaInicioError, set1] = useState("");
  const [fechaFinError, set2] = useState("");
  const [fechaInicioEventError, set3] = useState("");
  const [fechaFinEventError, set4] = useState("");
  const [horaEventoError, set5] = useState("");
  const [fechasHoras, setFechasHoras] = useState([{}]);

  const agregarFechasHoras = () => {
    setFechasHoras([...fechasHoras, {}]);
  };

  const eliminarUltimaFechaHora = () => {
    if (fechasHoras.length > 0) {
      const nuevasFechasHoras = [...fechasHoras];
      nuevasFechasHoras.pop();  // Elimina el último elemento del array
      setFechasHoras(nuevasFechasHoras);
      onFechasHorasChange(nuevasFechasHoras);
    }
  };

  const handleFechasHorasChange = (index, field, value) => {
    const nuevasFechasHoras = [...fechasHoras];
    nuevasFechasHoras[index][field] = value;
    setFechasHoras(nuevasFechasHoras);
    onFechasHorasChange(nuevasFechasHoras);
  };

  const handleFechaInicioInscripcionChange = (event, index) => {
    onFechaInicioInscripcion(event.target.value);
    setFechaInicioInscripcion(event.target.value);
  };

  const handleFechaFinInscripcionChange = (event) => {
    onFechaFinInscripcion(event.target.value);
    setFechaFinInscripcion(event.target.value);
  };

  const inputStyle = {
    width: "170px",
    height: "30px",
    fontSize: "14px",
  };

  const buttonStyle = {
    marginLeft: "270px",  // Ajusta el valor del margen según tus necesidades
  };

  const marginRightStyle = {
    marginLeft: "150px",
    marginTop: "10px", // Ajusta el valor del margen izquierdo según tus necesidades
  };

  return (
    <div className="card-body tarjeta ml-3">
      <div className="mb-3">
        <h2 className="card-title text-center text-blue">Fechas y Horas</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="fechaInicio" className="form-label" style={marginRightStyle}>
              Fecha de Inicio inscripción
            </label>
            <input
              type="date"
              className={`form-control ${
                fechaInicioError ? "is-invalid" : ""
              }`}
              id="fechaInicio"
              name="fechaInicio"
              style={{ ...inputStyle, ...marginRightStyle }}
              value={fecha_inicio_inscripcion}
              onChange={handleFechaInicioInscripcionChange}
            />
            {fechaInicioError && (
              <div className="invalid-feedback">{fechaInicioError}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="fechaFin" className="form-label" style={marginRightStyle}>
              Fecha de Fin inscripcion
            </label>
            <input
              type="date"
              className={`form-control ${fechaFinError ? "is-invalid" : ""}`}
              id="fechaFin"
              name="fechaFin"
              style={{ ...inputStyle, ...marginRightStyle }}
              value={fecha_fin_inscripcion}
              onChange={handleFechaFinInscripcionChange}
            />
            {fechaFinError && (
              <div className="invalid-feedback">{fechaFinError}</div>
            )}
          </div>
          <hr style={{ width: "100%" }} />
        </div>

        <button onClick={agregarFechasHoras} className="btn btn-primary" style={buttonStyle}>
          Agregar Fechas y Horas
        </button>

        <button onClick={eliminarUltimaFechaHora} className="btn btn-danger" style={{ marginLeft: "10px" }}>
          Eliminar Última Etapa
        </button>

        {fechasHoras.map((fechaHora, index) => (
          <div key={index} className="mb-3">
            <h2>Etapa {index + 1}</h2>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor={`fechaInicioEtapa${index}`} className="form-label" style={marginRightStyle}>
                  Fecha de Inicio Etapa
                </label>
                <input
                  type="date"
                  className="form-control"
                  id={`fechaInicioEtapa${index}`}
                  name={`fechaInicioEtapa${index}`}
                  style={{ ...inputStyle, ...marginRightStyle }}
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

              <div className="col-md-6">
                <label htmlFor={`fechaFinEtapa${index}`} className="form-label" style={marginRightStyle}>
                  Fecha de Fin Etapa
                </label>
                <input
                  type="date"
                  className="form-control"
                  id={`fechaFinEtapa${index}`}
                  name={`fechaFinEtapa${index}`}
                  style={{ ...inputStyle, ...marginRightStyle }}
                  value={fechaHora.fecha_fin_etapa}
                  onChange={(e) =>
                    handleFechasHorasChange(index, "fecha_fin_etapa", e.target.value)
                  }
                />
                {fechaFinEventError && (
                  <div className="invalid-feedback">{fechaFinEventError}</div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label htmlFor={`horaInicio${index}`} className="form-label" style={marginRightStyle}>
                  Hora inicio Etapa
                </label>
                <input
                  type="time"
                  className="form-control"
                  id={`horaInicio${index}`}
                  name={`horaInicio${index}`}
                  style={{ ...inputStyle, ...marginRightStyle }}
                  value={fechaHora.hora_inicio}
                  onChange={(e) =>
                    handleFechasHorasChange(index, "hora_inicio", e.target.value)
                  }
                />
                {horaEventoError && (
                  <div className="invalid-feedback">{horaEventoError}</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor={`horaFin${index}`} className="form-label" style={marginRightStyle}>
                  Hora Fin Etapa
                </label>
                <input
                  type="time"
                  className="form-control"
                  id={`horaFin${index}`}
                  name={`horaFin${index}`}
                  style={{ ...inputStyle, ...marginRightStyle }}
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
            <hr style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FechasHorasForm;
