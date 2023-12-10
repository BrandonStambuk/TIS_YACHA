import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";

const endpoint = URL_API;

const RequisitosForm = ({ onRequisitos }) => {
    const [requisitos, setRequisitos] = useState([]);
    const [requisitosSeleccionados, setRequisitosSeleccionados] = useState([]);
    const [etapasAbiertas, setEtapasAbiertas] = useState([]);
    const [nombre_requisito, setNombreRequisito] = useState("");
    const [tipoRequisito, setTipoRequisito] = useState("");
    const [descripcion_requisito, setDescripcionRequisito] = useState("");
    const [editNombreRequisito, setEditNombreRequisito] = useState("");
    const [editTipoRequisito, setEditTipoRequisito] = useState("");
    const [editDescripcionRequisito, setEditDescripcionRequisito] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [nombreRequisitoError, setNombreRequisitoError] = useState(false);
    const [descripcionRequisitoError, setDescripcionRequisitoError] = useState(false);

    const handleTipoRequisitoChange = (e) => {
        setTipoRequisito(e.target.value);
    };

    const handleCheckboxChange = (requisitoId, isChecked) => {
        console.log(`Requisito ${requisitoId} seleccionado: ${isChecked}`);
        if(isChecked){
            const newRequisitosSeleccionados=[...requisitosSeleccionados, requisitoId];
            setRequisitosSeleccionados(newRequisitosSeleccionados);
        }else{
            const newRequisitosSeleccionados=requisitosSeleccionados.filter((requisito) => requisito !== requisitoId);
            setRequisitosSeleccionados(newRequisitosSeleccionados);
        }
        
    };

    const handleEditRequisito = (id) => {
        setEditingId(id);
        const requisito = requisitos.find((requisito) => requisito.id === id);
        setEditNombreRequisito(requisito.nombre_requisito);
        setEditTipoRequisito(requisito.tipo_requisito);
        setEditDescripcionRequisito(requisito.descripcion_requisito);
    }
    const handleCancelRequisito = () => {
        setEditingId(null);
        setEditNombreRequisito("");
        setEditTipoRequisito("");
        setEditDescripcionRequisito("");
    };

    const handleDeleteRequisito = async (id) => {
        await axios.delete(`${endpoint}/eliminarRequisito/${id}`);
        const newRequisitos = requisitos.filter((requisito) => requisito.id !== id);
        setRequisitos(newRequisitos);
    }
    const handleUpdateRequisito = async () => {
        try {
            await axios.put(`${endpoint}/actualizarRequisito/${editingId}`, {
                nombre_requisito: editNombreRequisito,
                tipo_requisito: editTipoRequisito,
                descripcion_requisito: editDescripcionRequisito,
            });

            const response = await axios.get(`${endpoint}/requisitos`);
            const data = response.data;
            setRequisitos(data);
            setEditingId(null);
            setEditNombreRequisito("");
        } catch (error) {
            console.error("Error al actualizar el tipo de evento:", error);
        }
    }

    useEffect(() => {
        const getRequisitos = async () => {
            const response = await axios.get(`${endpoint}/requisitos`);
            setRequisitos(response.data);
        };
        getRequisitos();
    }, []);

    const toggleEtapa = (etapa) => {
        setEtapasAbiertas((prevEtapas) => ({
            ...prevEtapas,
            [etapa]: !prevEtapas[etapa],
        }));
    };

    const handleAgregarRequisito = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${endpoint}/crearRequisito`, {
            nombre_requisito: nombre_requisito,
            tipo_requisito: tipoRequisito,
            descripcion_requisito: descripcion_requisito,
        });
        const idRequisito = response.data.id;
        setRequisitos([
            ...requisitos,
            {
                id: idRequisito,
                nombre_requisito: nombre_requisito,
                tipo_requisito: tipoRequisito,
                descripcion_requisito: descripcion_requisito,
            },
        ]);
        setNombreRequisito("");
        setTipoRequisito("");
        setDescripcionRequisito("");
    };

    return (
        <div className="card-body tarjeta">
            <div className="mb-3">
                <div>
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
                                        <td><input
                                            type="checkbox"
                                            id={`checkbox-${requisito.id}`}
                                            onChange={(e) => handleCheckboxChange(requisito.id, e.target.checked)} />
                                        </td>
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
                        <div>
                            <div className="col-md-6">
                                <label htmlFor="nombreRequisito" className="form-label">Nombre requisito</label>
                                <input
                                    value={nombre_requisito}
                                    onChange={(e) => setNombreRequisito(e.target.value)}
                                    type="text"
                                    className={`form-control ${nombreRequisitoError ? "is-invalid" : ""}`}
                                    id="nombreRequisito"
                                    name="nombreRequisito"
                                />
                                <label htmlFor="tipoRequisito" className="form-label">Tipo de requisito</label>
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
                                </select>
                                <label htmlFor="descripcionRequisito" className="form-label">Descripcion</label>
                                <input
                                    value={descripcion_requisito}
                                    onChange={(e) =>
                                        setDescripcionRequisito(e.target.value)
                                    }
                                    type="text"
                                    className={`form-control ${descripcionRequisitoError ? "is-invalid" : ""
                                        }`}
                                    id="descripcionRequisito"
                                    name="descripcionRequisito"
                                />
                                <button onClick={handleAgregarRequisito} className="btn btn-success">Agregar requisito</button>
                            </div>
                            <div>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requisitos.map((requisito) => (
                                            <tr key={requisito.id}>
                                                <td>{editingId === requisito?.id ? (
                                                    <input
                                                        value={editNombreRequisito}
                                                        onChange={(e) => setEditNombreRequisito(e.target.value)}
                                                        type="text"
                                                        className={`form-control ${nombreRequisitoError ? "is-invalid" : ""}`}
                                                    />
                                                ) : (requisito?.nombre_requisito)}</td>
                                                <td>{editingId === requisito?.id ? (<select
                                                    value={editTipoRequisito}
                                                    onChange={(e) => setEditTipoRequisito(e.target.value)}
                                                    className="form-select"
                                                    id="tipoRequisito"
                                                    name="tipoRequisito"
                                                >
                                                    <option value="">Selecciona el tipo</option>
                                                    <option value="numero">Número</option>
                                                    <option value="cadena">Cadena</option>
                                                </select>) : (requisito?.tipo_requisito)}</td>
                                                <td>{editingId === requisito?.id ? (
                                                    <input
                                                        value={editDescripcionRequisito}
                                                        onChange={(e) => setEditDescripcionRequisito(e.target.value)}
                                                        type="text"
                                                        className={`form-control ${descripcionRequisitoError ? "is-invalid" : ""}`}
                                                    />
                                                ) : (requisito?.descripcion_requisito)}</td>
                                                <td>
                                                    {editingId === requisito?.id ? (
                                                        <>
                                                            <button
                                                                onClick={handleUpdateRequisito}
                                                                className="btn btn-success">
                                                                Actualizar
                                                            </button>
                                                            <button
                                                                onClick={handleCancelRequisito}
                                                                className="btn btn-success">
                                                                Cancelar
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleDeleteRequisito(requisito?.id)}
                                                                className="btn btn-danger">
                                                                Eliminar
                                                            </button>
                                                            <button
                                                                onClick={() => handleEditRequisito(requisito?.id)}
                                                                className="btn btn-warning">
                                                                Editar
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequisitosForm;