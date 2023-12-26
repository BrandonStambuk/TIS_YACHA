import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Navbar.css';
import './css/fondo.css';
import { NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { URL_API } from '../const';
import Swal from 'sweetalert2';
import Cabecera from './Cabecera';
import user from './images/perfil_nav.png';

const endpoint = `${URL_API}/logout`;

const NavbarAdmin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro de que deseas cerrar sesión?',
        text: 'No podrás revertir esta acción.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('lastActivity');
        logout();
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const isAuthenticated = localStorage.getItem('token');
  const rol = localStorage.getItem('role');
  const nombre = localStorage.getItem('nombre');

  

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
              <NavDropdown title="Eventos" id="nav-dropdown-eventos" className='p-2'>
                <NavDropdown.Item href="/listaEventos">Lista de Eventos</NavDropdown.Item>
                <NavDropdown.Item href="/listaCompetencias">Lista de Competencias</NavDropdown.Item>
                <NavDropdown.Item href="/configuracionEventos">Configuración Eventos</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Usuario" id="nav-dropdown-eventos" className='p-2'>
                <NavDropdown.Item href="/listaUsuarios">Lista de Usuarios</NavDropdown.Item>
                <NavDropdown.Item href="/registerUsuario">Registrar Nuevo Usuario</NavDropdown.Item>
              </NavDropdown>
              <li className="nav-item p-2">
                <a className="nav-link" href="/tabla-noticias">Noticias</a>
              </li>
              <li className='nav-item p-2'>
                <a className='nav-link' href='/reportes'>Reportes</a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <li className="nav-item p-2 d-flex align-items-center">
                  <NavDropdown title={`${nombre} - ${rol}`} id="nav-dropdown-eventos" className="p-2">
                    <NavDropdown.Item href="/perfil">Ver Perfil</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleSignOut}>Cerrar Sesión</NavDropdown.Item>
                  </NavDropdown>
                  <a href="/perfil" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={user}
                      alt='Perfil'
                      style={{ width: '30px', height: '30px', marginLeft: '10px', marginTop: '-1px' }}
                    />
                  </a>
                </li>
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

export default NavbarAdmin;
