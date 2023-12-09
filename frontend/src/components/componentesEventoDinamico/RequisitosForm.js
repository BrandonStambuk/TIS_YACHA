import React from "react";
import { useState } from "react";
import '../css/Form.css';

const RequisitosForm = () => {
    const [nombreEventoError, setNombreEventoError] = useState("");
    const [lugarEventoError, setLugarEventoError] = useState("");
    const [cantidadError, setCantidadError] = useState("");
    const [nombreEvento, setNombreEvento] = useState("");
    const [lugarEvento, setLugarEvento] = useState("");
    const [cantidadParticiapantesEvento, setCantidadParticipantesEvento] = useState("");

    const toggleEtapa = (etapa) => {
        setEtapasAbiertas((prevEtapas) => ({
          ...prevEtapas,
          [etapa]: !prevEtapas[etapa],
        }));
      };

    return (
        <div className="card-body tarjeta">
            <div className="mb-3">
                <div className="col-md-6">
                    <div>
                        <button onClick={() => toggleEtapa(1)}>
                            Agregar requisito {etapasAbiertas[1] ? "-" : "+"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequisitosForm;