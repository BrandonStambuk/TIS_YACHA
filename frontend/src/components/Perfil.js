import React, { useState, useEffect } from 'react';
import editarIcon from './images/editar.png';
import { URL_API } from '../const';

const Perfil = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
  });

  const [editModeCorreo, setEditModeCorreo] = useState(false);
  const [editModePassword, setEditModePassword] = useState(false);
  const [editedData, setEditedData] = useState({
    correo: '',
    password: '',
  });

  useEffect(() => {
    const usuarioLogueado = {
      nombre: 'John',
      apellido: 'Doe',
      correo: 'john.doe@example.com',
      password: 'password',
    };

    setUserData(usuarioLogueado);
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
      <h2>Perfil de Usuario</h2>
      <p>
        <strong>Nombre:</strong> {userData.nombre}
      </p>
      <p>
        <strong>Apellido:</strong> {userData.apellido}
      </p>
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
            <button onClick={handleSaveClickCorreo}>Guardar</button>
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
      <br />
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
            <button onClick={handleSaveClickPassword}>Guardar</button>
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
  );
};

export default Perfil;
