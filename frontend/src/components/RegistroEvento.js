import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./css/RegistroEvento.css";
import "bootstrap/dist/css/bootstrap.min.css";
import imagen1 from "../components/images/mi_afiche.png";
import Swal from 'sweetalert2'; 
const endpoint = "http://localhost:8000/api/crearusuario";

const RegistroEvento = () => {
  const [nombre_usuario, setNombreUsuario] = useState("");
  const [correo_electronico, setCorreo] = useState("");
  const [institucion, setInstitucion] = useState("UMSS");
  const [otraInstitucion, setOtraInstitucion] = useState("");
  const [telefono, setCelular] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [evento_id, setId_evento] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [correoError, setCorreoError] = useState("");
  const [institucionError, setInstitucionError] = useState("");
  const [otraInstitucionError, setOtraInstitucionError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [fechaNacimientoError, setFechaNacimientoError] = useState("");
  const navigate = useNavigate();
  const allowedEmailDomains = ['outlook.com', 'gmail.com', 'hotmail.com', 'yahoo.com'];
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  useEffect(() => {
    setId_evento(window.location.href.split("/")[4]);
  }, []);

  const handleCorreoChange = (e) => {
    if (e.target.value.split('@')[0].length <= 60) {
      setCorreo(e.target.value);
    }
  };

  const handleFechaNacimientoChange = (e) => {
    const inputDate = e.target.value;
    const currentYear = new Date().getFullYear();
    const selectedYear = new Date(inputDate).getFullYear();

    // Validación de la fecha de nacimiento
    if (selectedYear < 1980 || selectedYear > 2006) {
      // Muestra un mensaje de error si el año está fuera del rango permitido
      setFechaNacimientoError("El año de nacimiento debe estar entre 1980 y 2006.");
    } else {
      // Si la fecha es válida, elimina el mensaje de error
      setFechaNacimientoError("");
      setFechaNacimiento(inputDate);
    }
  };

  const store = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Validación del nombre
    if (!/^[A-Za-z\s]{5,}$/.test(nombre_usuario)) {
      setNombreError(
        "El nombre debe tener al menos 5 caracteres y contener solo letras y espacios."
      );
      isValid = false;
    } else {
      setNombreError("");
    }

    // Validación del número de teléfono
    if (telefono.length < 8) {
      setTelefonoError("El número de celular no puede ser menor a los 8 dígitos");
      isValid = false;
    } else {
      setTelefonoError("");
    }

    // Validación del correo electrónico (formato básico)
    if (!/^\S+@\S+\.(com|es|org)$/i.test(correo_electronico)) {
      setCorreoError("El correo electrónico debe tener un formato válido (ejemplo: usuario@dominio.com, usuario@dominio.es, usuario@dominio.org).");
      isValid = false;
    } else {
      // Verifica el dominio del correo electrónico
      const emailParts = correo_electronico.split('@');
      const emailDomain = emailParts[1];

      if (!allowedEmailDomains.includes(emailDomain)) {
        setCorreoError("Solo se permiten correos con los dominios: outlook.com, gmail.com, hotmail.com, yahoo.com.");
        isValid = false;
      }
    }

    // Validación de la institución
    if (institucion === "Otro") {
      if (otraInstitucion.trim() === "") {
        setInstitucionError("La institución es obligatoria si seleccionas 'Otro'.");
        isValid = false;
      } else if (specialChars.test(otraInstitucion)) {
        setOtraInstitucionError("No se permiten caracteres especiales.");
        isValid = false;
      } else {
        setInstitucionError("");
        setOtraInstitucionError("");
      }
    }

    // Resto de validaciones para otros campos (fecha de nacimiento) sin mensajes de error
    // ...

    if (isValid) {
      await axios.post(endpoint, {
        nombre_usuario: nombre_usuario,
        correo_electronico: correo_electronico,
        institucion: institucion === "Otro" ? otraInstitucion : institucion,
        telefono: telefono,
        fecha_nacimiento: fecha_nacimiento,
        evento_id: evento_id,
      });
      navigate("/home");
      Swal.fire('Registro Exitoso', 'Tu registro se ha completado con éxito', 'success')
      .then(() => {
        navigate("/home");
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <img
              src={imagen1}
              alt="Afiche de Evento"
              className="img-fluid h-100"
            />
          </div>
          <div className="col-md-6">
            <div className="card card-custom p-4">
              <h2 className="text-center mb-4 heading">Registro</h2>
              <form onSubmit={store} className="form textForm">
                <div className="mb-3">
                  <label htmlFor="nombreCompleto" className="form-label">
                    Nombre Completo
                  </label>
                  <input
                    required
                    value={nombre_usuario}
                    onChange={(e) => {
                      if (e.target.value.length <= 80) {
                        setNombreUsuario(e.target.value);
                      }
                    }}
                    type="text"
                    className="form-control input"
                    id="nombreCompleto"
                    placeholder="Nombre Completo"
                  />
                  {nombreError && (
                    <p style={{ fontSize: "13px", color: "red" }}>
                      {nombreError}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo
                  </label>
                  <input
                    required
                    value={correo_electronico}
                    onChange={handleCorreoChange}
                    type="email"
                    className="form-control input"
                    id="correo"
                    placeholder="Correo"
                  />
                  {correoError && (
                    <p style={{ fontSize: "13px", color: "red" }}>
                      {correoError}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="institucion" className="form-label">
                    Institución
                  </label>
                  <select
                    value={institucion}
                    onChange={(e) => {
                      if (e.target.value === "Otro") {
                        setInstitucion("Otro");
                      } else {
                        setInstitucion(e.target.value);
                      }
                    }}
                    className="form-select input"
                    id="institucion"
                    style={{ fontSize: "14px"}}
                  >
                    <option value="Universidad Mayor de San Simón">Universidad Mayor de San Simón</option>
                    <option value="Universidad Privada Boliviana">Universidad Privada Boliviana</option>
                    <option value="Universidad Domingo Savio">Universidad Domingo Savio</option>
                    <option value="Universidad Católica Boliviana">Universidad Católica Boliviana</option>
                    <option value="Otro">Otro</option>
                  </select>
                  {institucion === "Otro" && (
                    <input
                      value={otraInstitucion}
                      onChange={(e) => setOtraInstitucion(e.target.value.substring(0, 100))}
                      type="text"
                      className="form-control input"
                      id="otraInstitucion"
                      placeholder="Escribe tu institución"
                    />
                  )}
                  {institucionError && (
                    <p style={{ fontSize: "13px", color: "red" }}>
                      {institucionError}
                    </p>
                  )}
                  {otraInstitucionError && (
                    <p style={{ fontSize: "13px", color: "red" }}>
                      {otraInstitucionError}
                    </p>
                  )}
                </div>
                <div className="mb-3 row">
                  <div className="col">
                    <label htmlFor="celular" className="form-label">
                      Celular
                    </label>
                    <input
                      required
                      value={telefono}
                      onChange={(e) => {
                        const inputPhone = e.target.value;
                        if (/^[67]\d{0,7}$/.test(inputPhone)) {
                          setCelular(inputPhone);
                        }
                      }}
                      type="tel"
                      className="form-control input"
                      id="celular"
                      placeholder="Celular"
                    />
                    {telefonoError && (
                      <p style={{ fontSize: "13px", color: "red" }}>
                        {telefonoError}
                      </p>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="fechaNacimiento" className="form-label">
                      Fecha de Nacimiento
                    </label>
                    <input
                      required
                      value={fecha_nacimiento}
                      onChange={handleFechaNacimientoChange}
                      type="date"
                      className="form-control input"
                      id="fechaNacimiento"
                      placeholder="Fecha de Nacimiento"
                    />
                    {fechaNacimientoError && (
                      <p style={{ fontSize: "13px", color: "red" }}>
                        {fechaNacimientoError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn register-button">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroEvento;
