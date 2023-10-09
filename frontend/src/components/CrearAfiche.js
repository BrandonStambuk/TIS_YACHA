import React, { useState } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/crearAfiche.css'; // Asegúrate de importar el archivo CSS

const CrearAfiche = () => {
  // Estado para el texto del título, descripción, la imagen del afiche y el color de la letra
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenAfiche, setImagenAfiche] = useState(null);
  const [colorLetra, setColorLetra] = useState('#000000'); // Valor inicial del color

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleImagenAficheChange = (e) => {
    const imagenSeleccionada = e.target.files[0];
    setImagenAfiche(imagenSeleccionada);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Crear Afiche</h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3 text-start">
                      <label htmlFor="titulo" className="form-label">Título</label>
                      <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        name="titulo"
                        value={titulo}
                        onChange={handleTituloChange}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="descripcion" className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={handleDescripcionChange}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="imagenAfiche" className="form-label">Seleccionar Imagen</label>
                      <input
                        type="file"
                        className="form-control"
                        id="imagenAfiche"
                        name="imagenAfiche"
                        accept="image/*"
                        onChange={handleImagenAficheChange}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="colorLetra" className="form-label">Color de la Letra</label>
                      <input
                        type="color"
                        className="form-control form-control-color"
                        id="colorLetra"
                        name="colorLetra"
                        value={colorLetra}
                        onChange={(e) => setColorLetra(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-center justify-content-md-end">
                      <div className="afiche-space">
                        {imagenAfiche && (
                          <img
                            src={URL.createObjectURL(imagenAfiche)}
                            alt="Afiche"
                            className="afiche-image"
                          />
                        )}
                        <h3 className="afiche-title" style={{ color: colorLetra }}>{titulo}</h3>
                        <p className="afiche-description" style={{ color: colorLetra, marginTop: '10px' }}>{descripcion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearAfiche;