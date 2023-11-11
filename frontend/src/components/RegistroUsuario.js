import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin  from "./NavbarAdmin";
import { URL_API } from '../const';
import "./css/RegistroUsuario.css";

const endpoint = `${URL_API}/register`;

const RegistroUsuario = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [idCard, setIdCard] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(endpoint, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        idCard: idCard,
        password: password,
      });
      navigate('/login');

    } catch (error) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <NavbarAdmin/>
      <div className="container register">
        <div className="heading_register">Registro de Usuarios</div>
        <form action="" className="form" onSubmit={handleRegistro}>
          <div className="row">
            <div className="col-md-6">
              <input
                required
                className="input"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Primer Nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                required
                className="input"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Segundo Nombre"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <input
            required
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="Email usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            className=""
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option className="gray" value="">Seleccionar Rol</option>
            <option value="Admin">Admin</option>
            <option value="Coach">Coach</option>
            <option value="Creador">Organizador</option>
          </select>
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

export default RegistroUsuario;
