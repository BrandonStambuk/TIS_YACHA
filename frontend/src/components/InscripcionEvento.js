import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DatosGenerales from "./componenteInscripcionEvento/DatosGenerales";
import Requisitos from "./componenteInscripcionEvento/Requisitos";


import { URL_API } from "../const";


const endpoint = URL_API;

const InscripcionEvento = () => {
  const [activeSection, setActiveSection] = useState("datosGenerales");
  const [cantidadParticipantes, setCantidadParticipantes] = useState("");
  const [nombre_equipo, setNombreEquipo] = useState("");
  const [requisitos, setRequisitos] = useState([]);
  const [nombres, setNombres] = useState([]);
  const [apellidos, setApellidos] = useState([]);
  const [valores, setValores] = useState([]);
  const { id } = useParams();


  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await axios.get(`${endpoint}/eventosDinamicos/${id}`);
        setCantidadParticipantes(response.data.cantidad_participantes_evento_dinamico);
        setRequisitos(response.data.detalle_requisitos);
        console.log(response.data.detalle_requisitos);
      } catch (error) {
        console.log(error);
      }
    }

    getEventById();
  }, [id]);

  const handleStoreInscripcion = async () => {
    const response = await axios.post(`${endpoint}/crearInscripcion`, {
      nombre_equipo: nombre_equipo,
      evento_dinamicos_id: id
    });

    const idInscripcion = response.data.id;
    for (let i = 0; i < nombres.length; i++) {
      const nombreParticipante = nombres[i];
      const apellidoParticipante = apellidos[i];
      const responseParticipante = await axios.post(`${endpoint}/crearParticipante`, {
        nombre: nombreParticipante,
        apellido: apellidoParticipante,
        inscripcions_id: idInscripcion
      });
      const idParticipante = responseParticipante.data.id;
      for (let j = 0; j < valores.length; j++) {
        const responseRequisito = await axios.post(`${endpoint}/crearOtroRequisito`, {
          valor: valores[j][i].valor,
          requisitos_eventos_id: valores[j][i].id_requisito,
          paticipantes_id: idParticipante
        });
      }

    }
  }


  const handleNombreChange = (nombres) => {
    setNombres(nombres);
  }
  const handleApellidosChange = (apellidos) => {
    setApellidos(apellidos);
  }
  const handleNombreEquipoChange = (nombreEquipo) => {
    setNombreEquipo(nombreEquipo);
  }
  const handleValorRequisitoChange = (valores) => {
    setValores(valores);
  }


  return (
    <div>
      <NavbarAdmin />
      <div className="mt-5">
        <div className="row">
          <div className="col-md-2 p-0">
            <div className="d-flex flex-column">
              <button
                onClick={() => handleSectionClick("datosGenerales")}
                className={`button mb-2 ${activeSection === "datosGenerales" ? "active" : ""}`}>
                Datos Generales
              </button>
              <button
                onClick={() => handleSectionClick("requisitos")}
                className={`button mb-2 ${activeSection === "requisitos" ? "active" : ""}`}>
                Requisitos
              </button>
              <button onClick={handleStoreInscripcion} className='btn btn-success'>Guardar</button>
              <Link to="/listaEventos" className='btn btn-danger'>Cancelar</Link>
            </div>
          </div>
          <div className="col-md-6">
            {activeSection === "datosGenerales" && (
              <DatosGenerales
                onNombreEquipo={handleNombreEquipoChange}
                onNombres={handleNombreChange}
                onApellidos={handleApellidosChange}
                nombreEquipoIn={nombre_equipo}
                nombresIn={nombres}
                apellidosIn={apellidos}
                cantidadParticipantesIn={cantidadParticipantes}
              />
            )}
            {activeSection === "requisitos" && (
              <Requisitos
                participantesIn={nombres}
                requisitosIn={requisitos}
                onValores={handleValorRequisitoChange}
                valoresIn={valores}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InscripcionEvento;