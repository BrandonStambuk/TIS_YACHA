import axios from 'axios';
import React, { useState, useEffect } from 'react';
import editarIcon from './images/editar.png';
import NavbarAdmin from './NavbarAdmin';
import './css/Perfil.css'
import { URL_API } from '../const';
import NavbarOrganizador from './NavbarOrganizador';

const Perfil = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
  });
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [verificar, setVerificar] = useState(false);
  const id = localStorage.getItem("id");
  const endpoint = `${URL_API}/perfil`;
  const [editModeCorreo, setEditModeCorreo] = useState(false);
  const [editModePassword, setEditModePassword] = useState(false);
  const [editedData, setEditedData] = useState({
    correo: '',
    password: '',
  });
  const [selectedOption, setSelectedOption] = useState('perfil');
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const validateEmail = (email) => {
    let errores = [];
    if (email === "") {
      errores.push("El campo de correo electrónico no puede estar vacío.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errores.push("El formato del correo electrónico es inválido.");
    }
    return errores;
  };
  const validatePassword = (password) => {
    let errores = [];
    if (password === "") {
      errores.push("El campo de contraseña no puede estar vacío.");
    } else if (password.length < 4) {
      errores.push("La contraseña debe tener al menos 4 caracteres.");
    }
    return errores;
    };
  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await axios.get(`${endpoint}/${id}`);
        const usuarioLogueado = {
          nombre: response.data.firstName,
          apellido: response.data.lastName,
          correo: response.data.email,
          password: "",
        };

        setUserData(usuarioLogueado);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    getEventById();
  }, []);

  const handleEditClickCorreo = () => {
    console.log(editModeCorreo);
    setEditedData({
      ...editedData,
      correo: userData.correo,
    });
    setEditModeCorreo(true);
  };
  const handleCancelCorreo = () => {
    setTimeout(() => {
      setEditModeCorreo(false);
      setErrorCorreo("");
    }, 0);
  };
  const handleCancelPassword = () => {
    setTimeout(() => {
      setEditModePassword(false);
      setErrorPassword("");
    }, 0);
  };
  const handleEditClickPassword = () => {
    setEditedData({
      ...editedData,
      password: userData.password,
    });
    setEditModePassword(true);
  };

  const handleSaveClickCorreo = async () => {
    let errores = validateEmail(editedData.correo);
    if (errores.length > 0) {
      setErrorCorreo(errores);
      return;
    }
    setErrorCorreo("");
    try {
      await axios.post(`${endpoint}/${id}`, {
        email: editedData.correo,
      });
      setUserData({
        ...userData,
        correo: editedData.correo,
      });
      setEditModeCorreo(false);
    } catch (error) {
      console.error('Error al actualizar el correo:', error);
    }
  };

  const handleSaveClickPassword = async () => {
    let errores = validatePassword(editedData.password);
    if (errores.length > 0) {
      setErrorPassword(errores);
      return;
    }
    setErrorPassword("");
    try {
      await axios.post(`${endpoint}/password/${id}`, {
        password: editedData.password,
      });
      setUserData({
        ...userData,
        password: editedData.password,
      });
      setEditModePassword(false);
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const editarIconStyle = { width: '20px', height: '20px' };

  const handleOptionClick = (option) => {
    if (option === 'editar') {
      setEditModeCorreo(false);
      setEditModePassword(false);
    }
    setSelectedOption(option);
  };

  const isAuthenticated = localStorage.getItem('token');
  const rol = localStorage.getItem('role');

  return (
    <div>
      {isAuthenticated && (
      rol === "Admin" ? <NavbarAdmin /> : (rol === "Creador" ? <NavbarOrganizador /> : null)
      )}
      <div className='row mt-5 col-md-12'>

        <div className="col-md-2 row">
          {/* Menú vertical */}
          <div className='vertical-menu nav flex-md-column'>
            <a
              className={selectedOption === 'perfil' ? 'active' : ''}
              onClick={() => handleOptionClick('perfil')}
            >
              Perfil
            </a>
            <a
              className={selectedOption === 'editar' ? 'active' : ''}
              onClick={() => handleOptionClick('editar')}
            >
              Editar
            </a>
          </div>
        </div>
        <div className='col-md-7 d-flex align-items-center'>
          <div className='card card-translucent mx-auto card-container'>
            <h2 className='card-header'>Perfil de Usuario</h2>
            <div className='card-body text-perfil'>
              {selectedOption == 'perfil' && (
                <div className='justify-content-center'>
                  <p className='border-right p-2'>
                    <strong>Nombre:</strong> {userData.nombre}
                  </p>
                  <p className='border-left p-2'>
                    <strong>Apellido:</strong> {userData.apellido}
                  </p>
                </div>
              )}
              {selectedOption == 'editar' && (
                <div className=''>
                  <div>
                    <label>
                      <strong>Correo:</strong>{' '}
                      {editModeCorreo ? (
                        <span className="d-flex">
                          <input
                            type="email"
                            name="correo"
                            value={editedData.correo}
                            onChange={handleChange}
                          />
                          <button className='btn-save' onClick={handleSaveClickCorreo}>
                            Guardar
                          </button>
                          <button className='btn-cancel' onClick={handleCancelCorreo}>
                            Cancelar
                          </button>
                        </span>
                      ) : (
                        <span>
                          {userData.correo}
                          <button className="btn btn-transparent" onClick={handleEditClickCorreo}>
                            <img src={editarIcon} alt="Editar" style={editarIconStyle} />
                          </button>
                        </span>
                      )}
                      {errorCorreo && <p className="error-message">{errorCorreo}</p>}
                    </label>
                  </div>
                  <div>
                    <label>
                      <strong>Contraseña:</strong>{' '}
                      {editModePassword ? (
                        <span className="d-flex">
                          <input
                            type="text"
                            name="password"
                            value={editedData.password}
                            onChange={handleChange}
                          />
                          <button className='btn-save' onClick={handleSaveClickPassword}>
                            Guardar
                          </button>
                          <button className='btn-cancel' onClick={handleCancelPassword}>
                            Cancelar
                          </button>
                        </span>
                      ) : (
                        <span>
                          ********
                          <button className="btn btn-transparent" onClick={handleEditClickPassword}>
                            <img src={editarIcon} alt="Editar" style={editarIconStyle} />
                          </button>
                        </span>
                      )}
                      {errorPassword && <p className="error-message">{errorPassword}</p>}
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='col-md-2 img-perfil d-flex align-items-center'>
          <div className='profile-initials'>
            {getInitials(userData.nombre, userData.apellido)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;