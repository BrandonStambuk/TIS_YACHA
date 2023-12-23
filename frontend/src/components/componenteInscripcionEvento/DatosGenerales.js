import React, { useEffect } from "react";
import { useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";

const endpoint = URL_API;

const DatosGenerales = ({onNombreEquipo, onNombres, onApellidos, onCorreos ,nombreEquipoIn, nombresIn, apellidosIn, correosIn, cantidadParticipantesIn  }) => {
    const [nombres, setNombres] = useState(nombresIn||[]);
    const [apellidos, setApellidos] = useState(apellidosIn || []);
    const [correos, setCorreos] = useState(correosIn||[]);
    const [nombreEquipoError, setNombreEquipoError] = useState(false);


   useEffect(() => {
        if (nombres.length > 0){
            setNombres(nombresIn);
        }else{
            const arrayNombres = Array.from({ length: cantidadParticipantesIn });
            setNombres(arrayNombres);
        }
        
    }, [cantidadParticipantesIn]);

    const handleNombreEquipoChange = (value) => {
        onNombreEquipo(value);
    }

    const handleNombreChange = (index, value) => {
        const nuevosNombres = [...nombres];
        nuevosNombres[index] = value;
        setNombres(nuevosNombres);
        onNombres(nuevosNombres);
    };
    const handleApellidosChange = (index, value) => {
        const nuevosApellidos = [...apellidos];
        nuevosApellidos[index] = value;
        setApellidos(nuevosApellidos);
        onApellidos(nuevosApellidos);
    };
    const handleCorreosChange = (index, value) => {
        const nuevosCorreos = [...correos];
        nuevosCorreos[index] = value;
        setCorreos(nuevosCorreos);
        onCorreos(nuevosCorreos);
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
                                            className="form-control"
                                            id={`nombre${index + 1}`}
                                            name={`nombre${index + 1}`}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor={`apellido${index + 1}`} className="form-label">
                                            Apellidos Integrante {index + 1}
                                        </label>
                                        <input
                                            value={apellidos[index]}
                                            onChange={(e) => handleApellidosChange(index, e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id={`apellido${index + 1}`}
                                            name={`apellido${index + 1}`}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor={`correo${index + 1}`} className="form-label">
                                            Correo {index + 1}
                                        </label>
                                        <input
                                            value={correos[index]}
                                            onChange={(e) => handleCorreosChange(index, e.target.value)}
                                            type="email"
                                            className="form-control"
                                            id={`correo${index + 1}`}
                                            name={`correo${index + 1}`}
                                        />
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