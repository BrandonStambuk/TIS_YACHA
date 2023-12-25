import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Navbar.css';
import './css/fondo.css';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Cabecera from './Cabecera'; // Importa el componente Cabecera

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <div>
      <Cabecera></Cabecera>
      
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item p-2">
                
                <Link to="/home" className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item p-2">
                <Link to="/inicio" className="nav-link">Eventos</Link>
              </li>            
            </ul>
            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <li className="nav-item p-2"><Link to="/signout" className="nav-link">Cerrar Sesión</Link></li>
              ) : (
                <li className="nav-item p-2"><Link to="/login" className="nav-link">Iniciar Sesión</Link></li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ backgroundColor: 'RGB(242, 183, 5)', height: '7px' }}></div>
    </div>
  );
};

export default Navbar;