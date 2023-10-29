import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEvento from './components/CreateEvent';
import ListaEventos from './components/ListaEventos';
import EditEvento from './components/EditEvent';
import HomePage from './components/HomePage';
import QueEsICPC from './components/QueEsICPC';
import CrearAfiche from './components/CrearAfiche';
import Login from './components/Login';
import RegistroEvento from './components/RegistroEvento';
import HomePageUser from './components/HomePageUser';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <HomePageUser/>} />
          <Route path='/create' element={ <CreateEvento/>} />
          <Route path='/edit/:id' element={ <EditEvento/>} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/home" element={<HomePageUser />} />
          <Route path="/listaEventos" element={<ListaEventos/>} />
          <Route path="/inicio" element={<QueEsICPC/>} />
          <Route path="/crearafiche" element={<CrearAfiche/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/registroEvento/:id' element={<RegistroEvento/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
