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


const endpoint = `${URL_API}/login`; // Asegúrate de que esta sea la URL correcta de tu backend
//const cors = require("cors");


const Login = () => {
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
        email: email, 
        password: password, 
      });
      const token = response.data.token;
      const id=response.data.user_id;
      localStorage.setItem('token', token);
      localStorage.setItem('id',id);
      //setIsAuthenticated(true);
      const currentPath = window.location.pathname;

    // Comprobar si la ruta actual es "ListaEventos"
    /*if (currentPath === '/listaEventos') {
      // Recargar la página si estamos en "ListaEventos"
      window.location.reload();
    } else {
      // Navegar a la ruta "ListaEventos" si no estamos en esa página
      navigate('/listaEventos');
    }*/
    navigate('/listaEventos');
    window.location.reload();

    } catch (error) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container login">
        <div className="heading">Iniciar Sesion: ICPC-UMSS</div>
        <form action="" className="form" onSubmit={handleLogin}>
          <input
            required=""
            className="input"
            type="text"
            name="name"
            id="name"
            placeholder="Ingrese email"
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
          <input className="login-button" type="submit" value="Iniciar Sesion" />
          {error && <div className="error-message">{error}</div>}
          <label>Si olvidaste la contraseña, contacta a la empresa.</label>
        </form>
        <span className="agreement"></span>
      </div>
    </div>
  );
};

export default Login;
