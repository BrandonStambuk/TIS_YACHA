import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { URL_API } from "../const";

const endpoint = URL_API;

const TipoEventoForm = ({ onTipoEvento, onValorSeleccionado }) => {
  const [nombre_tipo_evento_dinamico, setTipoEventoDinamico] = useState("");
  const [nombreTipoEventoError, setNombreTipoEventoError] = useState("");
  const [opciones, setOpciones] = useState([]);
  const [opcionesComp, setOpcionesComp] = useState([]); //opciones de competencias
  const [valorSeleccionado, setValorSeleccionado] = useState("");
  const [etapasAbiertas, setEtapasAbiertas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [mostrarTabla, setMostrarTabla] = useState(false);



  useEffect(() => {
    axios
      .get(`${endpoint}/tipoEventosDinamicos`)
      .then((response) => {
        setOpciones(response.data);
        setValorSeleccionado(onValorSeleccionado);
      })
      .catch((error) => {
        console.error("Error al obtener las opciones:", error);
      });

    axios
      .get(`${endpoint}/tipoCompetenciasDinamicas`)
      .then((response) => {
        setOpcionesComp(response.data);
        setValorSeleccionado(onValorSeleccionado);
      })
      .catch((error) => {
        console.error("Error al obtener las opciones:", error);
      });
  }, []);

  const handleDeleteTipoEvento = async (id) => {
    try {
      await axios.delete(`${endpoint}/eliminarTipoEventoDinamico/${id}`);
      const response = await axios.get(`${endpoint}/tipoEventosDinamicos`);
      const reponse2 = await axios.get(`${endpoint}/tipoCompetenciasDinamicas`);
      const data = response.data;
      const data2 = reponse2.data;
      setOpciones(data);
      setOpcionesComp(data2);

      console.log("data2", data2);

      if (data.length > 0) {
        setValorSeleccionado(data[0].id);
      } else {
        setValorSeleccionado("");
      }
    } catch (error) {
      console.error("Error al eliminar el tipo de evento:", error);
    }
  };

  const handleEditTipoEvento = (id) => {
    setEditingId(id);
    const tipoEventoSeleccionado = opciones.find((opcion) => opcion.id === id);
    setTipoEventoDinamico(tipoEventoSeleccionado.nombre_tipo_evento_dinamico);
  };

  const handleUpdateTipoEvento = async () => {
    try {
      await axios.put(`${endpoint}/actualizarTipoEventoDinamico/${editingId}`, {
        nombre_tipo_evento_dinamico: nombre_tipo_evento_dinamico,
      });

      const response = await axios.get(`${endpoint}/tipoEventosDinamicos`);
      const data = response.data;
      setOpciones(data);

      setEditingId(null);
      setTipoEventoDinamico("");
    } catch (error) {
      console.error("Error al actualizar el tipo de evento:", error);
    }
  };

  const handleChangeTipoEvento = (event) => {
    onTipoEvento(event.target.value);
    setValorSeleccionado(event.target.value);
  };

  const toggleTabla = () => {
    setMostrarTabla((prevMostrarTabla) => !prevMostrarTabla);
  };
  const validateTipoEvento = (value) => {
    if (!/^[A-Z]/.test(value) && value.length > 0) {
      return "El primer carácter debe ser una letra mayúscula.";
    } else if (!/^[A-Za-z\s\-]*$/.test(value)) {
      return "No se admiten caracteres distintos a números y espacios";
    } else if (value.length > 50) {
      return "No se permiten más de 50 caracteres.";
    }
    return "";
  };
  const handleSubmitStoreTipo = async (e) => {
    let error = validateTipoEvento(nombre_tipo_evento_dinamico);
    setNombreTipoEventoError(error);
    if (!error) {
      e.preventDefault();
      await axios.post(`${endpoint}/crearTipoEventoDinamico`, {
        nombre_tipo_evento_dinamico: nombre_tipo_evento_dinamico,
      });
      const response = await axios.get(`${endpoint}/tipoEventosDinamicos`);
      setOpciones(response.data);
      setValorSeleccionado(response.data[0]);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card border-0">
            <div className="card-body tarjeta">
              <div className="row">
              </div>
              <div className="row text-black">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="selector">Selecciona una opción:</label>
                    <select
                      id="selector"
                      value={valorSeleccionado}
                      onChange={handleChangeTipoEvento}
                    >
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
