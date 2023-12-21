import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NombreEventoForm from "./componentesEventoDinamico/NombreEventoForm";
import TipoEventoForm from "./componentesEventoDinamico/TipoEventoForm";
import FechasHorasForm from "./componentesEventoDinamico/FechasHorasForm";
import DescripcionForm from "./componentesEventoDinamico/DescripcionForm";
import RequisitosForm from "./componentesEventoDinamico/RequisitosForm";
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
  const [cantidad_participantes_evento_dinamico, setCantidadParticipantesEventoDinamico] = useState("");
  const [requisitosSeleccionados, setRequisitosSeleccionados] = useState([]);
  const [afiche, setAfiche] = useState("");
  const [aficheUrl, setAficheUrl] = useState("");
  const [fechasHorasInit, setFechasHorasInit] = useState([{}]);
  const [rutaInit, setRutaInit] = useState(null);
  const [requisitosInit, setRequisitosInit] = useState([{}]);
  const navigate = useNavigate();
  const { id } = useParams();



  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await axios.get(`${endpoint}/eventosDinamicos/${id}`);
        console.log(response.data);
        setNombreEventoDinamico(response.data.nombre_evento_dinamico);
        setTipoEventoDinamicoId(response.data.tipo_evento_dinamico_id);
        setLugarEventoDinamico(response.data.lugar_evento_dinamico);
        setDescripcion(response.data.descripcion_evento_dinamico);
        setCantidadParticipantesEventoDinamico(response.data.cantidad_participantes_evento_dinamico);
        setFechaInicioInscripcion(response.data.fecha_inscripcion_evento[0].fecha_inicio_inscripcion);
        setFechaFinInscripcion(response.data.fecha_inscripcion_evento[0].fecha_fin_inscripcion);
        setRutaInit(response.data.afiche);
        const fechasHorasArray = response.data.fecha_inscripcion_evento[0].etapa_evento.map(etapa => ({
          id: etapa.id,
          contenido_etapa: etapa.contenido_etapa,
          fecha_fin_etapa: etapa.fecha_fin_etapa,
          fecha_inicio_etapa: etapa.fecha_inicio_etapa,
          hora_fin: etapa.hora_fin_etapa,
          hora_inicio: etapa.hora_inicio_etapa,
        }));
        setFechasHoras(fechasHorasArray);
        setFechasHorasInit(fechasHorasArray);
        const requisitosArray = response.data.detalle_requisitos.map(requisito => requisito.id_requisito);
        setRequisitosInit(response.data.detalle_requisitos)
        console.log(response.data.detalle_requisitos)

        setRequisitosSeleccionados(requisitosArray);
        try {
          const responsePath = await axios.get(`${endpoint}/getImage/${id}`);
          setAficheUrl(getEventoImage(responsePath.data.path));
        } catch (error) {
          setAficheUrl("");
        }
      } catch (error) {
        console.error('Error al obtener los datos del evento:', error);
      }
    };
    getEventById();
  }, []);

  const getEventoImage = (name) => {
    try {
      return require(`../../../BackendICPC/storage/app/public/${name}`);
    } catch (err) {
      return null;
    }
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleUpdateEventoDinamico = async (e) => {
    e.preventDefault();
    let ruta = null;
    if (afiche) {
      const formData = new FormData();
      formData.append('image', afiche);
      const responseImage = await axios.post(`${URL_API}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      ruta = responseImage.data.path;
    }

    const responseEvento = await axios.put(`${endpoint}/actualizarEventoDinamico/${id}`, {
      nombre_evento_dinamico: nombre_evento_dinamico,
      tipo_evento_dinamico_id: tipo_evento_dinamico_id,
      descripcion_evento_dinamico: descripcion,
      lugar_evento_dinamico: lugar_evento_dinamico,
      cantidad_participantes_evento_dinamico: cantidad_participantes_evento_dinamico,
      afiche: ruta
    });

    const idEvento = responseEvento.data.id;

    const response = await axios.put(`${endpoint}/actualizarFechaInscripcion/${id}`, {
      fecha_inicio_inscripcion: fecha_inicio_inscripcion,
      fecha_fin_inscripcion: fecha_fin_inscripcion,
      evento_dinamicos_id: idEvento
    });
    const idFechaIns = response.data.id;
    if (fechasHoras.length >= fechasHorasInit.length) {
      for (const fechaHora of fechasHoras) {
        const fechaEtapaId = fechaHora.id;
        const fechaInicioEtapa = fechaHora.fecha_inicio_etapa;
        const fechaFinEtapa = fechaHora.fecha_fin_etapa;
        const horaInicioEtapa = fechaHora.hora_inicio;
        const horaFinEtapa = fechaHora.hora_fin;
        const contenidoEtapa = fechaHora.contenido_etapa;
        if (fechaEtapaId === undefined) {
          await axios.post(`${endpoint}/crearEtapaEvento`, {
            fecha_inicio_etapa: fechaHora.fecha_inicio_etapa,
            fecha_fin_etapa: fechaHora.fecha_fin_etapa,
            hora_inicio_etapa: fechaHora.hora_inicio,
            hora_fin_etapa: fechaHora.hora_fin,
            contenido_etapa: fechaHora.contenido_etapa,
            etapa_fecha_inscripcion_eventos_id: idFechaIns
          });
          continue;
        } else {
          await axios.put(`${endpoint}/actualizarEtapaEvento/${fechaEtapaId}`, {
            fecha_inicio_etapa: fechaInicioEtapa,
            fecha_fin_etapa: fechaFinEtapa,
            hora_inicio_etapa: horaInicioEtapa,
            hora_fin_etapa: horaFinEtapa,
            contenido_etapa: contenidoEtapa,
            etapa_fecha_inscripcion_eventos_id: idFechaIns
          });
        }
      }
    } else {
      for (let i = 0; i < fechasHorasInit.length; i++) {
        const fechaHora = fechasHoras[i];

        if (fechaHora === undefined) {
          await axios.delete(`${endpoint}/eliminarEtapaEvento/${fechasHorasInit[i].id}`);
          continue;
        } else {
          const fechaEtapaId = fechaHora.id;
          const fechaInicioEtapa = fechaHora.fecha_inicio_etapa;
          const fechaFinEtapa = fechaHora.fecha_fin_etapa;
          const horaInicioEtapa = fechaHora.hora_inicio;
          const horaFinEtapa = fechaHora.hora_fin;
          const contenidoEtapa = fechaHora.contenido_etapa;
          await axios.put(`${endpoint}/actualizarEtapaEvento/${fechaEtapaId}`, {
            fecha_inicio_etapa: fechaInicioEtapa,
            fecha_fin_etapa: fechaFinEtapa,
            hora_inicio_etapa: horaInicioEtapa,
            hora_fin_etapa: horaFinEtapa,
            contenido_etapa: contenidoEtapa,
            etapa_fecha_inscripcion_eventos_id: idFechaIns
          });
        }
      }
    }
    console.log(requisitosInit)
    if (requisitosInit.length >= requisitosSeleccionados.length) {
      for (let i = 0; i < requisitosInit.length; i++) {
        const requisito = requisitosSeleccionados[i];
        const idDetalleRequisito = requisitosInit[i].id;
        if (requisito !== undefined) {
          await axios.put(`${endpoint}/actualizarDetalleRequisito/${idDetalleRequisito}`, {
            id_evento_dinamico: idEvento,
            id_requisito: requisito
          });
        } else {
          await axios.delete(`${endpoint}/eliminarDetalleRequisito/${idDetalleRequisito}`);
        }

      }
    } else {
      for (let i = 0; i < requisitosSeleccionados.length; i++) {
        const isRequisito = requisitosInit[i];

        if (isRequisito) {
          const requisito = requisitosSeleccionados[i];
          const idDetalleRequisito = requisitosInit[i].id;
          await axios.put(`${endpoint}/actualizarDetalleRequisito/${idDetalleRequisito}`, {
            id_evento_dinamico: idEvento,
            id_requisito: requisito
          });
        } else {
          const requisito = requisitosSeleccionados[i];
          await axios.post(`${endpoint}/crearDetalleRequisito`, {
            id_evento_dinamico: idEvento,
            id_requisito: requisito
          });
        }

      }
    }

    navigate("/listaEventos");
  }

  const handleNombreEventoChange = (nombre_evento) => {
    setNombreEventoDinamico(nombre_evento);
  };

  const handleTipoEventoChange = (tipo_evento) => {
    setTipoEventoDinamicoId(tipo_evento);
  }


  const handleFechaInicioInscripcion = (fecha) => {
    setFechaInicioInscripcion(fecha);
  }
  const handleFechaFinInscripcion = (fecha) => {
    setFechaFinInscripcion(fecha);
  }

  const handleFechasHorasChange = (fechas) => {
    setFechasHoras(fechas);
  }

  const handleDescripcion = (descripcion) => {
    setDescripcion(descripcion);
  }

  const handleLugarEventoChange = (lugar) => {
    setLugarEventoDinamico(lugar);
  }
  const handleCantidadParticipanetesEventoChange = (cantidad) => {
    setCantidadParticipantesEventoDinamico(cantidad);
  }

  const handleRequisitosSeleccionados = (requisitos) => {
    console.log(requisitos);
    setRequisitosSeleccionados(requisitos);
  }
  const handleAfiche = (afiche) => {
    console.log(afiche);
    setAfiche(afiche);
  }

  return (
    <div>
      <NavbarAdmin />
      <div className="mt-5">
        <div className="row">
          <div className="col-md-2 p-0">
            <div className="d-flex flex-column">
              <button
                onClick={() => handleSectionClick("nombreEvento")}
                className={`button mb-2 ${activeSection === "nombreEvento" ? "active" : ""
                  }`}
              >
                Nombre Evento
              </button>
              <button
                onClick={() => handleSectionClick("tipoEvento")}
                className={`button mb-2 ${activeSection === "tipoEvento" ? "active" : ""
                  }`}
              >
                Tipo Evento
              </button>
              <button
                onClick={() => handleSectionClick("fechasHoras")}
                className={`button mb-2 ${activeSection === "fechasHoras" ? "active" : ""
                  }`}
              >
                Fechas y Horas
              </button>
              <button
                onClick={() => handleSectionClick("descripcion")}
                className={`button mb-2${activeSection === "descripcion" ? "active" : ""
                  }`}
              >
                Descripción
              </button>
              <button
                onClick={() => handleSectionClick("requisitos")}
                className={`button mb-2${activeSection === "requisitos" ? "active" : ""
                  }`}
              >
                Requisitos
              </button>
              <button
                onClick={() => handleSectionClick("Afiche")}
                className={`button mb-2${activeSection === "Afiche" ? "active" : ""
                  }`}
              >
                Afiche
              </button>
              <button onClick={handleUpdateEventoDinamico} className='btn btn-success'>Actualizar</button>
              <Link to="/listaEventos" className='btn btn-danger'>Cancelar</Link>
            </div>
          </div>
          <div className="col-md-6">
            {activeSection === "nombreEvento" && (
              <NombreEventoForm
                nombreEvento={nombre_evento_dinamico}
                lugarEvento={lugar_evento_dinamico}
                cantidadParticiapantesEvento={cantidad_participantes_evento_dinamico}
                onNombreEventoChange={handleNombreEventoChange}
                onLugarEventoChange={handleLugarEventoChange}
                onCantidadParticipantesChange={handleCantidadParticipanetesEventoChange}

              />
            )}
            {activeSection === "tipoEvento" && (
              <TipoEventoForm
                onTipoEvento={handleTipoEventoChange}
                onValorSeleccionado={tipo_evento_dinamico_id}
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
              />
            )}
            {activeSection === "descripcion" && (
              <DescripcionForm
                onDescripcionChange={handleDescripcion}
                DescripcionIn={descripcion}
              />
            )}
            {activeSection === "requisitos" && (
              <RequisitosForm
                onRequisitos={handleRequisitosSeleccionados}
                RequisitosIn={requisitosSeleccionados}
              />
            )}
            {activeSection === "Afiche" && (
              <AficheForm
                setInput={handleAfiche}
                input={afiche}
                inputFile={aficheUrl}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvento;