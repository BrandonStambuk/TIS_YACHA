import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import '../css/Form.css';
import { URL_API } from "../const";
import Swal from 'sweetalert2';

const endpoint = URL_API;

const ConfiguracionRequisito = () => {
    const [requisitos, setRequisitos] = useState([]);
    const [etapasAbiertas, setEtapasAbiertas] = useState([]);
    const [nombre_requisito, setNombreRequisito] = useState("");
    const [tipoRequisito, setTipoRequisito] = useState("");
    const [descripcion_requisito, setDescripcionRequisito] = useState("");
    const [editNombreRequisito, setEditNombreRequisito] = useState("");
    const [editTipoRequisito, setEditTipoRequisito] = useState("");
    const [editDescripcionRequisito, setEditDescripcionRequisito] = useState("");
    const [valor_minimo, setValorMinimo] = useState("");
    const [valor_maximo, setValorMaximo] = useState("");
    const [editValorMinimo, setEditValorMinimo] = useState("");
    const [editValorMaximo, setEditValorMaximo] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [nombreRequisitoError, setNombreRequisitoError] = useState(false);
    const [descripcionRequisitoError, setDescripcionRequisitoError] = useState(false);
    const [valorMinimoError, setValorMinimoError] = useState("");
    const [valorMaximoError, setValorMaximoError] = useState("");


    const validateNombreRequisito = (value) => {
        if (!/^[A-Z]/.test(value) && value.length > 0) {
            return "El primer carácter debe ser una letra mayúscula.";
        } else if (!/^[A-Za-z0-9\s]*$/.test(value)) {
            return "Solo están permitidas letras y números.";
        } else if (value.length > 21) {
            return "No se permiten más de 21 caracteres.";
        }
        return null;
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
        return null;
    };

    const handleDescripcionRequisitoChange = (event) => {
        const error = validateDescripcionRequisito(event.target.value);
        setDescripcionRequisitoError(error);
        if (!error) {
            setDescripcionRequisito(event.target.value);
        }
    };

    const handleTipoRequisitoChange = (e) => {
        setTipoRequisito(e.target.value);
    };

    const handleEditRequisito = (id) => {
        setEditingId(id);
        const requisito = requisitos.find((requisito) => requisito.id === id);
        setEditNombreRequisito(requisito.nombre_requisito);
        setEditTipoRequisito(requisito.tipo_requisito);
        setEditDescripcionRequisito(requisito.descripcion_requisito);
        setEditValorMinimo(requisito.valor_minimo);
        setEditValorMaximo(requisito.valor_maximo);
    }
    const handleCancelRequisito = () => {
        setEditingId(null);
        setEditNombreRequisito("");
        setEditTipoRequisito("");
        setEditDescripcionRequisito("");
        setEditValorMinimo("");
        setEditValorMaximo("");
    };

    const handleDeleteRequisito = async (id) => {
        Swal.fire({
            title: '¿Estás seguro de que deseas eliminar este requisito?',
            text: 'No podrás revertir esta acción.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const responseDelete = await axios.delete(`${endpoint}/eliminarRequisito/${id}`);
                    Swal.fire('¡Eliminado!', 'El requisito ha sido eliminado.', 'success');
                    const newRequisitos = requisitos.filter((requisito) => requisito.id !== id);
                    setRequisitos(newRequisitos);
                } catch (error) {
                    if (error.response) {
                        const errorMessage = error.response.data.error || 'Error al eliminar el requisito';
                        Swal.fire({
                            title: 'Este requisito esta siendo utilizado por eventos ¿ Estas seguro que deseas eliminarlo ?',
                            text: 'No podrás revertir esta acción.',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, eliminarlo',
                            cancelButtonText: 'Cancelar',
                        }).then(async (result2) => {
                            if (result2.isConfirmed) {
                                const responseDelete = await axios.delete(`${endpoint}/eliminarTodoRequisito/${id}`);
                                Swal.fire('¡Eliminado!', 'El requisito ha sido eliminado.', 'success');
                                const newRequisitos = requisitos.filter((requisito) => requisito.id !== id);
                                setRequisitos(newRequisitos);
                            }
                        });
                    }
                }
            }
        });

    }

    const handleUpdateRequisito = async () => {
        try {
            await axios.put(`${endpoint}/actualizarRequisito/${editingId}`, {
                nombre_requisito: editNombreRequisito,
                tipo_requisito: editTipoRequisito,
                descripcion_requisito: editDescripcionRequisito,
                valor_minimo: editValorMinimo,
                valor_maximo: editValorMaximo
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
            valor_minimo: valor_minimo,
            valor_maximo: valor_maximo
        });
        const idRequisito = response.data.id;
        setRequisitos([
            ...requisitos,
            {
                id: idRequisito,
                nombre_requisito: nombre_requisito,
                tipo_requisito: tipoRequisito,
                descripcion_requisito: descripcion_requisito,
                valor_minimo: valor_minimo,
                valor_maximo: valor_maximo
            },
        ]);
        setNombreRequisito("");
        setTipoRequisito("");
        setDescripcionRequisito("");
        setValorMinimo("");
        setValorMaximo("");
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
            <div className="col-md-8 mx-auto">
                <div className="card border-0">
                    <div className="card-body tarjeta">
                        <div className="row text-black">
                            <div className="mb-3">
                                <div>
                                    <table className="table table-hover">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Valor minimo</th>
                                                <th scope="col">Valor maximo</th>
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
                                                            className={`form-control form-control-table ${nombreRequisitoError ? "is-invalid" : ""}`}
                                                        />
                                                    ) : (requisito?.nombre_requisito)}</td>
                                                    <td>{editingId === requisito?.id ? (<select
                                                        value={editTipoRequisito}
                                                        onChange={(e) => setEditTipoRequisito(e.target.value)}
                                                        className="form-select form-select-table"
                                                        id="tipoRequisito"
                                                        name="tipoRequisito"
                                                    >
                                                        <option value="">Selecciona el tipo</option>
                                                        <option value="Número">Número</option>
                                                        <option value="Caracteres">Caracteres</option>
                                                        <option value="Fecha">Fecha</option>
                                                    </select>) : (requisito?.tipo_requisito)}</td>
                                                    <td>{editingId === requisito?.id ? (
                                                        <input
                                                            value={editDescripcionRequisito}
                                                            onChange={(e) => setEditDescripcionRequisito(e.target.value)}
                                                            type="text"
                                                            className={`form-control form-control-table ${descripcionRequisitoError ? "is-invalid" : ""}`}
                                                        />
                                                    ) : (requisito?.descripcion_requisito)}</td>

                                                    <td>
                                                        {editingId === requisito?.id ? (<>
                                                            {(editTipoRequisito === "Número") && (
                                                                <input
                                                                    value={editValorMinimo}
                                                                    onChange={(e) => setEditValorMinimo(e.target.value)}
                                                                    type="number"
                                                                    className={`form-control form-control-table ${valorMinimoError ? "is-invalid" : ""}`}
                                                                />)}
                                                        </>) : (requisito?.valor_minimo)}</td>
                                                    <td>{editingId === requisito?.id ? (<>
                                                        {(editTipoRequisito === "Número") && (
                                                            <input
                                                                value={editValorMaximo}
                                                                onChange={(e) => setEditValorMaximo(e.target.value)}
                                                                type="number"
                                                                className={`form-control form-control-table ${valorMaximoError ? "is-invalid" : ""}`}
                                                            />)}
                                                    </>) : (requisito?.valor_maximo)}</td>
                                                    <td>{([1, 2, 3, 4].includes(requisito.id)) ? (
                                                        <span>Valor por defecto</span>
                                                    ) : (
                                                        <>
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
                                                        </>
                                                    )}

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
                                        <div className="mt-4 d-flex d-row">
                                            <div className="col-md-8">
                                                <label htmlFor="nombreRequisito" className="form-label padding-top">Nombre requisito</label>
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
                                                    <option value="Número">Número</option>
                                                    <option value="Caracteres">Caracteres</option>
                                                    <option value="Fecha">Fecha</option>
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
                                            </div>
                                            {(tipoRequisito === "Número") && (
                                                <div className="col-md-4">
                                                    <p>Seleccione los valores en los cuales esta permitido {nombre_requisito}</p>
                                                    <label htmlFor="descripcionRequisito" className="form-label">Valor Minimo</label>
                                                    <input
                                                        value={valor_minimo}
                                                        onChange={(e) => setValorMinimo(e.target.value)}
                                                        type="number"
                                                        className={`form-control ${valorMinimoError ? "is-invalid" : ""}`}
                                                        id="valorMinimo"
                                                        name="valorMinimo"
                                                    />
                                                    <label htmlFor="descripcionRequisito" className="form-label">Valor Maximo</label>
                                                    <input
                                                        value={valor_maximo}
                                                        onChange={(e) => setValorMaximo(e.target.value)}
                                                        type="number"
                                                        className={`form-control ${valorMaximoError ? "is-invalid" : ""}`}
                                                        id="valorMaximo"
                                                        name="valorMaximo"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <button onClick={handleAgregarRequisito} className="btn btn-success">Guardar</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ConfiguracionRequisito;