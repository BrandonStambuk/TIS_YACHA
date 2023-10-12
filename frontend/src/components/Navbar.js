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
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* Cambia la ruta a "/homepage" */}
                            <li className="nav-item">
                                <Link to="/homepage" className="nav-link">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/inicio" className="nav-link">Que es la ICPC?</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/ListaEventos">Eventos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Competencias</a>
                            </li>

                            {/* <li className="nav-item">
                                <Link to="/crearafiche" className="nav-link">Crear Afiche</Link>
                            </li> */}
                        </ul>
                    </div>
                    <div className="ml-auto">
                        <a className="nav-link" href="#">Iniciar Sesion</a>
                    </div>
                </div>
            </nav>
        );
    }
}

if (document.getElementById('navbar')) {
    ReactDOM.render(<Navbar />, document.getElementById('navbar'));
}