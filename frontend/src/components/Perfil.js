import axios from 'axios';
import React, { useState, useEffect } from 'react';
import editarIcon from './images/editar.png';
import NavbarAdmin from './NavbarAdmin';
import './css/Perfil.css'
import { URL_API } from '../const';

const Perfil = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
  });
  const id = localStorage.getItem("id");
  const endpoint = `${URL_API}/perfil`;
  const [editModeCorreo, setEditModeCorreo] = useState(false);
  const [editModePassword, setEditModePassword] = useState(false);
  const [editedData, setEditedData] = useState({
    correo: '',
    password: '',
  });

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await axios.get(`${endpoint}/${id}`);
        const usuarioLogueado = {
          nombre: response.data.firstName,
          apellido: response.data.lastName,
          correo: response.data.email,
          password: response.data.firstName,
        };

        setUserData(usuarioLogueado);
      } catch (error) {
        console.error('Error al obtener los datos del evento:', error);
      }
    };
    getEventById();
  }, []);

  const handleEditClickCorreo = () => {
    setEditedData({
      ...editedData,
      correo: userData.correo,
    });
    setEditModeCorreo(true);
  };

  const handleEditClickPassword = () => {
    setEditedData({
      ...editedData,
      password: userData.password,
    });
    setEditModePassword(true);
  };

  const handleSaveClickCorreo = () => {
    setUserData({
      ...userData,
      correo: editedData.correo,
    });
    setEditModeCorreo(false);
  };

  const handleSaveClickPassword = () => {
    setUserData({
      ...userData,
      password: editedData.password,
    });
    setEditModePassword(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const editarIconStyle = { width: '20px', height: '20px' };

  return (
    <div>
      <NavbarAdmin />
      <div className='row mt-5'>
        <div className='col-md-5 img-perfil'>
          {/* <img src={perfilImage} alt="Perfil" className='img-fluid' /> */}
          <div className='profile-initials'>
          {getInitials(userData.nombre, userData.apellido)}
          </div>
          
        </div>
        <div className='col-md-7 '>
          <div className='card card-translucent mx-auto card-container'>
            <h2 className='card-header'>Perfil de Usuario</h2>
            <div className='card-body text-perfil'>
              <div className='d-flex justify-content-center'>
                <p className='border-right p-3'>
                  <strong>Nombre:</strong> {userData.nombre}
                </p>
                <p className='border-left p-3'>
                  <strong>Apellido:</strong> {userData.apellido}
                </p>
              </div>
              <div className=''>
                <div>
                  <label>
                    <strong>Correo:</strong>{' '}
                    {editModeCorreo ? (
                      <span>
                        <input
                          type="email"
                          name="correo"
                          value={editedData.correo}
                          onChange={handleChange}
                        />
                        <button className='btn-save' onClick={handleSaveClickCorreo}>Guardar</button>
                      </span>
                    ) : (
                      <span>
                        {userData.correo}
                        <button className="btn btn-transparent" onClick={handleEditClickCorreo}>
                          <img src={editarIcon} alt="Editar" style={editarIconStyle} />
                        </button>
                      </span>
                    )}
                  </label>
                </div>
                <div>
                  <label>
                    <strong>Contraseña:</strong>{' '}
                    {editModePassword ? (
                      <span>
                        <input
                          type="text"
                          name="password"
                          value={editedData.password}
                          onChange={handleChange}
                        />
                        <button className='btn-save' onClick={handleSaveClickPassword}>Guardar</button>
                      </span>
                    ) : (
                      <span>
                        ********
                        <button className="btn btn-transparent" onClick={handleEditClickPassword}>
                          <img src={editarIcon} alt="Editar" style={editarIconStyle} />
                        </button>
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;