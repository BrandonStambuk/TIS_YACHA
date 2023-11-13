import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin  from "./NavbarAdmin";
import { URL_API } from '../const';
import "./css/RegistroUsuario.css";

const endpoint = `${URL_API}/registerEquipo`;

const RegistroEquipo= () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [idCard, setIdCard] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
 
  };

  return (
    <div>
      <NavbarAdmin/>
      <div className="container register">
        <div className="heading_register">Registro de Equipo</div>
        <form action="" className="form" onSubmit={handleRegistro}>
          <div className="row">
              <input
                required
                className="input"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Nombre del Equipo"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
           
          </div>
          <div className="row">
          <div className="col-md-4">
              <input
                required
                className="input"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Nombre Completo"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                required
                className="input"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Correo"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                required
                className="input"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Carrera"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
  
          <input
            required
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="register-button" type="submit" value="Registrar" />
          {error && <div className="error-message">{error}</div>}
          <label>Credenciales no validas.</label>
        </form>
        <span className="agreement"></span>
      </div>
    </div>
  );
};

export default RegistroEquipo;
