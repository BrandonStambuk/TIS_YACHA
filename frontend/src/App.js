import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider, useAuth } from './components/AuthContext';
import ListaEventos from './components/ListaEventos';
import HomePageUser from './components/HomePageUser';
import CreateEvento from './components/CreateEvent';
import CreateCompe from './components/CreateCompe';
import EditComp from './components/EditComp';
import EditEventoDinamico from './components/EditEventoDinamico';
import MostarCompe from './components/ListaCompetencias';
import QueEsICPC from './components/QueEsICPC';
import CrearAfiche from './components/CrearAfiche';
import Login from './components/Login';
import RegistroEvento from './components/RegistroEvento';
import SignOut from './components/SignOut';
import RegisterUsuario from './components/RegistroUsuario';
import MostrarEventoUsuario from './components/MostrarEventoUsuario';
import CrearEquipo from './components/RegistrarEquipo';
import RegistroEquipo from './components/RegistrarEquipo';
import ListaUsuarios from './components/ListaUsuarios';
import Perfil from './components/Perfil';
import Descripcion from './components/Descripcion';
import Decription from './components/Decription';
import InscripcionEvento from './components/InscripcionEvento';
import { URL_API } from './const';

function App() {
  const isAuthenticated = localStorage.getItem('token');
  const rol = localStorage.getItem('role');
  const endpoint = URL_API;
  useEffect(() => {
    const checkUserActivity = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      const thirtyMinutesInMilliseconds = 30 * 60 * 1000; // 30 minutes in milliseconds

      if (lastActivity) {
        const lastActivityTime = new Date(lastActivity);
        const currentTime = new Date();

        if (currentTime - lastActivityTime > thirtyMinutesInMilliseconds) {
          // No ha habido actividad en los últimos 30 minutos
          // Puedes cerrar la sesión aquí
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('role');
          localStorage.removeItem('tokenExpiration');
          console.log('Sesión cerrada debido a inactividad');
          // Redirige al usuario a la página de inicio de sesión o a donde desees
        }
      }
    };

    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      const expiration = localStorage.getItem('tokenExpiration');

      if (token && expiration) {
        const expirationDate = new Date(expiration);
        const currentDate = new Date();

        if (expirationDate > currentDate) {
          const timeUntilExpiration = expirationDate - currentDate;
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            localStorage.removeItem('tokenExpiration');
            console.log('Sesión expirada');
            // Redirige al usuario a la página de inicio de sesión o a donde desees
          }, timeUntilExpiration);
        }
      }
    };

    // Verifica la expiración del token y la inactividad cada minuto
    const intervalId = setInterval(() => {
      checkTokenExpiration();
      checkUserActivity();
    }, 60000);

    

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  },);

  // Manejador de eventos para establecer la actividad del usuario
  const handleUserActivity = () => {
    // Actualiza la marca de tiempo de la última actividad
    localStorage.setItem('lastActivity', new Date().toString());
  };


  return (
    <div className="App" onMouseMove = {handleUserActivity}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <ListaEventos/>: <HomePageUser/>} />   
          <Route path='/create' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <CreateEvento /> : (rol === 'Coach') ? <HomePageUser/>:<Login />} /> 
          <Route path='/createCompe' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <CreateCompe/>:(rol === 'Coach') ? <HomePageUser/>:<Login />}/>   
          <Route path='/editCompetencia/:id' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <EditComp/>:(rol === 'Coach') ? <HomePageUser/>:<Login />}/>
          <Route path='/edit/:id' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <EditEventoDinamico /> : (rol === 'Coach') ? <HomePageUser/>:<Login />} /> 
          <Route path='/listaCompetencias' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador') ? <MostarCompe/>:(rol === 'Coach') ? <HomePageUser/>:<Login />}/>
          <Route path="/home" element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <ListaEventos/>: <HomePageUser/>} />
          <Route path='/editComp' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <EditComp/> :(rol === 'Coach') ? <HomePageUser/>:<Login />} />    
          <Route path="/mostrar/:id" element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <ListaEventos/>: <MostrarEventoUsuario/>} />    
          <Route path="/listaEventos" element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <ListaEventos/>: (rol === 'Coach') ? <HomePageUser/>:<Login />} />  
          <Route path="/inicio" element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <ListaEventos/>: <QueEsICPC/>} />    
          <Route path="/crearafiche" element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <CrearAfiche/>: (rol === 'Coach') ? <HomePageUser/>:<Login />}/>
          <Route path="/login" element={<Login/>}/> 
          <Route
            path="/registroEvento/:id"
            element={
              isAuthenticated && (rol === 'Admin' || rol === 'Creador') ? (
                <ListaEventos />
              ) : isAuthenticated && rol === 'Coach' ? (
                <InscripcionEvento />
              ) : (
                <VerificarRolInscripcionEvento />
              )
            }
          />
          <Route path="/signout" element={<SignOut />} />
          <Route
            path="/registerUsuario"
            element={
              isAuthenticated ? (
                rol === 'Admin' ? (
                  <RegisterUsuario />
                ) : rol === 'Creador' ? (
                  <ListaEventos/>
                ) : (
                  <HomePageUser />
                )
              ) : (
                <Login />
              )
            }
          />          
          <Route path="/registerEquipo" element={isAuthenticated && (rol === 'Coach')? <RegistroEquipo/>: <Login/>}/>
          <Route
            path="/listaUsuarios"
            element={
              isAuthenticated ? (
                rol === 'Admin' ? (
                  <ListaUsuarios />
                ) : rol === 'Creador' ? (
                  <ListaEventos/>
                ) : (
                  <RegistroEquipo />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route path='/perfil' element={isAuthenticated? <Perfil/>:<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function VerificarRolInscripcionEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const endpoint = URL_API;

  useEffect(() => {
    const obtenerEvento = async () => {
      try {
        const response = await axios.get(`${endpoint}/eventosDinamicos/${id}`);
        setEvento(response.data);
      } catch (error) {
        console.error('Error al obtener el evento:', error);
      }
    };

    obtenerEvento();
  }, [id]);

  if (!evento) {
    return <div>Cargando...</div>;
  }

  // Verifica si el campo requiere_coach es true y si el usuario es coach
  const puedeInscribirse = !evento.requiere_coach;

  return puedeInscribirse ? <InscripcionEvento /> : <Login />;
}

export default App;