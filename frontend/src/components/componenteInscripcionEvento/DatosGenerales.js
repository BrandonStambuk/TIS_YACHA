import React, { useEffect } from "react";
import { useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";

const endpoint = URL_API;

const DatosGenerales = ({ onNombreEquipo, onNombres, onApellidos, nombreEquipoIn, nombresIn, apellidosIn, cantidadParticipantesIn,
    onGuardarEstado, }) => {
    const [nombre_Equipo, setNombreEquipo] = useState(nombreEquipoIn || "");
    const [tipoRequisito, setTipoRequisito] = useState("");
    const [nombres, setNombres] = useState(nombresIn || []);
    const [apellidos, setApellidos] = useState(apellidosIn || []);
    const [nombreEquipoError, setNombreEquipoError] = useState(false);
    const [nombresError, setNombresError] = useState(new Array(nombres.length).fill(false));
    const [apellidosError, setApellidosError] = useState(new Array(apellidos.length).fill(false));

    useEffect(() => {
        const arrayNombres = Array.from({ length: cantidadParticipantesIn });
        setNombres(arrayNombres);
        setNombresError(new Array(arrayNombres.length).fill(false));
        setApellidosError(new Array(arrayNombres.length).fill(false));
    }, [cantidadParticipantesIn]);
    const [puedeGuardar, setPuedeGuardar] = useState(onGuardarEstado); // 
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    //const isAlpha = (str) => /^[a-zA-Z]+$/.test(str);
    const isAlphaWithSpaces = (str) => /^[a-zA-Z\s]+$/.test(str);

    const handleTipoRequisitoChange = (e) => {
        setTipoRequisito(e.target.value);
    };

    const handleNombreEquipoChange = (value) => {
        const capitalizedValue = capitalizeFirstLetter(value);
        setNombreEquipo(capitalizedValue);
        onNombreEquipo(capitalizedValue);
        setNombreEquipoError(value.length < 4 || !isAlphaWithSpaces (value));
    };

    const handleNombreChange = (index, value) => {
        const capitalizedValue = capitalizeFirstLetter(value);
        const nuevosNombres = [...nombres];
        nuevosNombres[index] = capitalizedValue;
        setNombres(nuevosNombres);
        onNombres(nuevosNombres);
        const error = capitalizedValue.trim().length < 5 || !isAlphaWithSpaces(value);
        setNombresError((errors) => {
            const newErrors = [...errors];
            newErrors[index] = error;
            return newErrors;
        });
        setPuedeGuardar(!error);
        console.log("NO PUEDE GUARDAR");
    };

    const handleApellidosChange = (index, value) => {
        const capitalizedValue = capitalizeFirstLetter(value);
        const nuevosApellidos = [...apellidos];
        nuevosApellidos[index] = capitalizedValue;
        setApellidos(nuevosApellidos);
        onApellidos(nuevosApellidos);
        const error = capitalizedValue.trim().length < 5 || !isAlphaWithSpaces(value);
        setApellidosError((errors) => {
            const newErrors = [...errors];
            newErrors[index] = error;
            return newErrors;
        });
        setPuedeGuardar(!error);
        console.log("NO PUEDE GUARDAR");
    };

    return (
        <div className="card-body tarjeta">
            <div className="mb-3">
                <div>
                    <h2 className="text-center mb-4 heading">Datos Generales</h2>
                    <div>
                        <div className="col-md-12">
                            <div className="col-md-6">
                                <label htmlFor="nombreRequisito" className="form-label">Nombre Equipo</label>
                                <input
                                    value={nombreEquipoIn}
                                    onChange={(e) => handleNombreEquipoChange(e.target.value)}
                                    type="text"
                                    className={`form-control ${nombreEquipoError ? "is-invalid" : ""}`}
                                    id="nombreRequisito"
                                    name="nombreRequisito"
                                />
                                {nombreEquipoError && (
                                    <div className="invalid-feedback">
                                        El nombre del equipo debe tener al menos 5 caracteres y no contener números ni caracteres especiales.
                                    </div>
                                )}
                            </div>
                            {nombres.map((nombre, index) => (
                                <div key={index} className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor={`nombre${index + 1}`} className="form-label">
                                            Nombres Integrante {index + 1}
                                        </label>
                                        <input
                                            value={nombre}
                                            onChange={(e) => handleNombreChange(index, e.target.value)}
                                            type="text"
                                            className={`form-control ${nombresError[index] ? "is-invalid" : ""}`}
                                            id={`nombre${index + 1}`}
                                            name={`nombre${index + 1}`}
                                        />
                                        {nombresError[index] && (
                                            <div className="invalid-feedback">
                                                El nombre debe tener al menos 3 caracteres no contener números ni caracteres especiales.
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor={`apellido${index + 1}`} className="form-label">
                                            Apellidos Integrante {index + 1}
                                        </label>
                                        <input
                                            value={apellidos[index]}
                                            onChange={(e) => handleApellidosChange(index, e.target.value)}
                                            type="text"
                                            className={`form-control ${apellidosError[index] ? "is-invalid" : ""}`}
                                            id={`apellido${index + 1}`}
                                            name={`apellido${index + 1}`}
                                        />
                                        {apellidosError[index] && (
                                            <div className="invalid-feedback">
                                                El apellido debe tener al menos 4 caracteres, empezar con mayúscula y no contener números ni caracteres especiales.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatosGenerales;