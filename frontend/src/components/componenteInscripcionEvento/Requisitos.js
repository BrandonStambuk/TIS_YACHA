import React, { useEffect, useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";

const endpoint = URL_API;

const Requisitos = ({ participantesIn, requisitosIn, onValores, valoresIn, onCorreo }) => {
    const [nombres, setNombres] = useState([]);
    const [requisitos, setRequisitos] = useState([]);
    const [etapasAbiertas, setEtapasAbiertas] = useState([]);
    const [valores, setValores] = useState(Array.from({ length: requisitosIn.length }, () => Array(participantesIn.length).fill("")||valoresIn));
    const [requisitoValor, setRequisitoValor]=useState(Array.from({ length: requisitosIn.length }, (_, rowIndex) => 
    Array(participantesIn.length).fill("").map((_, colIndex) => requisitosIn[rowIndex])));
    const [requisitoError, setRequisitoError]=useState(Array.from({ length: requisitosIn.length }, () => Array(participantesIn.length).fill("")));
    

    useEffect(() => {
        setNombres(participantesIn);
        setRequisitos(requisitosIn);
        console.log(Array.from({ length: requisitosIn.length }, (_, rowIndex) => 
        Array(participantesIn.length).fill("").map((_, colIndex) => requisitosIn[rowIndex])));        
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
        if(requisitoValor[requisitoIndex][participanteIndex].id_requisito===1){
            setValores((prevValores) => {
                const nuevosValores = [...prevValores];
                nuevosValores[requisitoIndex][participanteIndex] = { valor: value, id_requisito: idRequisito };
                return nuevosValores;
            });            
        }else if(requisitoValor[requisitoIndex][participanteIndex].requisitos_evento.tipo_requisito==="Número"){
            const valorMinimo=requisitoValor[requisitoIndex][participanteIndex].requisitos_evento.valor_minimo;
            const valorMaximo=requisitoValor[requisitoIndex][participanteIndex].requisitos_evento.valor_maximo;
            if (value<valorMinimo){
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = `El valor debe ser mayor a ${valorMinimo}`;
                    return nuevosErrores;
                });
            }else if(value>valorMaximo){
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = `El valor debe ser menor a ${valorMaximo}`;
                    return nuevosErrores;
                });
            }else{
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = "";
                    return nuevosErrores;
                });
                setValores((prevValores) => {
                    const nuevosValores = [...prevValores];
                    nuevosValores[requisitoIndex][participanteIndex] = { valor: value, id_requisito: idRequisito };
                    return nuevosValores;
                });
            }
        }

       setValores((prevValores) => {
            const nuevosValores = [...prevValores];
            nuevosValores[requisitoIndex][participanteIndex] = { valor: value, id_requisito: idRequisito };
            return nuevosValores;
        });
        console.log(valores);
    };

    const getInputType= (tipoRequisito)=>{
        switch (tipoRequisito) {
            case "Número":
                return "number";
            case "Fecha":
                return "date";
            case "Email":
                return "email";
            default:
                return "text";
        }
    }

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
                                                        type={getInputType(requisito.requisitos_evento.tipo_requisito)}
                                                        className={`form-control ${requisitoError[requisitoIndex][participanteIndex] ? "is-invalid" : ""}`}
                                                        id={`requisito${requisitoIndex + 1}`}
                                                        name={`requisito${requisitoIndex + 1}`}
                                                    />{requisitoError && (
                                                        <div className="invalid-feedback">{requisitoError[requisitoIndex][participanteIndex]}</div>
                                                      )}

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
