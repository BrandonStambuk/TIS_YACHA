import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Navbar.css';
import './css/fondo.css';
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* Cambia la ruta a "/homepage" */}
                            <li className="nav-item p-2">
                                <Link to="/homepage" className="nav-link">Inicio</Link>
                            </li>
                            <li className="nav-item p-2">
                                <Link to="/inicio" className="nav-link">¿Qué es la ICPC?</Link>
                            </li>
                            <li className="nav-item p-2">
                                <a className="nav-link" href="/ListaEventos">Eventos</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item p-2">
                                <a className="nav-link" href="/login">Iniciar sesión</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

if (document.getElementById('navbar')) {
    ReactDOM.render(<Navbar />, document.getElementById('navbar'));
}