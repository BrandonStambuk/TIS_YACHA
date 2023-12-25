import React, { useEffect, useState } from "react";
import '../css/Form.css';

const NombreEventoForm = ({ nombreEvento, lugarEvento, cantidadParticiapantesEvento, onNombreEventoChange, onLugarEventoChange, onCantidadParticipantesChange
,onGuardarEvento, contador,onContadorChange }) => {
  const [nombreEventoError, setNombreEventoError] = useState("");
  const [lugarEventoError, setLugarEventoError] = useState("");
  const [cantidadError, setCantidadError] = useState("");
  const [puedeGuardar, setPuedeGuardar] = useState(false);


  const validateEvento = (value) => {
    if (!/^[A-Z]/.test(value) && value.length > 0) {
      return "El primer carácter debe ser una letra mayúscula.";
    } else if (!/^[A-Za-z0-9\s.,!?¡¿]*$/.test(value)) {
      return "No se permiten carácteres especiales";
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
    const inputValue = event.target.value;
    let error = validateEvento(inputValue);
    setNombreEventoError(error);
    setPuedeGuardar(!error && inputValue.trim() !== "" && !lugarEventoError && !cantidadError);
    if (!error) {
      onNombreEventoChange(inputValue);
    }
  };
  
  const handleLugarEventoChange = (event) => {
    const inputValue = event.target.value;
    let error = validateLugar(inputValue);
    setLugarEventoError(error);
    setPuedeGuardar(!error && inputValue.trim() !== "" && !nombreEventoError && !cantidadError);
    if (!error) {
      onLugarEventoChange(inputValue);
    }
  };


  const handleCantidadParticipanetesEventoChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value < 1) {
      setCantidadError("El minimo de competidores es de 1.");
      setPuedeGuardar(false);
      onContadorChange(0);
    } else if (value > 3) {
      setCantidadError("El maximo de competidores es de 3.");
      setPuedeGuardar(false);
      onContadorChange(0);
    } else {
      setCantidadError("");
      onCantidadParticipantesChange(event.target.value);
    }
    setPuedeGuardar(!nombreEventoError && !lugarEventoError && !cantidadError && nombreEvento.trim() !== "" && lugarEvento.trim() !== "" &&  value > 0 );

  }
  
useEffect(() => {
  // Verificar si ya hay datos
  const tieneDatos = nombreEvento.trim() !== "" || lugarEvento.trim() !== "" || cantidadParticiapantesEvento !== 0;

  if (!tieneDatos || nombreEventoError || lugarEventoError || cantidadError) {
    setPuedeGuardar(false);
    console.log("No se puede guardar (al menos un campo está vacío o tiene errores)");
    onContadorChange(0);
  } else {
    setPuedeGuardar(true);
    console.log("Se puede guardar");
    onContadorChange(contador + 1);
    console.log("contador tiene el valor");
    console.log(contador);
  }

  onGuardarEvento(puedeGuardar);

  // Verificar errores específicos y mostrar en consola
  if (nombreEventoError) {
    console.log("Error en Nombre Evento:", nombreEventoError);
  }
  if (lugarEventoError) {
    console.log("Error en Lugar Evento:", lugarEventoError);
  }
  if (cantidadError) {
    console.log("Error en Cantidad Participantes:", cantidadError);
  }

  const timeoutId = setTimeout(() => {
    setNombreEventoError("");
    setLugarEventoError("");
    setCantidadError("");
  }, 5000);

  return () => clearTimeout(timeoutId);
}, [nombreEvento, lugarEvento, cantidadParticiapantesEvento, nombreEventoError, lugarEventoError, cantidadError, puedeGuardar]);
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
