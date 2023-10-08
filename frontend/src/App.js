import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
//se importa el componente
import CreateEvento from './components/CreateEvent';
import ListaEventos from './components/ListaEventos';
//import CreateEmployee from './components/CreateEmployee';
import EditEvento from './components/EditEvent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ListaEventos/>} />
          <Route path='/create' element={ <CreateEvento/>} />
          <Route path='/edit/:id' element={ <EditEvento/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
