import React, { useState } from "react";

const FechasHorasForm = ({
  onFechaInicioInscripcion,
  onFechaFinInscripcion,
  onFechaInicioEtapa,
  onFechaFinEtapa,
  onHoraInicio,
  onHoraFin
}) => {
  const [fecha_inicio_inscripcion, setFechaInicioInscripcion] = useState("");
  const [fecha_fin_inscripcion, setFechaFinInscripcion] = useState("");
  const [fecha_inicio_etapa, setFechaInicioEtapa] = useState("");
  const [fecha_fin_etapa, setFechaFinEtapa] = useState("");
  const [hora_inicio,setHoraInicio] = useState("");
  const [hora_fin,setHoraFin] =useState("");
  const [fechaInicioError,set1]=useState("");
  const [fechaFinError,set2]=useState("");
  const [fechaInicioEventError,set3]=useState("");
  const [fechaFinEventError,set4]=useState("");
  const [horaEventoError,set5]=useState("");


const handleFechaInicioInscripcionChange = (event) => {
  onFechaInicioInscripcion(event.target.value);
  setFechaInicioInscripcion(event.target.value);
};

const handleFechaFinInscripcionChange = (event) =>{
  onFechaFinInscripcion(event.target.value);
  setFechaFinInscripcion(event.target.value);
};

const handleFechaInicioEtapaChange = (event) =>{
  onFechaInicioEtapa(event.target.value);
  setFechaInicioEtapa(event.target.value);
};

const handleFechaFinEtapaChange = (event) =>{
  onFechaFinEtapa(event.target.value);
  setFechaFinEtapa(event.target.value);
};

const handleHoraInicioChange = (event) =>{
  onHoraInicio(event.target.value);
  setHoraInicio(event.target.value);
};

const handleHoraFinChange = (event) =>{
  onHoraFin(event.target.value);
  setHoraFin(event.target.value);
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
              value={fecha_inicio_etapa}
              onChange={handleFechaInicioEtapaChange}
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
              value={fecha_fin_etapa}
              onChange={handleFechaFinEtapaChange}
            />
            {fechaFinEventError && (
              <div className="invalid-feedback">{fechaFinEventError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="horas" className="form-label">
              Hora inicio
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
              value={hora_inicio}
              onChange={handleHoraInicioChange}
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
            <label htmlFor="horas" className="form-label">
              Horas fin
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
              value={hora_fin}
              onChange={handleHoraFinChange}
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
        </div>
    </div>
  );
};

export default FechasHorasForm;