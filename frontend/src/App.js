import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext'; // Importa el contexto de autenticación
import { useState } from 'react';
import CreateEvento from './components/CreateEvent';
import CreateCompe from './components/CreateCompe';
import ListaEventos from './components/ListaEventos';
import EditEvento from './components/EditEvent';
import QueEsICPC from './components/QueEsICPC';
import CrearAfiche from './components/CrearAfiche';
import Login from './components/Login';
import RegistroEvento from './components/RegistroEvento';
import HomePageUser from './components/HomePageUser';
import SignOut from './components/SignOut';
import RegisterUsuario from './components/RegistroUsuario';
import MostrarEventoUsuario from './components/MostrarEventoUsuario';
import MostarCompe from './components/ListaCompetencias'
import EditComp from './components/EditComp';
import RegistroEquipo from './components/RegistrarEquipo';
import ListaUsuarios from './components/ListaUsuarios';
function App() {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticated = localStorage.getItem('token');
  //const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isAuthenticated ? <ListaEventos/>: <HomePageUser/>} />   
          <Route path='/create' element={isAuthenticated ? <CreateEvento /> : <Login />} /> 
          <Route path='/create-competence' element={isAuthenticated ? <CreateCompe/>:<Login/>}/>   
          <Route path='/edit-competence/:id' element={isAuthenticated ? <EditComp/>:<Login/>}/>
          <Route path='/edit-event/:id' element={isAuthenticated ? <EditEvento /> : <Login />} /> 
          <Route path='/competence-list' element={isAuthenticated ? <MostarCompe/>:<Login/>}/>
          <Route path="/home" element={isAuthenticated ? <ListaEventos/>: <HomePageUser/>} />
          <Route path='/editComp' element={isAuthenticated ? <EditComp/> : <Login />} />    
          <Route path="/show/:id" element={isAuthenticated ? <ListaEventos/>: <MostrarEventoUsuario/>} />    
          <Route path="/event-list" element={isAuthenticated ? <ListaEventos/>: <Login/>} />  
          <Route path="/what-is-ICPC" element={isAuthenticated ? <ListaEventos/>: <QueEsICPC/>} />    
          <Route path="/crearafiche" element={isAuthenticated ? <CrearAfiche/>: <Login/>}/>
          <Route path="/login" element={<Login/>}/> 
          <Route path="/event-register/:id" element={isAuthenticated ? <ListaEventos/>: <RegistroEvento/>} />    
          <Route path="/signout" element={<SignOut />} />
          <Route path="/user-register" element={isAuthenticated ? <RegisterUsuario/>: <RegisterUsuario />}/>
          <Route path="/team-register" element={isAuthenticated ? <RegistroEquipo/>: <RegistroEquipo/>}/>
          <Route path="/users-list" element={isAuthenticated ? <ListaUsuarios/>: <Login/>} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
