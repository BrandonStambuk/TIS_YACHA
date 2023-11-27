import React from "react";

const FechasHorasForm = ({
  fechaInicioError,
  fechaFinError,
  fechaInicioEventError,
  fechaFinEventError,
  fecha_inicio_inscripcion,
  fecha_fin_inscripcion,
  fecha_inicio_evento,
  fecha_fin_evento,
  hora,
  horaEventoError,
  publico,
  handleFechaInicioChange,
  handleFechaFinChange,
  handleFechaInicioEventChange,
  handleFechaFinEventChange,
  handleHorasChange,
  setPublico,
  store,
}) => {
  const inputStyle = {
    width: "170px",
    height: "30px",
    fontSize: "14px",
  };

  return (
    <div className="card-body tarjeta">
      <form onSubmit={store} className="text-left">
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
              onChange={handleFechaInicioChange}
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
              onChange={handleFechaFinChange}
            />
            {fechaFinError && (
              <div className="invalid-feedback">{fechaFinError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="fechaInicio" className="form-label">
              Fecha de Inicio Evento
            </label>
            <input
              type="date"
              className={`form-control ${
                fechaInicioEventError ? "is-invalid" : ""
              }`}
              id="fechaInicio"
              name="fechaInicio"
              style={inputStyle}
              value={fecha_inicio_evento}
              onChange={handleFechaInicioEventChange}
            />
            {fechaInicioEventError && (
              <div className="invalid-feedback">
                {fechaInicioEventError}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="fechaFin" className="form-label">
              Fecha de Fin Evento
            </label>
            <input
              type="date"
              className={`form-control ${
                fechaFinEventError ? "is-invalid" : ""
              }`}
              id="fechaFin"
              name="fechaFin"
              style={inputStyle}
              value={fecha_fin_evento}
              onChange={handleFechaFinEventChange}
            />
            {fechaFinEventError && (
              <div className="invalid-feedback">{fechaFinEventError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="horas" className="form-label">
              Horas
            </label>
            <input
              onKeyDown={(event) => {
                if (
                  !(
                    event.key === "Backspace" ||
                    event.key === "ArrowLeft" ||
                    event.key === "ArrowRight" ||
                    event.key === "Tab" ||
                    /[0-9]/.test(event.key)
                  )
                ) {
                  event.preventDefault();
                }
              }}
              value={hora}
              onChange={handleHorasChange}
              type="number"
              className={`form-control ${horaEventoError ? "is-invalid" : ""}`}
              id="horaEvento"
              name="horaEvento"
              style={inputStyle}
            />
            {horaEventoError && (
              <div className="invalid-feedback">{horaEventoError}</div>
            )}
          </div>

          <div className="mb-3">
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Publicar evento
            </label>{" "}
          </div>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={publico}
              onChange={(e) => setPublico(e.target.checked)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FechasHorasForm;