import React from 'react';
import Navbar from './Navbar';
import './css/RegistroEvento.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from '../components/images/mi_afiche.png';

const RegistroEvento = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <img src={imagen1} alt="Afiche de Evento" className="img-fluid h-100" />
          </div>
          <div className="col-md-6">
            <div className="card card-custom p-4">
              <h2 className="text-center mb-4 text-white">Registro</h2>
              <form className='text-white'>
                <div className="mb-3">
                  <label htmlFor="nombreCompleto" className="form-label">Nombre Completo</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="nombreCompleto"
                    placeholder="Nombre Completo"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="correo"
                    placeholder="Correo"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="institucion" className="form-label">Institución</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="institucion"
                    placeholder="Institución"
                  />
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="celular" className="form-label">Celular</label>
                      <input
                        required
                        type="telephone"
                        className="form-control"
                        id="celular"
                        placeholder="Celular"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                      <input
                        required
                        type="date"
                        className="form-control"
                        id="fechaNacimiento"
                        placeholder="Fecha de Nacimiento"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Registrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroEvento;
