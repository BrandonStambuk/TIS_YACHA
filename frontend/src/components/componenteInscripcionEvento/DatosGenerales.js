import React, { useEffect } from "react";
import { useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";

const endpoint = URL_API;

const DatosGenerales = ({ onNombreEquipo, onNombres, onApellidos, onCorreos , nombreEquipoIn, nombresIn, apellidosIn, correosIn, cantidadParticipantesIn,
    onGuardarEstado,booleanDatosGenerales,onBooleanDatosGeneralesChange }) => {
    const [nombres, setNombres] = useState(nombresIn||[]);
    const [apellidos, setApellidos] = useState(apellidosIn || []);
    const [correos, setCorreos] = useState(correosIn||[]);
    const [nombreEquipo, setNombreEquipo] = useState(nombreEquipoIn||[]);;
    const [nombreEquipoError, setNombreEquipoError] = useState(false);
    const [nombresError, setNombresError] = useState(new Array(nombres.length).fill(false));
    const [apellidosError, setApellidosError] = useState(new Array(apellidos.length).fill(false));
    const [correosError, setCorreosError] = useState(new Array(correos.length).fill(false));

   useEffect(() => {
        if (nombres.length > 0){
            setNombres(nombresIn);
        }else{
            const arrayNombres = Array.from({ length: cantidadParticipantesIn });
            setNombres(arrayNombres);
        setNombresError(new Array(arrayNombres.length).fill(false));
        setApellidosError(new Array(arrayNombres.length).fill(false));
        }
        
    }, [cantidadParticipantesIn]);
    //const [puedeGuardar, setPuedeGuardar] = useState(onGuardarEstado); // 
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    //const isAlpha = (str) => /^[a-zA-Z]+$/.test(str);
    const isAlphaWithSpaces = (str) => /^[a-zA-Z\s]+$/.test(str);


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
        const error = capitalizedValue.trim().length < 4 || !isAlphaWithSpaces(value);
        setNombresError((errors) => {
            const newErrors = [...errors];
            newErrors[index] = error;
            return newErrors;
        });
        onBooleanDatosGeneralesChange(!error);
        console.log("NO PUEDE GUARDAR");
    };

    const handleApellidosChange = (index, value) => {
        const capitalizedValue = capitalizeFirstLetter(value);
        const nuevosApellidos = [...apellidos];
        nuevosApellidos[index] = capitalizedValue;
        setApellidos(nuevosApellidos);
        onApellidos(nuevosApellidos);
        const error = capitalizedValue.trim().length < 4 || !isAlphaWithSpaces(value);
        setApellidosError((errors) => {
            const newErrors = [...errors];
            newErrors[index] = error;
            return newErrors;
        });
        onBooleanDatosGeneralesChange(!error);
        console.log("NO PUEDE GUARDAR");
    };

    const handleCorreosChange = (index, value) => {
        const nuevosCorreos = [...correos];
        nuevosCorreos[index] = value;
        setCorreos(nuevosCorreos);
        onCorreos(nuevosCorreos);
    
        // Expresión regular para validar el formato del correo electrónico
        // Permitir solo Gmail y Hotmail
        const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com)$/i;
    
        const isValidFormat = emailRegex.test(value);
    
        if (!isValidFormat) {
            setCorreosError((errors) => {
                const newErrors = [...errors];
                newErrors[index] = true;
                return newErrors;
            });
            onBooleanDatosGeneralesChange(false);
        } else {
            setCorreosError((errors) => {
                const newErrors = [...errors];
                newErrors[index] = false;
                return newErrors;
            });
            onBooleanDatosGeneralesChange(true);
         
        }
    };

    return (
        <div className="card-body tarjeta">
            <div className="mb-3">
                <div>
                   
                    <div>
                        <div className="col-md-12">
                            <div className="col-md-6">
                                {cantidadParticipantesIn!==1?(<>
                                    <label htmlFor="nombreRequisito" className="form-label">Nombre Equipo</label>
                                <input
                                    value={nombreEquipoIn}
                                    onChange={(e) => handleNombreEquipoChange(e.target.value)}
                                    type="text"
                                    className={`form-control ${nombreEquipoError ? "is-invalid" : ""}`}
                                    id="nombreRequisito"
                                    name="nombreRequisito"
                                />
                                
                                </>):null}
                                
                                {nombreEquipoError && (
                                    <div className="invalid-feedback">
                                        El nombre del equipo debe tener al menos 4 caracteres y no contener números ni caracteres especiales.
                                    </div>
                                )}
                            </div>
                            {nombres.map((nombre, index) => (
                                <div key={index} className="row">
                                    <div className="col-md-4 mb-3">
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
                                                El nombre debe tener al menos 4 caracteres no contener números ni caracteres especiales.
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-4 mb-3">
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
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor={`correo${index + 1}`} className="form-label">
                                            Correo {index + 1}
                                        </label>
                                        <input
                                            value={correos[index]}
                                            onChange={(e) => handleCorreosChange(index, e.target.value)}
                                            type="email"
                                            className={`form-control ${correosError[index] ? "is-invalid" : ""}`}
                                            id={`correo${index + 1}`}
                                            name={`correo${index + 1}`}
                                        />
                                        {correosError[index] && (
                                            <div className="invalid-feedback">
                                                El formato del correo electrónico no es válido.
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