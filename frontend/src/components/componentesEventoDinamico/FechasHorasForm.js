import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
const FechasHorasForm = ({
  onFechaInicioInscripcion,
  onFechaFinInscripcion,
  onFechasHorasChange,
  FechaInicioIn,
  FechaFinIn,
  FechasHorasNuevo,
  onGuardarEvento,
  contador,
  onBooleanChange,
}) => {
  const [fecha_inicio_inscripcion, setFechaInicioInscripcion] = useState(
    FechaInicioIn || ""
  );
  const [fecha_fin_inscripcion, setFechaFinInscripcion] = useState(
    FechaFinIn || ""
  );
  const [fechaInicioError, setFechaInicioError] = useState("");
  const [fechaFinError, setFechaFinError] = useState("");
  const [fechaInicioEventError, setFechaInicioEventError] = useState("");
  const [fechaFinEventError, setFechaFinEventError] = useState("");
  const [horaEventoError, setHoraEventoError] = useState("");
  const [fechasHorasLocal, setFechasHorasLocal] = useState(
    FechasHorasNuevo || [{}]
  );
  const [errorGeneral, setErrorGeneral] = useState("");

  const verificarCampos = () => {
    let camposVacios = false;
    // Verificar campos vacíos en fechas y horas
    fechasHorasLocal.forEach((fechaHora) => {
      if (
        !fechaHora.fecha_inicio_etapa ||
        !fechaHora.fecha_fin_etapa ||
        !fechaHora.hora_inicio ||
        !fechaHora.hora_fin ||
        !fechaHora.contenido_etapa
      ) {
        camposVacios = true;
      }
    });

    // Verificar errores específicos y mostrar en consola
    if (fechasHorasLocal.length > 0) {
      if (
        fechaInicioError ||
        fechaFinError ||
        fechaInicioEventError ||
        fechaFinEventError ||
        horaEventoError
      ) {
        camposVacios = true;
      }
    }

    // Actualizar estado en el componente padre
    onGuardarEvento(!camposVacios);

    if (camposVacios) {
      setErrorGeneral("Por favor, complete todos los campos de la Etapa.");
      onBooleanChange(false);
    } else {
      setErrorGeneral("");
      onBooleanChange(true);
      // Limpiar el mensaje de error si no hay campos vacíos
    }
  };

  useEffect(() => {
    onFechasHorasChange(fechasHorasLocal || [{}]);
  }, [fechasHorasLocal, onFechasHorasChange]);

  const agregarFechasHoras = () => {
    setFechasHorasLocal([...fechasHorasLocal, {}]);
  };

  const eliminarUltimaFechaHora = () => {
    if (fechasHorasLocal.length > 0) {
      const nuevasFechasHoras = [...fechasHorasLocal];
      nuevasFechasHoras.pop(); // Elimina el último elemento del array
      setFechasHorasLocal(nuevasFechasHoras);
      onFechasHorasChange(nuevasFechasHoras);
    }
  };

  const handleFechasHorasChange = (index, field, value) => {
    const nuevasFechasHoras = [...fechasHorasLocal];
    nuevasFechasHoras[index][field] = value;
    console.log(nuevasFechasHoras);
    setFechasHorasLocal(nuevasFechasHoras);
  };

  const handleFechaInicioInscripcionChange = (event, index) => {
    const selectedDate = event.target.value;
    setFechaInicioInscripcion(selectedDate);
    setFechaInicioError(
      validateFechaInicio(selectedDate, fecha_fin_inscripcion)
    );
    onFechaInicioInscripcion(event.target.value);
  };
  const generarExcel = () => {
    const data = fechasHorasLocal.map((fechaHora, index) => ({
      "Fecha Inicio Etapa": fechaHora.fecha_inicio_etapa,
      "Fecha Fin Etapa": fechaHora.fecha_fin_etapa,
      "Hora Inicio Etapa": fechaHora.hora_inicio,
      "Hora Fin Etapa": fechaHora.hora_fin,
      "Contenido Etapa": fechaHora.contenido_etapa,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fechas y Horas");

    XLSX.writeFile(wb, "Cronograma.xlsx");
  };

  const handleFechaFinInscripcionChange = (event) => {
    const selectedDate = event.target.value;
    setFechaFinInscripcion(selectedDate);
    setFechaFinError(validateFechaFin(selectedDate, fecha_inicio_inscripcion));
    onFechaFinInscripcion(event.target.value);
  };

  const validateFechaInicio = (fechaInicio, fechaFin) => {
    const today = new Date().toISOString().split("T")[0];

    if (fechaInicio === today) {
      setFechaInicioEventError(
        "La fecha de inicio de inscripción no puede ser el día de hoy."
      );
      return "La fecha de inicio de inscripción no puede ser el día de hoy.";
    } else {
      setFechaInicioEventError("");
    }

    if (fechaFin && fechaInicio > fechaFin) {
      setFechaInicioEventError(
        "La fecha de inicio de inscripción no puede ser después de la fecha de fin de inscripción."
      );
      return "La fecha de inicio de inscripción no puede ser después de la fecha de fin de inscripción.";
    } else {
      setFechaInicioEventError("");
    }

    return "";
  };

  const validateFechaFin = (fechaFin, fechaInicio) => {
    if (fechaInicio && fechaFin < fechaInicio) {
      setFechaFinEventError(
        "La fecha de fin de inscripción no puede ser antes de la fecha de inicio de inscripción."
      );
      return "La fecha de fin de inscripción no puede ser antes de la fecha de inicio de inscripción.";
    } else {
      setFechaFinEventError("");
    }

    return "";
  };
  const inputStyle = {
    width: "170px",
    height: "30px",
    fontSize: "14px",
    marginLeft: "150px",
    marginTop: "10px",
  };

  const buttonStyle = {
    marginLeft: "270px", // Ajusta el valor del margen según tus necesidades
  };

  const marginRightStyle = {
    marginLeft: "150px",
    marginTop: "10px", // Ajusta el valor del margen izquierdo según tus necesidades
  };

  useEffect(() => {
    verificarCampos();
  }, [
    fechaInicioError,
    fechaFinError,
    fechaInicioEventError,
    fechaFinEventError,
    horaEventoError,
    fechasHorasLocal,
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFechaInicioError("");
      setFechaFinError("");
      setFechaInicioEventError("");
      setFechaFinEventError("");
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [
    fechaInicioError,
    fechaFinError,
    fechaInicioEventError,
    fechaFinEventError,
  ]);
  return (
    <div className="card-body tarjeta ml-3">
      <div className="mb-3">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label
              htmlFor="fechaInicio"
              className="form-label"
              style={marginRightStyle}
            >
              Fecha de Inicio inscripción
            </label>
            <input
              type="date"
              className={`form-control ${fechaInicioError ? "is-invalid" : ""}`}
              id="fechaInicio"
              name="fechaInicio"
              style={{ ...inputStyle, ...marginRightStyle }}
              value={fecha_inicio_inscripcion}
              onChange={handleFechaInicioInscripcionChange}
              min={new Date().toISOString().split("T")[0]}
            />
            {fechaInicioError && (
              <div className="invalid-feedback">{fechaInicioError}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label
              htmlFor="fechaFin"
              className="form-label"
              style={marginRightStyle}
            >
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
              min={new Date().toISOString().split("T")[0]}
            />
            {fechaFinError && (
              <div className="invalid-feedback">{fechaFinError}</div>
            )}
          </div>
          <hr style={{ width: "100%" }} />
          {fechasHorasLocal.map((fechaHora, index) => (
            <div key={index}>
              <h2>Etapa {index + 1}</h2>
              {}

              {errorGeneral && (
                <div className="alert alert-success" style={{maxWidth:'35%'}} role="alert">
                  {errorGeneral}
                </div>
              )}

              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor={`fechaInicioEtapa${index}`}
                      className="form-label"
                      style={marginRightStyle}
                    >
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
                        handleFechasHorasChange(
                          index,
                          "fecha_inicio_etapa",
                          e.target.value
                        )
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {fechaInicioEventError && (
                      <div className="invalid-feedback">
                        {fechaInicioEventError}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor={`fechaFinEtapa${index}`}
                      className="form-label"
                      style={marginRightStyle}
                    >
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
                        handleFechasHorasChange(
                          index,
                          "fecha_fin_etapa",
                          e.target.value
                        )
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {fechaFinEventError && (
                      <div className="invalid-feedback">
                        {fechaFinEventError}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor={`horaInicio${index}`}
                      className="form-label"
                      style={marginRightStyle}
                    >
                      Hora inicio Etapa
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id={`horaInicio${index}`}
                      name={`horaInicio${index}`}
                      style={inputStyle}
                      value={fechaHora.hora_inicio}
                      onChange={(e) =>
                        handleFechasHorasChange(
                          index,
                          "hora_inicio",
                          e.target.value
                        )
                      }
                    />
                    {horaEventoError && (
                      <div className="invalid-feedback">{horaEventoError}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor={`horaFin${index}`}
                      className="form-label"
                      style={marginRightStyle}
                    >
                      Hora Fin Etapa
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id={`horaFin${index}`}
                      name={`horaFin${index}`}
                      style={inputStyle}
                      value={fechaHora.hora_fin}
                      onChange={(e) =>
                        handleFechasHorasChange(
                          index,
                          "hora_fin",
                          e.target.value
                        )
                      }
                    />
                    {horaEventoError && (
                      <div className="invalid-feedback">{horaEventoError}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor={`contenido${index}`} className="form-label">
                  Contenido Etapa
                </label>
                <textarea
                  className="form-control-descArea textarea-estilo"
                  id={`descripcion`}
                  name={`descripcion`}
                  value={fechaHora.contenido_etapa}
                  onChange={(e) =>
                    handleFechasHorasChange(
                      index,
                      "contenido_etapa",
                      e.target.value
                    )
                  }
                  rows="4"
                  style={{
                    width: "100%",
                    height: "200px",
                    resize: "none",
                  }}
                ></textarea>
                {horaEventoError && (
                  <div className="invalid-feedback">{horaEventoError}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={agregarFechasHoras}
          className="btn btn-primary"
          style={buttonStyle}
        >
          Agregar Fechas y Horas
        </button>

        <button
          onClick={eliminarUltimaFechaHora}
          className="btn btn-danger"
          style={{ marginLeft: "10px" }}
        >
          Eliminar Última Etapa
        </button>

        <button
          onClick={generarExcel}
          className="btn btn-success"
          style={{ marginLeft: "10px" }}
        >
          Generar Excel
        </button>
      </div>
    </div>
  );
};

export default FechasHorasForm;
