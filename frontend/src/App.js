import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
//se importa el componente
import CreateEvento from './components/CreateEvent';
import ListaEventos from './components/ListaEventos';
//import CreateEmployee from './components/CreateEmployee';
import EditEvento from './components/EditEvent';
import HomePage from './components/HomePage';
import QueEsICPC from './components/QueEsICPC';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <HomePage/>} />
          <Route path='/create' element={ <CreateEvento/>} />
          <Route path='/edit/:id' element={ <EditEvento/>} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/listaEventos" element={<ListaEventos/>} />
          <Route path="/inicio" element={<QueEsICPC/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
