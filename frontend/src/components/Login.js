import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./css/Navbar.css";
import "./css/fondo.css";
import Navbar from "./Navbar";
import "./css/Login.css";

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="heading">Iniciar Sesion  ICPC UMSS</div>
        <form action="" className="form">
          <input
            required=""
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="Ingrese nombre de usuario"
          />
          <input
            required=""
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
          />
          <span className="forgot-password">
            
          </span>
          <input className="login-button" type="submit" value="Iniciar Sesion" />
          <label>Si olvido la contraseña contactese a la empresa</label>
        </form>
        <span className="agreement">
        </span>
      </div>
    </div>
  );
};

export default Login;