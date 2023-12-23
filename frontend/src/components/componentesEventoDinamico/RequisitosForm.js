import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";

const endpoint = URL_API;

const RequisitosForm = ({ onRequisitos, RequisitosIn }) => {
    const [requisitos, setRequisitos] = useState([]);
    const [requisitosSeleccionados, setRequisitosSeleccionados] = useState(RequisitosIn || []);
    const [nombreRequisitoError, setNombreRequisitoError] = useState(false);
    const [descripcionRequisitoError, setDescripcionRequisitoError] = useState(false);

    const handleCheckboxChange = (requisitoId, isChecked) => {
        if (isChecked) {
            const newRequisitosSeleccionados = [...requisitosSeleccionados, requisitoId];
            setRequisitosSeleccionados(newRequisitosSeleccionados);
            console.log(newRequisitosSeleccionados);
            onRequisitos(newRequisitosSeleccionados);
        } else {
            const newRequisitosSeleccionados = requisitosSeleccionados.filter((requisito) => requisito !== requisitoId);
            setRequisitosSeleccionados(newRequisitosSeleccionados);
            console.log(newRequisitosSeleccionados);
            onRequisitos(newRequisitosSeleccionados);
        }
    };
    useEffect(() => {
        const getRequisitos = async () => {
            const response = await axios.get(`${endpoint}/requisitos`);
            setRequisitos(response.data);
        };
        getRequisitos();
    }, []);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setNombreRequisitoError("");
            setDescripcionRequisitoError("");
        }, 5000);
        return () => clearTimeout(timeoutId);
      }, [nombreRequisitoError, descripcionRequisitoError]);

    return (
        <div className="card-body tarjeta">
            <div className="mb-3">
                <div>
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Aplicar al evento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requisitos.map((requisito) => (
                                    <tr key={requisito.id}>
                                        <td>{requisito.nombre_requisito}</td>
                                        <td>{requisito.tipo_requisito}</td>
                                        <td>{requisito.descripcion_requisito}</td>
                                        <td><input
                                            type="checkbox"
                                            id={`checkbox-${requisito.id}`}
                                            onChange={(e) => handleCheckboxChange(requisito.id, e.target.checked)}
                                            checked={requisitosSeleccionados.includes(requisito.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>                   
                </div>
            </div>
        </div>
    );

};

export default RequisitosForm;