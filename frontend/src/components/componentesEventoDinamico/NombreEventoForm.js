import React, { useEffect, useState } from "react";
import '../css/Form.css';

const NombreEventoForm = ({ nombreEvento, lugarEvento, cantidadParticiapantesEvento, onNombreEventoChange, onLugarEventoChange, onCantidadParticipantesChange }) => {
  const [nombreEventoError, setNombreEventoError] = useState("");
  const [lugarEventoError, setLugarEventoError] = useState("");
  const [cantidadError, setCantidadError] = useState("");

  const validateEvento = (value) => {
    if (!/^[A-Z]/.test(value) && value.length > 0) {
      return "El primer carácter debe ser una letra mayúscula.";
    } else if (!/^[A-Za-z\s]*$/.test(value)) {
      return "Solo están permitidas letras y espacios.";
    } else if (value.length > 50) {
      return "No se permiten más de 50 caracteres.";
    }
    return "";
  };

  const validateLugar = (value) => {
    if (!/^[A-Z]/.test(value) && value.length > 0) {
      return "El primer carácter debe ser una letra mayúscula.";
    } else if (!/^[A-Za-z0-9\s\-]*$/.test(value)) {
      return "Solo están permitidas letras, numeros, espacios y guiones.";
    } else if (value.length > 50) {
      return "No se permiten más de 50 caracteres.";
    }
    return "";
  };

  const handleNombreEventoChange = (event) => {
    let error = validateEvento(event.target.value);
    setNombreEventoError(error);
    if (!error) {
      onNombreEventoChange(event.target.value);
    }
  };

  const handleLugarEventoChange = (event) => {
    let error = validateLugar(event.target.value);
    setLugarEventoError(error);
    if (!error) {
      onLugarEventoChange(event.target.value);
    }
  }

  const handleCantidadParticipanetesEventoChange = (event) => {
    if (event.target.value < 0) {
      setCantidadError("No se permiten números negativos.");
    } else if (event.target.value > 3) {
      setCantidadError("No se permiten números mayores a tres");
    } else {
      setCantidadError("");
      onCantidadParticipantesChange(event.target.value);
    }
  }
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNombreEventoError("");
      setLugarEventoError("");
      setCantidadError("");
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [nombreEventoError, lugarEventoError, cantidadError]);

  return (
    <div className="card-body tarjeta">
      <div className="mb-3">
        <label className="form-label">Nombre Evento</label>
        <input
          value={nombreEvento}
          onChange={handleNombreEventoChange}
          type="text"
          className={`form-control ${nombreEventoError ? "is-invalid" : ""}`}
          id="nombreEvento"
          name="nombreEvento"
        />
        {nombreEventoError && (
          <div className="invalid-feedback">{nombreEventoError}</div>
        )}

        <label className="form-label">Lugar Evento</label>
        <input
          value={lugarEvento}
          onChange={handleLugarEventoChange}
          type="text"
          className={`form-control ${lugarEventoError ? "is-invalid" : ""}`}
          id="lugarEvento"
          name="lugarEvento"
        />
        {lugarEventoError && (
          <div className="invalid-feedback">{lugarEventoError}</div>
        )}

        <label className="form-label">Cantidad Participantes</label>
        <input
          value={cantidadParticiapantesEvento}
          onChange={handleCantidadParticipanetesEventoChange}
          type="number"
          className={`form-control ${cantidadError ? "is-invalid" : ""}`}
          id="cantidadError"
          name="cantidadError"
        />
        {cantidadError && (
          <div className="invalid-feedback">{cantidadError}</div>
        )}
      </div>
    </div>
  );
};

export default NombreEventoForm;
