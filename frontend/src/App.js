import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import ListaEventos from './components/ListaEventos';
import HomePageUser from './components/HomePageUser';
import CreateEvento from './components/CreateEvent';
import CreateCompe from './components/CreateCompe';
import EditComp from './components/EditComp';
import EditEvento from './components/EditEvent';
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

function App() {
  const isAuthenticated = localStorage.getItem('token');
  const rol = localStorage.getItem('role');

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
          <Route path='/create' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <CreateEvento /> : <Login />} /> 
          <Route path='/createCompe' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <CreateCompe/>:<Login/>}/>   
          <Route path='/editCompetencia/:id' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <EditComp/>:<Login/>}/>
          <Route path='/edit/:id' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <EditEvento /> : <Login />} /> 
          <Route path='/listaCompetencias' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador') ? <MostarCompe/>:<Login/>}/>
          <Route path="/home" element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <ListaEventos/>: <HomePageUser/>} />
          <Route path='/editComp' element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <EditComp/> : <Login />} />    
          <Route path="/mostrar/:id" element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <ListaEventos/>: <MostrarEventoUsuario/>} />    
          <Route path="/listaEventos" element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <ListaEventos/>: <Login/>} />  
          <Route path="/inicio" element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <ListaEventos/>: <QueEsICPC/>} />    
          <Route path="/crearafiche" element={isAuthenticated && (rol === 'Admin' || rol === 'Creador')? <CrearAfiche/>: <Login/>}/>
          <Route path="/login" element={<Login/>}/> 
          <Route path="/registroEvento/:id" element={isAuthenticated ? <ListaEventos/>: <RegistroEvento/>} />    
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
                  <RegistroEquipo />
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
                  <RegisterUsuario />
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

export default App;