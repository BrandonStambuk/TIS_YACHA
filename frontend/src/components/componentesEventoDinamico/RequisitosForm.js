import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";

const endpoint = URL_API;

const RequisitosForm = () => {
    const [requisitos, setRequisitos] = useState([]);
    const [etapasAbiertas, setEtapasAbiertas] = useState([]);

    useEffect(() => {
        const getRequisitos = async () => {
            const response = await axios.get(`${endpoint}/requisitos`);
            setRequisitos(response.data);
        };
        getRequisitos();
    }, [requisitos]);

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
                <h2 className="text-center mb-4 heading">Requisitos</h2>
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">aplicar al evento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requisitos.map((requisito) => (
                                    <tr key={requisito.id}>
                                        <td>{requisito.nombre_requisito}</td>
                                        <td>{requisito.tipo_requisito}</td>
                                        <td>{requisito.descripcion_requisito}</td>
                                        <td>
                                            <input type="checkbox" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={() => toggleEtapa(1)}>
                            Gestionar requisitos {etapasAbiertas[1]}
                        </button>
                    </div>
                    {etapasAbiertas[1] && (
                        <h1>Requisitos</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequisitosForm;