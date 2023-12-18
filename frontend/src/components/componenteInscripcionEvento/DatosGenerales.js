import React, { useEffect } from "react";
import { useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";

const endpoint = URL_API;

const DatosGenerales = ({onNombreEquipo, onNombres, onApellidos,nombreEquipoIn, nombresIn, apellidosIn, cantidadParticipantesIn  }) => {
    const [nombre_Equipo, setNombreEquipo] = useState(nombreEquipoIn || "");
    const [tipoRequisito, setTipoRequisito] = useState("");
    const [nombres, setNombres] = useState(nombresIn || []);
    const [apellidos, setApellidos] = useState(apellidosIn || []);
    const [nombreEquipoError, setNombreEquipoError] = useState(false);


    useEffect(() => {
        const arrayNombres = Array.from({ length: cantidadParticipantesIn });
        setNombres(arrayNombres);
    }, [cantidadParticipantesIn]);



    const handleTipoRequisitoChange = (e) => {
        setTipoRequisito(e.target.value);
    };
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
                            {/*<label htmlFor="tipoRequisito" className="form-label">Tipo de requisito</label>
                            <select
                                value={tipoRequisito}
                                onChange={handleTipoRequisitoChange}
                                className="form-select"
                                id="tipoRequisito"
                                name="tipoRequisito"
                            >
                                <option value="">Selecciona el tipo</option>
                                <option value="numero">Número</option>
                                <option value="cadena">Cadena</option>
    </select>*/}
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
                                            className="form-control"
                                            id={`nombre${index + 1}`}
                                            name={`nombre${index + 1}`}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
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