import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from '../components/AuthContext';  // Importa el contexto de autenticación
import "bootstrap/dist/css/bootstrap.css";
import "./css/Navbar.css";
import "./css/fondo.css";
import Navbar from "./Navbar";
import "./css/Login.css";
import axios from "axios";
import { URL_API } from '../const';

const endpoint = `${URL_API}/register`; // Asegúrate de que esta sea la URL correcta de tu backend
//const cors = require("cors");


const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(endpoint, {
        name: name, 
        email: email,
        password: password, 
      });
      navigate('/login');

    } catch (error) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container login">
        <div className="heading">Iniciar Sesion ICPC UMSS</div>
        <form action="" className="form" onSubmit={handleLogin}>
          <input
            required=""
            className="input"
            type="text"
            name="name"
            id="name"
            placeholder="Ingrese nombre de usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required=""
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="Ingrese email usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required=""
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="login-button" type="submit" value="Registrarse" />
          {error && <div className="error-message">{error}</div>}
          <label>Si olvidaste la contraseña, contacta a la empresa.</label>
        </form>
        <span className="agreement"></span>
      </div>
    </div>
  );
};

export default Login;
