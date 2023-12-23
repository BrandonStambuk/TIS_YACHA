import React, { useEffect, useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";

const endpoint = URL_API;

const Requisitos = ({ participantesIn, requisitosIn, onValores, valoresIn }) => {
    const [nombres, setNombres] = useState([]);
    const [requisitos, setRequisitos] = useState([]);
    const [etapasAbiertas, setEtapasAbiertas] = useState([]);
    const [valores, setValores] = useState(Array.from({ length: requisitosIn.length }, () => Array(participantesIn.length).fill("")||valoresIn));

    useEffect(() => {
        setNombres(participantesIn);
        setRequisitos(requisitosIn);
    }, [participantesIn, requisitosIn]);
    useEffect(() => {
        if (valoresIn && valoresIn.length > 0) {
            setValores(valoresIn);
        } else {
            setValores(Array.from({ length: requisitosIn.length }, () => Array(participantesIn.length).fill("")));
        }
    }, []);

    useEffect(() => {
        onValores(valores);
    }, [valores, onValores]);

    const toggleEtapa = (etapa) => {
        setEtapasAbiertas((prevEtapas) => ({
            ...prevEtapas,
            [etapa]: !prevEtapas[etapa],
        }));
    };

    const handleValorChange = (requisitoIndex, participanteIndex, value, idRequisito) => {
        setValores((prevValores) => {
            const nuevosValores = [...prevValores];
            nuevosValores[requisitoIndex][participanteIndex] = { valor: value, id_requisito: idRequisito };
            return nuevosValores;
        });
        console.log(valores);
    };

    return (
        <div className="card-body tarjeta">
            <div className="mb-3">
                <div>
                    <h2 className="text-center mb-4 heading">Requisitos</h2>
                    <div>
                        <div className="col-md-12">
                            {nombres.map((nombre, participanteIndex) => (
                                <div key={participanteIndex} className="row">
                                    <button onClick={() => toggleEtapa(participanteIndex + 1)}>{nombre}</button>
                                    {etapasAbiertas[participanteIndex + 1] && (
                                        <div>
                                            {requisitos.map((requisito, requisitoIndex) => (
                                                
                                                <div key={requisitoIndex} className="col-md-6 mb-3">
                                                    <label htmlFor={`requisito${requisitoIndex + 1}`} className="form-label">
                                                        {requisito.requisitos_evento.nombre_requisito}
                                                    </label>
                                                    <input
                                                        value={valores[requisitoIndex][participanteIndex].valor}
                                                        onChange={(e) => handleValorChange(requisitoIndex, participanteIndex, e.target.value, requisito.id_requisito)}
                                                        type="text"
                                                        className="form-control"
                                                        id={`requisito${requisitoIndex + 1}`}
                                                        name={`requisito${requisitoIndex + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Requisitos;
