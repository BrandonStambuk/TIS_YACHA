import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import "./css/CrearEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { URL_API } from "../const";
import NombreEventoForm from "./NombreEventoForm";
import TipoEventoForm from "./TipoEventoForm";
import FechasHorasForm from "./FechasHorasForm";
import DescripcionForm from "./DescripcionForm";
import Swal from "sweetalert2";
const inputStyle = {
  width: "170px",
  height: "30px",
  fontSize: "14px",
};

const endpoint = `${URL_API}/crearevento`;

const CreateEvento = () => {
  const [nombre_evento, setNombreEvento] = useState("");
  const [tipo_evento, setTipoEvento] = useState("");
  const [fecha_inicio_inscripcion, setFechaInicioIns] = useState("");
  const [fecha_fin_inscripcion, setFechaFinIns] = useState("");
  const [fecha_inicio_evento, setFechaInicioEvent] = useState("");
  const [fecha_fin_evento, setFechaFinEvent] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreEventoError, setNombreEventoError] = useState("");
  const navigate = useNavigate();
  const [fechaInicioError, setFechaInicioError] = useState("");
  const [fechaFinError, setFechaFinError] = useState("");
  const [fechaInicioEventError, setFechaInicioEventError] = useState("");
  const [fechaFinEventError, setFechaFinEventError] = useState("");
  const [horaEventoError, sethoraEventoError] = useState("");
  const [publico, setPublico] = useState(false);
  const handleTipoEventoChange = (event) => {
    setTipoEvento(event.target.value);
  };
  const [file, setFile] = useState(null);
  const [activeSection, setActiveSection] = useState("nombreEvento");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  // Fechas inscripcion ******************

  const handleFechaInicioChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      setFechaInicioError(
        "La fecha de inicio inscripcion debe ser posterior al día de hoy."
      );
    } else {
      setFechaInicioError("");
    }

    setFechaInicioIns(event.target.value);
  };
  const handleFechaFinChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const startDate = new Date(fecha_inicio_inscripcion); // Convierte la fecha de inicio a objeto Date

    if (selectedDate < startDate) {
      setFechaFinError(
        "La fecha de fin no puede ser anterior a la fecha de inicio."
      );
    } else {
      setFechaFinError("");
    }

    setFechaFinIns(event.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Fechas Evento ******************

  const handleFechaInicioEventChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const startDate = new Date(fecha_fin_inscripcion);
    if (selectedDate <= startDate) {
      setFechaInicioEventError(
        "La fecha de inicio debe ser posterior al día de hoy."
      );
    } else {
      setFechaInicioEventError("");
    }

    setFechaInicioEvent(event.target.value);
  };
  const handleFechaFinEventChange = (event) => {
    const selectedDate = new Date(event.target.value); // Convierte la fecha de inicio a objeto Date
    const startDate = new Date(fecha_fin_inscripcion);
    if (selectedDate < startDate) {
      setFechaFinEventError(
        "La fecha de fin no puede ser anterior a la fecha de inicio."
      );
    } else {
      setFechaFinEventError("");
    }

    setFechaFinEvent(event.target.value);
  };
  const handleUpload = async (id) => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    let fileName = id + ".jpg";
    const formData = new FormData();
    formData.append("image", file, fileName);

    try {
      const response = await axios.post(`${URL_API}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHorasChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue !== "0") {
      if (!/^(0|[1-9][0-9]*)$/.test(inputValue)) {
        sethoraEventoError("El valor no puede empezar con 0");
      } else if (inputValue.length <= 3) {
        setHora(inputValue);
        sethoraEventoError(null);
      } else {
        sethoraEventoError("No se permiten más de 3 caracteres.");
      }
    } else {
      sethoraEventoError("No se permiten 0 horas.");
    }
  };

  const store = async (e) => {
    e.preventDefault();
    const selectedStartDate = new Date(fecha_inicio_inscripcion);
    const selectedEndDate = new Date(fecha_fin_inscripcion);
    const currentDate = new Date();
    let todosErrores = [];
    // Validación del nombre del evento
    if (
      !nombre_evento ||
      !tipo_evento ||
      !fecha_inicio_inscripcion ||
      !fecha_fin_inscripcion ||
      !fecha_inicio_evento ||
      !fecha_fin_evento ||
      !hora ||
      !descripcion
    ) {
      Swal.fire("Ingrese todos los datos!");
      return;
    }
    let errores = [];
    if (!/^[A-Z]/.test(nombre_evento)) {
      errores.push("El primer carácter debe ser una letra mayúscula.");
    }

    if (!/^[A-Za-z\- ]+$/.test(nombre_evento)) {
      errores.push("Solo están permitidos letras, espacios y guiones.");
    }

    if (nombre_evento.length > 21) {
      errores.push("No se permiten más de 21 caracteres.");
    }

    if (errores.length > 0) {
      setNombreEventoError(errores.join(" "));
      todosErrores.push(errores);
    } else {
      setNombreEventoError("");
    }
    if (selectedStartDate <= currentDate) {
      setFechaInicioError(
        "La fecha de inicio debe ser posterior al día de hoy."
      );
      todosErrores.push("La fecha de inicio debe ser posterior al día de hoy.");
    } else {
      setFechaInicioError("");
    }
    if (selectedEndDate < selectedStartDate) {
      setFechaFinError(
        "La fecha de fin no puede ser anterior a la fecha de inicio."
      );
      todosErrores.push(
        "La fecha de fin no puede ser anterior a la fecha de inicio."
      );
    } else {
      setFechaFinError("");
    }
    if (todosErrores.length === 0) {
      let response = await axios.post(endpoint, {
        nombre_evento: nombre_evento,
        tipo_evento: tipo_evento,
        fecha_inicio_inscripcion: fecha_inicio_inscripcion,
        fecha_fin_inscripcion: fecha_fin_inscripcion,
        fecha_inicio_evento: fecha_inicio_evento,
        fecha_fin_evento: fecha_fin_evento,
        hora: hora,
        publico: publico,
        descripcion: descripcion,
      });
      handleUpload(response.data.id);
      navigate("/ListaEventos");
    }
  };
  // Estados para el tamaño de fuente y la alineación del texto
  const [fontSize, setFontSize] = useState(16); // Tamaño de fuente inicial
  const [textAlign, setTextAlign] = useState("left"); // Alineación inicial

  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  const handleTextAlignChange = (alignment) => {
    setTextAlign(alignment);
  };

  const buttonImageStyle = {
    maxWidth: "24px",
    maxHeight: "24px",
  };

  return (
    <div>
      <NavbarAdmin />
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
                className={`button mb-2${
                  activeSection === "descripcion" ? "active" : ""
                }`}
              >
                Descripción
              </button>
           
            </div>
          </div>
          <div className="col-md-6">
            {activeSection === "nombreEvento" && (
              <NombreEventoForm
                nombre_evento={nombre_evento}
                setNombreEvento={setNombreEvento}
                nombreEventoError={nombreEventoError}
                store={store}
                inputStyle={inputStyle}
              />
            )}
            {activeSection === "tipoEvento" && (
              <TipoEventoForm
                tipo_evento={tipo_evento}
                handleTipoEventoChange={handleTipoEventoChange}
              />
            )}
            {activeSection === "fechasHoras" && (
              <FechasHorasForm
                fechaInicioError={fechaInicioError}
                fechaFinError={fechaFinError}
                fechaInicioEventError={fechaInicioEventError}
                fechaFinEventError={fechaFinEventError}
                fecha_inicio_inscripcion={fecha_inicio_inscripcion}
                fecha_fin_inscripcion={fecha_fin_inscripcion}
                fecha_inicio_evento={fecha_inicio_evento}
                fecha_fin_evento={fecha_fin_evento}
                hora={hora}
                horaEventoError={horaEventoError}
                publico={publico}
                handleFechaInicioChange={handleFechaInicioChange}
                handleFechaFinChange={handleFechaFinChange}
                handleFechaInicioEventChange={handleFechaInicioEventChange}
                handleFechaFinEventChange={handleFechaFinEventChange}
                handleHorasChange={handleHorasChange}
                setPublico={setPublico}
                store={store}
              />
            )}
            {activeSection === "descripcion" && (
              <DescripcionForm
                descripcion={descripcion}
                fontSize={fontSize}
                textAlign={textAlign}
                handleFontSizeChange={handleFontSizeChange}
                handleTextAlignChange={handleTextAlignChange}
                setDescripcion={setDescripcion}
                handleFileChange={handleFileChange}
                navigate={navigate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvento;