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
import Register from './components/Register';
import MostrarEventoUsuario from './components/MostrarEventoUsuario';
import MostarCompe from './components/ListaCompetencias'
import CrearEquipo from './components/RegistrarEquipo'
import EditComp from './components/EditComp';
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
          <Route path='/createCompe' element={isAuthenticated ? <CreateCompe/>:<Login/>}/>   
          <Route path='/editCompetencia/:id' element={isAuthenticated ? <EditComp/>:<Login/>}/>
          <Route path='/edit/:id' element={isAuthenticated ? <EditEvento /> : <Login />} /> 
          <Route path='/listaCompetencias' element={isAuthenticated ? <MostarCompe/>:<Login/>}/>

          
          <Route path="/home" element={isAuthenticated ? <ListaEventos/>: <HomePageUser/>} />
          <Route path='/editComp' element={isAuthenticated ? <EditComp/> : <Login />} />    
          <Route path="/mostrar/:id" element={isAuthenticated ? <ListaEventos/>: <MostrarEventoUsuario/>} />    
          <Route path="/listaEventos" element={isAuthenticated ? <ListaEventos/>: <Login/>} />  
          <Route path="/inicio" element={isAuthenticated ? <ListaEventos/>: <QueEsICPC/>} />    
          <Route path="/crearafiche" element={isAuthenticated ? <CrearAfiche/>: <Login/>}/>
          <Route path="/login" element={<Login/>}/> 
          <Route path="/registroEvento/:id" element={isAuthenticated ? <ListaEventos/>: <RegistroEvento/>} />    
          <Route path="/signout" element={<SignOut />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/createEquipo" element={isAuthenticated ? <CrearEquipo/>: <Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
