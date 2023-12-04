import React from "react";
import { useState } from "react";
import '../css/Form.css';

const NombreEventoForm = ({nombreEvento,lugarEvento,cantidadParticiapantesEvento, onNombreEventoChange, onLugarEventoChange, onCantidadParticipantesChange}) => {
    const [nombreEventoError, setNombreEventoError] = useState("");

    const handleNombreEventoChange = (event) => {
        onNombreEventoChange(event.target.value);
    };
    const handleLugarEventoChange = (event) => {
        onLugarEventoChange(event.target.value);
    }
    const handleCantidadParticipanetesEventoChange = (event) => {
        onCantidadParticipantesChange(event.target.value);
    }
    const inputStyle = {
      width: '50%', // Puedes ajustar el ancho según tus necesidades
      marginLeft: '20px', // Espacio entre los inputs
      
    };


    const labelStyle = {
      marginLeft: '20px', // Margen a la izquierda para los labels
    };

  return (
    <div className="card-body tarjeta">
        <div className="mb-3">
          <h2 htmlFor="nombreEvento" className="card-title text-center text-blue">
            Creacion de evento
          </h2>
          <label style={labelStyle}>Nombre Evento</label>
          <input
            value={nombreEvento}
            onChange={handleNombreEventoChange}
            type="text"
            className={`form-control ${
              nombreEventoError ? "is-invalid" : ""
            }`}
            id="nombreEvento"
            name="nombreEvento"
            style={inputStyle}
          />
          {nombreEventoError && (
            <div className="invalid-feedback">{nombreEventoError}</div>
          )}
          <label style={labelStyle}>Lugar Evento</label>
          <input
            value={lugarEvento}
            onChange={handleLugarEventoChange}
            type="text"
            className={`form-control ${
              nombreEventoError ? "is-invalid" : ""
            }`}
            id="nombreEvento"
            name="nombreEvento"
            style={inputStyle}
          />
          <label style={labelStyle}>Cantidad Participantes</label>
          <input
            value={cantidadParticiapantesEvento}
            onChange={handleCantidadParticipanetesEventoChange}
            type="number"
            className={`form-control ${
              nombreEventoError ? "is-invalid" : ""
            }`}
            id="nombreEvento"
            name="nombreEvento"
            style={inputStyle}
          />
        </div>
        </div>
    );
};

export default NombreEventoForm;
