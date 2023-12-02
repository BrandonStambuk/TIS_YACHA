import React from "react";
import { useState } from "react";
import '../css/Form.css';

const NombreEventoForm = ({ onNombreEventoChange }) => {
    const [nombreEvento, setNombreEvento] = useState("");
    const [nombreEventoError, setNombreEventoError] = useState("");

    const handleNombreEventoChange = (event) => {
        setNombreEvento(event.target.value);
        onNombreEventoChange(event.target.value);
    };

    return (
        <div className="card-body tarjeta">
            <div className="mb-3">
                <h2 htmlFor="nombreEvento" className="card-title text-center">
                    Creación de evento
                </h2>
                <label style={{ marginLeft: '10px'}}>Nombre del evento:</label>
                <input
                    value={nombreEvento}
                    onChange={handleNombreEventoChange}
                    placeholder="Ingrese nombre"
                    type="text"
                    className={`form-control ${
                        nombreEventoError ? "is-invalid" : ""
                        }`}
                    id="nombreEvento"
                    name="nombreEvento"
                    style={{ width: '50%', marginLeft: '10px' }}  // Ajusta el ancho y el margen izquierdo
                />
                {nombreEventoError && (
                    <div className="invalid-feedback">{nombreEventoError}</div>
                )}
            </div>
        </div>
    );
};

export default NombreEventoForm;
