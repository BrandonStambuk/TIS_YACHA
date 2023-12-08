import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import { URL_API } from '../const';
import "./css/RegistroUsuario.css";

const endpoint = `${URL_API}/register`;

const RegistroUsuario = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateName = (name) => /^[a-zA-Z]{1,30}$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (!validateName(firstName) || !validateName(lastName)) {
      setError("Los nombres deben contener solo letras y tener un máximo de 30 caracteres.");
      return;
    }

    if (!validateEmail(email)) {
      setError("El formato del correo electrónico es inválido.");
      return;
    }

    try {
      const response = await axios.post(endpoint, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        password: password,
      });
      navigate('/login');

    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        if (validationErrors && validationErrors.email) {
          setError(validationErrors.email[0]);
        } else {
          setError("Hubo un error en la validación. Inténtalo de nuevo.");
        }
      } else {
        setError("Hubo un error. Inténtalo de nuevo.");
      }
    }
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value) && value.length <= 30) {
      setFirstName(value);
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value) && value.length <= 30) {
      setLastName(value);
    }
  };

  return (
    <div>
      <NavbarAdmin />
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
                placeholder="Nombre"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="col-md-6">
              <input
                required
                className="input"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Apellido"
                value={lastName}
                onChange={handleLastNameChange}
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
        </form>
        <span className="agreement"></span>
      </div>
    </div>
  );
};

export default RegistroUsuario;
