import React from 'react';
import { useAuth } from './AuthContext'; // Importa el contexto de autenticación
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { URL_API } from './const';

const endpoint = `${URL_API}/logout`;

const SignOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      // Realiza una solicitud al backend para revocar el token
      //await axios.post(endpoint, {

        // Puedes enviar cualquier información adicional que tu backend necesite
      //});

      // Luego, llama a la función de cierre de sesión del contexto
      localStorage.removeItem('token');
      logout();
      navigate('/');
      window.location.reload();
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Maneja errores si es necesario
    }
  };

  return (
    <div>
      <h2>¿Estás seguro de que deseas cerrar sesión?</h2>
      <button onClick={handleSignOut}>Cerrar Sesión</button>

    </div>
  );
};

export default SignOut;
