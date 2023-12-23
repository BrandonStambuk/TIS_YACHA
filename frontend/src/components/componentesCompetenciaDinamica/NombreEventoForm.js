import React, { useEffect, useState } from "react";
import '../css/Form.css';

const NombreEventoForm = ({ nombreEvento, lugarEvento, cantidadParticipantesEvento, onNombreEventoChange, onLugarEventoChange, onCantidadParticipantesChange }) => {
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
    const value = parseInt(event.target.value, 10);
    if (value < 1) {
      setCantidadError("El minimo de competidores es de 1.");
    } else if (value > 3) {
      setCantidadError("El maximo de competidores es de 3.");
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
        <label className="form-label">Nombre Competencia</label>
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

        <label className="form-label">Lugar Competencia</label>
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
          value={cantidadParticipantesEvento}
          onChange={handleCantidadParticipanetesEventoChange}
          type="number"
          className={`form-control ${cantidadError ? "is-invalid" : ""}`}
          id="cantidadError"
          name="cantidadError"
          placeholder="1-3"
        />
        {cantidadError && (
          <div className="invalid-feedback">{cantidadError}</div>
        )}
      </div>
    </div>
  );
};

export default NombreEventoForm;
