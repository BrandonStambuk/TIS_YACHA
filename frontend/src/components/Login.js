import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./css/Navbar.css";
import "./css/fondo.css";
import Navbar from "./Navbar";
import "./css/Login.css";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMessage("Correo no válido");
      return;
    }
    if (email === "admin@gmail.com" && password === "admin") {
      setMessage("Inicio de sesión exitoso como administrador");
      // Redirigir
    } else {
      setMessage("Los datos no pertenecen a ningún administrador");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container login">
        <div className="heading">Iniciar Sesion  ICPC UMSS</div>
        <form onSubmit={handleSubmit} className="form">
          <input
            required=""
            className="input"
            name="email"
            id="email"
            placeholder="Ingrese nombre de usuario"
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
          <span className="forgot-password">
            {message && <span style={{ color: "red" }}>{message}</span>}
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