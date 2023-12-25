import React, { useEffect, useState } from "react";
import "../css/Form.css";
import { URL_API } from "../const";

const endpoint = URL_API;

const Requisitos = ({
  participantesIn,
  requisitosIn,
  onValores,
  valoresIn, onCorreo,
  onGuardarEstado,
  booleanRequisitos,
  onRequisitosChange,
}) => {
  const [nombres, setNombres] = useState([]);
  const [requisitos, setRequisitos] = useState([]);
  const [etapasAbiertas, setEtapasAbiertas] = useState([]);
  const [valores, setValores] = useState(
    Array.from(
      { length: requisitosIn.length },
      () => Array(participantesIn.length).fill("") || valoresIn
    )
  );
  const [idRequisitos, setIdRequisitos] = useState([]);
  const [errores, setErrores] = useState(
    Array.from({ length: requisitosIn.length }, () =>
      Array(participantesIn.length).fill("")
    )
  );
  const [puedeGuardar, setPuedeGuardar] = useState(onGuardarEstado); // Nuevo estado local

    const [requisitoValor, setRequisitoValor]=useState(Array.from({ length: requisitosIn.length }, (_, rowIndex) => 
    Array(participantesIn.length).fill("").map((_, colIndex) => requisitosIn[rowIndex])));
    const [requisitoError, setRequisitoError]=useState(Array.from({ length: requisitosIn.length }, () => Array(participantesIn.length).fill("")));
    const [todosLosRequisitosCorrectos, setTodosLosRequisitosCorrectos] =
    useState(false); // Nuevo estado local

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
    validarRequisitos(); // Llama a la función de validación cada vez que cambian los valores
  }, [valores, onValores]);



  
  const toggleEtapa = (etapa) => {
    setEtapasAbiertas((prevEtapas) => ({
      ...prevEtapas,
      [etapa]: !prevEtapas[etapa],
    }));
  };

    const handleValorChange = (requisitoIndex, participanteIndex, value, idRequisito) => {
        if (requisitoValor[requisitoIndex][participanteIndex].id_requisito === 1) {
            if (value.length < 8) {
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = "El valor debe tener al menos 8 numeros";
                    return nuevosErrores;
                });
                if (value.length < 8) {
                    setValores((prevValores) => {
                        const nuevosValores = [...prevValores];
                        nuevosValores[requisitoIndex][participanteIndex] = { valor: value, id_requisito: idRequisito };
                        return nuevosValores;
                    });
                }
            } else if (value < 60000000) {
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = "Numero de telefono invalido";
                    return nuevosErrores;
                });
            } else if (value >= 80000000) {
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = "Numero de telefono invalido";
                    return nuevosErrores;
                });
            } else {
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
        } else if (requisitoValor[requisitoIndex][participanteIndex].id_requisito === 2) {
            const regex = /^[a-zA-Z.\s]*$/;

            if (!regex.test(value)) {
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = "Solo se permiten letras puntos y espacios";
                    return nuevosErrores;
                });
            } else if (value && value.length > 30) {
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = "El valor no puede tener mas de 30 caracter";
                    return nuevosErrores;
                });
            } else {
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
        } else if (requisitoValor[requisitoIndex][participanteIndex].id_requisito === 3) {
            const fechaActual = new Date();
            const fechaNacimiento = new Date(value);
            const fechaNacimientoMin = new Date();
            const fechaNacimientoMax = new Date();
            fechaNacimientoMin.setFullYear(fechaActual.getFullYear() - 18);
            fechaNacimientoMax.setFullYear(fechaActual.getFullYear() - 100);

            if (fechaNacimiento > fechaActual || fechaNacimiento > fechaNacimientoMin || fechaNacimiento < fechaNacimientoMax) {
                let mensajeError = "La fecha de nacimiento no es válida.";

                if (fechaNacimiento < fechaNacimientoMax) {
                    mensajeError = "La persona debe tener menos de 100 años.";
                } else if (fechaNacimiento > fechaNacimientoMin) {
                    mensajeError = "La persona debe tener al menos 18 años.";
                }

                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = mensajeError;
                    return nuevosErrores;
                });
            } else {
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
        } else if (requisitoValor[requisitoIndex][participanteIndex].requisitos_evento.tipo_requisito === "Número") {
            const valorMinimo = requisitoValor[requisitoIndex][participanteIndex].requisitos_evento.valor_minimo;
            const valorMaximo = requisitoValor[requisitoIndex][participanteIndex].requisitos_evento.valor_maximo;
            if (value > valorMinimo) {
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = `El valor debe ser mayor a ${valorMinimo}`;
                    return nuevosErrores;
                });
            } else if (value < valorMaximo) {
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = `El valor debe ser menor a ${valorMaximo}`;
                    return nuevosErrores;
                });
            } else {
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
        }else if (requisitoValor[requisitoIndex][participanteIndex].requisitos_evento.tipo_requisito === "Fecha") {
            const valorMinimo = requisitoValor[requisitoIndex][participanteIndex].requisitos_evento.valor_minimo;
            const valorMaximo = requisitoValor[requisitoIndex][participanteIndex].requisitos_evento.valor_maximo;
            const fechaActual = new Date(value);
            const fechaNacimientoMin = new Date(valorMinimo);
            const fechaNacimientoMax = new Date(valorMaximo);

            if (fechaActual <= fechaNacimientoMin || fechaActual >= fechaNacimientoMax) {
                let mensajeError = "La fecha no es válida.";

                if (fechaActual >= fechaNacimientoMax) {
                    mensajeError = `La fecha no puede ser mayor a ${fechaNacimientoMax.toLocaleDateString("es-ES")}.`;
                } else if (fechaActual <= fechaNacimientoMin) {
                    mensajeError = `La fecha no puede ser menor a ${fechaNacimientoMin.toLocaleDateString("es-ES")}.`;
                }

                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = mensajeError;
                    return nuevosErrores;
                });
            } else {
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

        }else if (requisitoValor[requisitoIndex][participanteIndex].requisitos_evento.tipo_requisito === "Cadena Alfabetica") {
            const regex = /^[a-zA-Z\s]*$/;

            if (!regex.test(value)) {
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = "Solo se permiten letras y espacios";
                    return nuevosErrores;
                });
            } else if (value && value.length > 30) {
                setRequisitoError((prevError) => {
                    const nuevosErrores = [...prevError];
                    nuevosErrores[requisitoIndex][participanteIndex] = "El valor no puede tener mas de 30 caracter";
                    return nuevosErrores;
                });                
            } else {
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
    };

    const getInputType = (tipoRequisito) => {
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


    const validarRequisitos = () => {
        // Esta función verifica si hay algún error en los requisitos
        // Si no hay errores, llama a onRequisitosChange(true), de lo contrario, llama a onRequisitosChange(false)
    
        const hayErrores = requisitoError.some((erroresParticipante) =>
          erroresParticipante.some((error) => error !== "")
        );
    
        setTodosLosRequisitosCorrectos(!hayErrores);
        onRequisitosChange(!hayErrores);
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
                                                        type={getInputType(requisito.requisitos_evento.tipo_requisito)}
                                                        className={`form-control ${requisitoError[requisitoIndex][participanteIndex] ? "is-invalid" : ""}`}
                                                        id={`requisito${requisitoIndex + 1}`}
                                                        name={`requisito${requisitoIndex + 1}`}
                                                        max={requisito.id_requisito === 3 ? (() => {
                                                            const fechaActual = new Date();
                                                            fechaActual.setDate(fechaActual.getDate() - 1);
                                                            return fechaActual.toISOString().split("T")[0];
                                                        })() : null}
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