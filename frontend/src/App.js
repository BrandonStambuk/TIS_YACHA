import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext'; // Importa el contexto de autenticación
import { useState } from 'react';
import CreateEvento from './components/CreateEvent';
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
function App() {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticated = localStorage.getItem('token');
  //const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <HomePageUser/>} />   
          <Route path='/create' element={isAuthenticated ? <CreateEvento /> : <Login />} />    
          <Route path='/edit/:id' element={isAuthenticated ? <EditEvento /> : <Login />} />   
          
          <Route path="/home" element={<HomePageUser />} />  
          <Route path="/mostrar/:id" element={<MostrarEventoUsuario />} />
          <Route path="/listaEventos" element={isAuthenticated ? <ListaEventos/>: <Login/>} />  
          <Route path="/inicio" element={<QueEsICPC/>} />    
          <Route path="/crearafiche" element={isAuthenticated ? <CrearAfiche/>: <Login/>}/>
          <Route path="/login" element={<Login/>}/> 
          <Route path='/registroEvento/:id' element={<RegistroEvento/>}/>  
          <Route path="/signout" element={<SignOut />} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
