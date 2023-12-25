import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import NombreEventoForm from "./componentesEventoDinamico/NombreEventoForm";
import TipoEventoForm from "./componentesEventoDinamico/TipoEventoForm";
import FechasHorasForm from "./componentesEventoDinamico/FechasHorasForm";
import DescripcionForm from "./componentesEventoDinamico/DescripcionForm";
import RequisitosForm from "./componentesEventoDinamico/RequisitosForm";
import NavbarOrganizador from "./NavbarOrganizador";
import AficheForm from "./componentesEventoDinamico/AficheForm";

import { URL_API } from "../const";

const endpoint = URL_API;

const CreateEvento = () => {
  const [nombre_evento_dinamico, setNombreEventoDinamico] = useState("");
  const [tipo_evento_dinamico_id, setTipoEventoDinamicoId] = useState("");
  const [fecha_inicio_inscripcion, setFechaInicioInscripcion] = useState("");
  const [fecha_fin_inscripcion, setFechaFinInscripcion] = useState("");
  const [activeSection, setActiveSection] = useState("nombreEvento");
  const [fechasHoras, setFechasHoras] = useState([{}]);
  const [descripcion, setDescripcion] = useState("");
  const [lugar_evento_dinamico, setLugarEventoDinamico] = useState("");
  const [
    cantidad_participantes_evento_dinamico,
    setCantidadParticipantesEventoDinamico,
  ] = useState("");
  const [requisitosSeleccionados, setRequisitosSeleccionados] = useState([]);
  const [afiche, setAfiche] = useState("");
  const [aficheUrl, setAficheUrl] = useState("");
  const [publico, setPublico] = useState(false);
  const [mensajePublico, setMensajePublico] = useState("Publicar Evento");
  const [sePuedeGuardarEvento, setGuardarEvento] = useState(true);
  //const [seccionesGuardadas, setSeccionesGuardadas] = useState([]);
  const [contadorNombreEvento, setContadorNombreEvento] = useState(0);
  const [contadorTipoEvento, setContadorTipoEvento] = useState(0);
  const [booleanFechaEvento, setBooleanFechaEvento] = useState(false);
  const [contadorDescEvento, setContadorDescEvento] = useState(false);
  const [contadorRequisitos, setContadorRequisitos] = useState(true);
  const [contadorAfiche, setContadorAfiche] = useState(false);
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleStoreEventoDinamico = async (e) => {
    try {
      
      e.preventDefault();
      Swal.fire({
        title: 'Creando Evento...',
        text: 'Espere un momento por favor',
        icon: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
    });
      let ruta = null;
      if (afiche) {
      const formData = new FormData();
      formData.append("image", afiche);
      const responseImage = await axios.post(`${URL_API}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      ruta = responseImage.data.path;
    }
      const responseEvento = await axios.post(
        `${endpoint}/crearEventoDinamico`,
        {
          nombre_evento_dinamico: nombre_evento_dinamico,
          tipo_evento_dinamico_id: tipo_evento_dinamico_id,
          descripcion_evento_dinamico: descripcion,
          lugar_evento_dinamico: lugar_evento_dinamico,
          cantidad_participantes_evento_dinamico:
            cantidad_participantes_evento_dinamico,
          requiere_coach: 0,
         mostrar_publico: publico,
          afiche: ruta,
        }
      );
      const idEvento = responseEvento.data.id;

      const response = await axios.post(`${endpoint}/crearFechaInscripcion`, {
        fecha_inicio_inscripcion: fecha_inicio_inscripcion,
        fecha_fin_inscripcion: fecha_fin_inscripcion,
        evento_dinamicos_id: idEvento,
      });
      const idFechaIns = response.data.id;

      for (const fechaHora of fechasHoras) {
        const fechaInicioEtapa = fechaHora.fecha_inicio_etapa;
        const fechaFinEtapa = fechaHora.fecha_fin_etapa;
        const horaInicioEtapa = fechaHora.hora_inicio;
        const horaFinEtapa = fechaHora.hora_fin;
        const contenidoEtapa = fechaHora.contenido_etapa;

        await axios.post(`${endpoint}/crearEtapaEvento`, {
          fecha_inicio_etapa: fechaInicioEtapa,
          fecha_fin_etapa: fechaFinEtapa,
          hora_inicio_etapa: horaInicioEtapa,
          hora_fin_etapa: horaFinEtapa,
          contenido_etapa: contenidoEtapa,
          etapa_fecha_inscripcion_eventos_id: idFechaIns,
        });
      }

      for (const requisito of requisitosSeleccionados) {
        if (requisito && idEvento) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          try {
            const response = await axios.post(
              `${endpoint}/crearDetalleRequisito`,
              {
                id_evento_dinamico: idEvento,
                id_requisito: requisito,
              }
            );
          } catch (error) {
            console.error("Error al crear detalle de requisito:", error);
          }
        } else {
          console.error("Datos de requisito o evento no válidos");
        }
      }
      console.log("La seccion nombreEvento tiene un valor de");
      console.log(contadorNombreEvento);
      console.log("La seccion tipoEvento tiene un valor de");
      console.log(contadorTipoEvento);
     // navigate("/listaEventos");
      console.log("La seccion FECHA tiene un valor de");
      console.log(booleanFechaEvento);
      console.log("La seccion descripcion tiene un valor de");
      console.log(contadorDescEvento);
      console.log("La seccion REQUISITOS tiene un valor de");
      console.log(contadorRequisitos);
      Swal.fire({
        icon: "success",
        title: "Éxito!",
        text: "El evento se creo correctamente!",
      });
      navigate("/listaEventos");
    } catch (error) {
      if (error.response && error.response.status === 400 || (error.response && error.response.status===500)) {
        Swal.fire({
          icon: "error",
          title: "Verifique los datos ingresados",
          text: "Debe llenar todos los campos requeridos",
        });
      } else {
        console.error("Error inesperado:", error);
      }
    }
  };

  const handleNombreEventoChange = (nombre_evento) => {
    setNombreEventoDinamico(nombre_evento);
  };

  const handleTipoEventoChange = (tipo_evento) => {
    setTipoEventoDinamicoId(tipo_evento);
  };

  const handleFechaInicioInscripcion = (fecha) => {
    setFechaInicioInscripcion(fecha);
  };
  const handleFechaFinInscripcion = (fecha) => {
    setFechaFinInscripcion(fecha);
  };

  const handleFechasHorasChange = (fechas) => {
    setFechasHoras(fechas);
  };

  const handleDescripcion = (descripcion) => {
    setDescripcion(descripcion);
  };

  const handleLugarEventoChange = (lugar) => {
    setLugarEventoDinamico(lugar);
  };
  const handleCantidadParticipanetesEventoChange = (cantidad) => {
    setCantidadParticipantesEventoDinamico(cantidad);
  };

  const handleRequisitosSeleccionados = (requisitos) => {
    console.log(requisitos);
    setRequisitosSeleccionados(requisitos);
  };
  const handlePublicoChange = () => {
    if (publico) {
      setMensajePublico("Publicar Evento");
      setPublico(!publico);
    } else {
      setMensajePublico("Evento Publicado");
      setPublico(!publico);
    }
  };

  const isAuthenticated = localStorage.getItem("token");
  const rol = localStorage.getItem("role");
  const handleAfiche = (afiche) => {
    setAfiche(afiche);
  };

  return (
    <div>
      {isAuthenticated &&
        (rol === "Admin" ? (
          <NavbarAdmin />
        ) : rol === "Creador" ? (
          <NavbarOrganizador />
        ) : null)}
      <div className="mt-5">
        <div className="row">
          <div className="col-md-2 p-0">
            <div className="d-flex flex-column">
              <button
                onClick={() => handleSectionClick("nombreEvento")}
                className={`button mb-2 ${
                  activeSection === "nombreEvento" ? "active" : ""
                }`}
              >
                Nombre Evento
              </button>
              <button
                onClick={() => handleSectionClick("tipoEvento")}
                className={`button mb-2 ${
                  activeSection === "tipoEvento" ? "active" : ""
                }`}
              >
                Tipo Evento
              </button>
              <button
                onClick={() => handleSectionClick("fechasHoras")}
                className={`button mb-2 ${
                  activeSection === "fechasHoras" ? "active" : ""
                }`}
              >
                Fechas y Horas
              </button>
              <button
                onClick={() => handleSectionClick("descripcion")}
                className={`button mb-2 ${
                  activeSection === "descripcion" ? "active" : ""
                }`}
              >
                Descripción
              </button>
              <button
                onClick={() => handleSectionClick("requisitos")}
                className={`button mb-2 ${
                  activeSection === "requisitos" ? "active" : ""
                }`}
              >
                Requisitos
              </button>
              <button
                onClick={() => handleSectionClick("Afiche")}
                className={`button mb-2 ${
                  activeSection === "Afiche" ? "active" : ""
                }`}
              >
                Afiche
              </button>
              <button
                className={publico ? "btn btn-warning" : "btn btn-secondary"}
                onClick={() => handlePublicoChange()}
              >
                {mensajePublico}
              </button>
              <button
                onClick={handleStoreEventoDinamico}
                className="btn btn-success"
                disabled={
                  handleStoreEventoDinamico === undefined ||
                  !contadorNombreEvento>3 ||
                  !contadorTipoEvento === 1 &&
                  !booleanFechaEvento ||
                  !contadorDescEvento ||
                  !contadorRequisitos 
                  
                }
              >
                Guardar
              </button>
              <Link to="/listaEventos" className="btn btn-danger">
                Cancelar
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            {activeSection === "nombreEvento" && (
              <NombreEventoForm
                nombreEvento={nombre_evento_dinamico}
                lugarEvento={lugar_evento_dinamico}
                cantidadParticiapantesEvento={
                  cantidad_participantes_evento_dinamico
                }
                onNombreEventoChange={handleNombreEventoChange}
                onLugarEventoChange={handleLugarEventoChange}
                onCantidadParticipantesChange={
                  handleCantidadParticipanetesEventoChange
                }
                onGuardarEvento={setGuardarEvento}
                contador={contadorNombreEvento}
                onContadorChange={setContadorNombreEvento}
              />
            )}
            {activeSection === "tipoEvento" && (
              <TipoEventoForm
                onTipoEvento={handleTipoEventoChange}
                onValorSeleccionado={tipo_evento_dinamico_id}
                onGuardarEvento={setGuardarEvento}
                contador={contadorTipoEvento}
                onContadorChange={setContadorTipoEvento}
              />
            )}
            {activeSection === "fechasHoras" && (
              <FechasHorasForm
                onFechaInicioInscripcion={handleFechaInicioInscripcion}
                onFechaFinInscripcion={handleFechaFinInscripcion}
                onFechasHorasChange={handleFechasHorasChange}
                FechaInicioIn={fecha_inicio_inscripcion}
                FechaFinIn={fecha_fin_inscripcion}
                FechasHorasNuevo={fechasHoras}
                onGuardarEvento={setGuardarEvento}
                boolean={booleanFechaEvento}
                onBooleanChange={setBooleanFechaEvento}
              />
            )}
            {activeSection === "descripcion" && (
              <DescripcionForm
                onDescripcionChange={handleDescripcion}
                DescripcionIn={descripcion}
                onGuardarEvento={setGuardarEvento}
                contador={contadorDescEvento}
                onContadorChange={setContadorDescEvento}
              />
            )}
            {activeSection === "requisitos" && (
              <RequisitosForm
                onRequisitos={handleRequisitosSeleccionados}
                RequisitosIn={requisitosSeleccionados}
                onGuardarEvento={setGuardarEvento}
                contador={contadorRequisitos}
                onContadorChange={setContadorRequisitos}
              />
            )}
            {activeSection === "Afiche" && (
              <AficheForm
                setInput={handleAfiche}
                input={afiche}
                inputUrl={aficheUrl}
                contador={contadorAfiche}
                onContadorChange={setContadorAfiche}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvento;
