import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import './css/RegistroEvento.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from '../components/images/mi_afiche.png';

const endpoint = "http://localhost:8000/api/crearusuario";

const RegistroEvento = () => {
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [correo_electronico, setCorreo] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [telefono, setCelular] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [evento_id, setId_evento] = useState('');
  const navigate = useNavigate();

  useEffect( () =>{
    setId_evento(window.location.href.split('/')[4]);
  }  ,[]);

  debugger

  const store = async (e) => {
    e.preventDefault();
    await axios.post(endpoint, {
      nombre_usuario: nombre_usuario,
      correo_electronico: correo_electronico,
      institucion: institucion,
      telefono: telefono,
      fecha_nacimiento: fecha_nacimiento,
      evento_id: evento_id
            
    });
    navigate('/home')
  }
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
              <form onSubmit={store} className='text-white'> {/* es gg*/ }
                <div className="mb-3">
                  <label htmlFor="nombreCompleto" className="form-label">Nombre Completo</label>
                  <input
                    required
                    value={nombre_usuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
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
                    value={correo_electronico}
                    onChange={(e) => setCorreo(e.target.value)}
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
                    value={institucion}
                    onChange={(e) => setInstitucion(e.target.value)}
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
                        value={telefono}
                        onChange={(e) => setCelular(e.target.value)}
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
                        value={fecha_nacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
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
