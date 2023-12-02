import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { URL_API } from "../const";

const endpoint = URL_API;

const TipoEventoForm = ({ onTipoEvento }) => {

    const [nombre_tipo_evento_dinamico, setTipoEventoDinamico] = useState("");
    const [nombreTipoEventoError, setNombreTipoEventoError] = useState("");
    const [opciones, setOpciones] = useState([]);
    const [valorSeleccionado, setValorSeleccionado] = useState('');
    const [etapasAbiertas, setEtapasAbiertas] = useState([]);

    useEffect(() => {
        axios.get(`${endpoint}/tipoEventosDinamicos`)
            .then(response => {
                setOpciones(response.data);
                setValorSeleccionado(response.data[0]);
            })
            .catch(error => {
                console.error('Error al obtener las opciones:', error);
            });
    }, []);

    const handleChangeTipoEvento = (event) => {
        onTipoEvento(event.target.value)
        setValorSeleccionado(event.target.value);
    };

    const toggleEtapa = (etapa) => {
        if (etapasAbiertas.includes(etapa)) {
            setEtapasAbiertas(etapasAbiertas.filter((e) => e !== etapa));
        } else {
            setEtapasAbiertas([...etapasAbiertas, etapa]);
        }
    };

    const handleSubmitStoreTipo = async (e) => {
        e.preventDefault();
        await axios.post(`${endpoint}/crearTipoEventoDinamico`, {
            nombre_tipo_evento_dinamico: nombre_tipo_evento_dinamico,
        });
        axios.get(`${endpoint}/tipoEventosDinamicos`).then(response => {
            setOpciones(response.data);
            setValorSeleccionado(response.data[0]);
        })
    }


    /* const store = async (e) => {
       e.preventDefault();
         await axios.post(`${endpoint}/crearTipoEventoDinamico`, {
             nombre_tipo_evento_dinamico: nombre_tipo_evento_dinamico,
         });
         toggleEtapa(1);
         axios.get(`${endpoint}/tipoEventoDinamico`)
         .then(response => {
           setOpciones(response.data);
           setValorSeleccionado(response.data[0]);
         })
         .catch(error => {
           console.error('Error al obtener las opciones:', error);
         });
         
     };*/
    // Estados para el tamaño de fuente y la alineación del texto


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="card border-0">
                        <div className="card-body tarjeta">
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="text-center mb-4 heading">Tipo de Evento</h2>
                                </div>
                            </div>
                            <div className="row text-black">
                                <div className="col-md-6">

                                    <div>
                                        <button onClick={() => toggleEtapa(1)}>Agregar tipo de Evento
                                            {etapasAbiertas.includes(1)}
                                        </button>
                                    </div>

                                    {etapasAbiertas.includes(1) && (
                                        <div>

                                            <div className="mb-3">
                                                <label htmlFor="tipoEvento" className="form-label">
                                                    tipo de Evento
                                                </label>
                                                <input
                                                    value={nombre_tipo_evento_dinamico}
                                                    onChange={(e) => setTipoEventoDinamico(e.target.value)}
                                                    type="text"
                                                    className={`form-control ${nombreTipoEventoError ? "is-invalid" : ""
                                                        }`}
                                                    id="tipoEvento"
                                                    name="tipoEvento"
                                                />
                                                {nombreTipoEventoError && (
                                                    <div className="invalid-feedback">
                                                        {nombreTipoEventoError}
                                                    </div>
                                                )}
                                            </div>
                                            <button onClick={handleSubmitStoreTipo} id="botoncito" className="btn btn-primary">
                                                Guardar
                                            </button>

                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="selector">Selecciona una opción:</label>
                                        <select id="selector" value={valorSeleccionado} onChange={handleChangeTipoEvento}>
                                            {opciones.map((opcion) => (
                                                <option key={opcion.id} value={opcion.id}>
                                                    {opcion.nombre_tipo_evento_dinamico}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TipoEventoForm;