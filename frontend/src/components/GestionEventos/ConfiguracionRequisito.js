import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";

const endpoint = URL_API;

const ConfiguracionRequisito = ({ onRequisitos, RequisitosIn }) => {
    const [requisitos, setRequisitos] = useState([]);
    const [requisitosSeleccionados, setRequisitosSeleccionados] = useState(RequisitosIn || []);
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

    const validateNombreRequisito = (value) => {
        if (!/^[A-Z]/.test(value) && value.length > 0) {
            return "El primer carácter debe ser una letra mayúscula.";
        } else if (!/^[A-Za-z0-9\s]*$/.test(value)) {
            return "Solo están permitidas letras y números.";
        } else if (value.length > 21) {
            return "No se permiten más de 21 caracteres.";
        }
        return null; // Devolver null cuando no hay errores
    };

    const handleNombreRequisitoChange = (event) => {
        const error = validateNombreRequisito(event.target.value);
        setNombreRequisitoError(error);
        if (!error) {
            setNombreRequisito(event.target.value);
        }
    };




    const validateDescripcionRequisito = (value) => {
        if (value.length > 30) {
            return "No se permiten más de 30 caracteres.";
        }
        return null; // Devolver null cuando no hay errores
    };

    const handleDescripcionRequisitoChange = (event) => {
        const error = validateDescripcionRequisito(event.target.value);
        setDescripcionRequisitoError(error);
        if (!error) {
            setDescripcionRequisito(event.target.value);
        }
    }; console.log(requisitosSeleccionados);

    const handleTipoRequisitoChange = (e) => {
        setTipoRequisito(e.target.value);
    };

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
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setNombreRequisitoError("");
            setDescripcionRequisitoError("");
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [nombreRequisitoError, descripcionRequisitoError]);

    return (
        
        <div className="container mt-5">
        {/*`form-control ${nombreRequisitoError ? "is-invalid" : ""}`*/}
            <div className="col-md-8 mx-auto">
                <div className="card border-0">
                    <div className="card-body tarjeta">
                        <div className="row text-black">
                            <div className="mb-3">
                                
                                    <label htmlFor="nombreRequisito" className="form-label">Nombre requisito</label>
                                    <input
                                        value={nombre_requisito}
                                        onChange={handleNombreRequisitoChange}
                                        type="text"
                                        className={`form-control ${nombreRequisitoError ? "is-invalid" : ""}`}
                                        
                                        id="nombreRequisito"
                                        name="nombreRequisito"
                                    />
                                    {nombreRequisitoError && (
                                        <div className="invalid-feedback">{nombreRequisitoError}</div>
                                    )}
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
                                        onChange={handleDescripcionRequisitoChange}
                                        type="text"
                                        className={`form-control ${descripcionRequisitoError ? "is-invalid" : ""}`}
                                        id="descripcionRequisito"
                                        name="descripcionRequisito"
                                    />
                                    {descripcionRequisitoError && (
                                        <div className="invalid-feedback">{descripcionRequisitoError}</div>
                                    )}
                                    <button onClick={handleAgregarRequisito} className="btn btn-success">Agregar requisito</button>
                               
                                <div>
                                    <table className="table table-hover">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ConfiguracionRequisito;