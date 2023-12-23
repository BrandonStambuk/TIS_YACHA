import React, { useEffect, useState } from "react";
import "../css/Form.css";
import { URL_API } from "../const";

const endpoint = URL_API;

const Requisitos = ({
  participantesIn,
  requisitosIn,
  onValores,
  valoresIn,
  onGuardarEstado,
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


  useEffect(() => {
    setNombres(participantesIn);
    setRequisitos(requisitosIn);
    const ids = requisitosIn.map((requisito) => requisito.id_requisito);
    setIdRequisitos(ids);
    console.log("ID DE REQUISITOS");
    console.log(ids);
  
    setPuedeGuardar(true); 
  }, [participantesIn, requisitosIn]);

  useEffect(() => {
    if (valoresIn && valoresIn.length > 0) {
      setValores(valoresIn);
    } else {
      setValores(
        Array.from({ length: requisitosIn.length }, () =>
          Array(participantesIn.length).fill("")
        )
      );
    }
    console.log(valores);
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

  const handleValorChange = (
    requisitoIndex,
    participanteIndex,
    value,
    idRequisito
  ) => {
    setValores((prevValores) => {
      const nuevosValores = [...prevValores];
      nuevosValores[requisitoIndex][participanteIndex] = {
        valor: value,
        id_requisito: idRequisito,
      };
      return nuevosValores;
    });
    // Limpiar mensaje de error al cambiar el valor
    setErrores((prevErrores) => {
      const nuevosErrores = [...prevErrores];
      nuevosErrores[requisitoIndex][participanteIndex] = "";
      return nuevosErrores;
    });
  };

  const validarRequisitos = () => {
    let puedeGuardar = true; // Inicializamos en true

    for (
      let participanteIndex = 0;
      participanteIndex < participantesIn.length;
      participanteIndex++
    ) {
      for (
        let requisitoIndex = 0;
        requisitoIndex < requisitosIn.length;
        requisitoIndex++
      ) {
        const valor =
          valores[requisitoIndex] &&
          valores[requisitoIndex][participanteIndex] &&
          valores[requisitoIndex][participanteIndex].valor;
        const idRequisito = idRequisitos[requisitoIndex];

        if (valor !== undefined && valor !== "") {
          switch (idRequisito) {
            case 1: // Validación para el correo
            const correoValido = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com|est\.umss\.edu)$/;
              if (!correoValido.test(valor)) {
                setErrores((prevErrores) => {
                  const nuevosErrores = [...prevErrores];
                  nuevosErrores[requisitoIndex][participanteIndex] =
                    "Correo inválido";
              
                  return nuevosErrores;
                });
                // Cambiamos el estado a false si hay error
                puedeGuardar = false;     
              }
              
              break;
            case 2: // Validación para el celular
            const celularValido = /^[6-7]\d{7}$/;
            if (!celularValido.test(valor)) {
                setErrores((prevErrores) => {
                  const nuevosErrores = [...prevErrores];
                  nuevosErrores[requisitoIndex][participanteIndex] =
                    "Número de celular inválido";
                
                  return nuevosErrores;
                  
                });
                // Cambiamos el estado a false si hay error
                puedeGuardar = false;
                  
                
              }
              break;
            case 3: // Validación para la carrera
            const carreraValida = /^[a-zA-Z\s]{8,20}$/;
            if (!carreraValida.test(valor)) {
                setErrores((prevErrores) => {
                  const nuevosErrores = [...prevErrores];
                  nuevosErrores[requisitoIndex][participanteIndex] =
                    "Carrera inválida";
                   
                  return nuevosErrores;
                });
                // Cambiamos el estado a false si hay error
                
                    puedeGuardar = false;
                
              }
              break;
            case 4: // Validación para la fecha de nacimiento (mayor de 18 años y menor de 23 años)
              const fechaNacimiento = new Date(valor);
              const hoy = new Date();
              const edadMinima = 18;
              const edadMaxima = 25;

              if (
                hoy.getFullYear() - fechaNacimiento.getFullYear() < edadMinima ||
                hoy.getFullYear() - fechaNacimiento.getFullYear() > edadMaxima
              ) {
                setErrores((prevErrores) => {
                  const nuevosErrores = [...prevErrores];
                  nuevosErrores[requisitoIndex][participanteIndex] =
                    "Debes tener entre 18 y 25 años";
                   
                  return nuevosErrores;
                });
                
                    puedeGuardar = false;
                
                
              }
              
              break;
            default:
              break;
          }
        } else {
          setErrores((prevErrores) => {
            const nuevosErrores = [...prevErrores];
            nuevosErrores[requisitoIndex][participanteIndex] = "";
            puedeGuardar = false;
            return nuevosErrores;
          });
          puedeGuardar = false;
        }
      }
    }

    // Llamamos a la función de retorno en el padre para actualizar el estado de puedeGuardar
    onGuardarEstado(puedeGuardar);

    if(puedeGuardar){
        console.log("PUEDE GUARDAR");
    }else{
        console.log("NO PUEDE GUARDAR");
    }
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
                  <button onClick={() => toggleEtapa(participanteIndex + 1)}>
                    {nombre}
                  </button>
                  {etapasAbiertas[participanteIndex + 1] && (
                    <div>
                      {requisitos.map((requisito, requisitoIndex) => (
                        <div key={requisitoIndex} className="col-md-6 mb-3">
                          <label
                            htmlFor={`requisito${requisitoIndex + 1}`}
                            className="form-label"
                          >
                            {requisito.requisitos_evento.nombre_requisito}
                          </label>
                          {idRequisitos[requisitoIndex] === 4 ? (
                            <input
                              value={
                                valores[requisitoIndex][participanteIndex].valor
                              }
                              onChange={(e) =>
                                handleValorChange(
                                  requisitoIndex,
                                  participanteIndex,
                                  e.target.value,
                                  requisito.id_requisito
                                )
                              }
                              type="date"
                              className="form-control"
                              id={`requisito${requisitoIndex + 1}`}
                              name={`requisito${requisitoIndex + 1}`}
                            />
                          ) : (
                            <input
                              value={
                                valores[requisitoIndex][participanteIndex].valor
                              }
                              onChange={(e) =>
                                handleValorChange(
                                  requisitoIndex,
                                  participanteIndex,
                                  e.target.value,
                                  requisito.id_requisito
                                )
                              }
                              type="text"
                              className="form-control"
                              id={`requisito${requisitoIndex + 1}`}
                              name={`requisito${requisitoIndex + 1}`}
                            />
                          )}
                          {errores[requisitoIndex][participanteIndex] && (
                            <div style={{ color: "red" }}>
                              {errores[requisitoIndex][participanteIndex]}
                            </div>
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