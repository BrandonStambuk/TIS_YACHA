import React from 'react';
import Navbar from './Navbar';
import './css/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from '../components/images/mi_afiche.png';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card card-translucent">
              <h3 className="card-header">Competencia Local UMSS</h3>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <img src={imagen1} alt="Afiche de Evento" />
                  </div>
                  <div className="col-md-6">
                    <div className="event-info">
                      <p className="event-info-text left">Inicio del evento: 15/10/2023</p>
                      <p className="event-info-text left">Descripción: Se está llevando a cabo la primera competencia de programación competitiva ICPC en la Universidad Mayor de San Simón. Ven y demuestra tus habilidades.</p>
                      <p className="event-info-text left">Lugar: Laboratorio 1 del Departamento de Informática</p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-translucent">
              <h3 className="card-header">Eventos Pasados</h3>
              <div className="card-body table-responsive tabla-contenedor">
                <table>
                  <thead>
                    <tr>
                      <th className='text-white'>Nombre</th>
                      <th className='text-white'>Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Evento 1</td>
                      <td>Tipo 1</td>
                    </tr>
                    <tr>
                      <td>Evento 2</td>
                      <td>Tipo 2</td>
                    </tr>
                    <tr>
                      <td>Evento 1</td>
                      <td>Tipo 1</td>
                    </tr>
                    <tr>
                      <td>Evento 2</td>
                      <td>Tipo 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;