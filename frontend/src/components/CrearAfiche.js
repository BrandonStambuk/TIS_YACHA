import React, { useState } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/crearAfiche.css'; // Asegúrate de importar el archivo CSS
import imagen1 from './images/plantilla1.jpg';
import imagen2 from './images/plantilla2.jpg';
import html2canvas from 'html2canvas';

const CrearAfiche = () => {
  // Estado para el texto del título, descripción, la imagen del afiche y el color de la letra
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [colorLetra, setColorLetra] = useState('#000000'); // Valor inicial del color
  const [footer, setFooter] = useState(''); // Nuevo estado para el footer

  // Estado para la plantilla seleccionada
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);

  // Estado para el estilo de fondo del afiche-space
  const [aficheBackgroundStyle, setAficheBackgroundStyle] = useState({
    backgroundImage: 'none', // Sin fondo inicialmente
  });

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleFooterChange = (e) => {
    setFooter(e.target.value); // Manejar cambios en el texto del footer
  };

  const handlePlantillaClick = (plantilla) => {
    setPlantillaSeleccionada(plantilla);
    setAficheBackgroundStyle({
      backgroundImage: `url(${plantilla})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    });
  };

  const plantillaStyle = {
    width: '80%',
    height: 'auto',
    cursor: 'pointer',
    marginBottom: '20px',
    borderRadius: '10px',
    boxShadow: '-12px -4px 20px 0px rgba(0,0,0,0.75)',
    WebkitBoxShadow: '-12px 21px 20px 0px rgba(0,0,0,0.75)',
    MozBoxShadow: '-12px 21px 20px 0px rgba(0,0,0,0.75)',
  };

  const generarImagen = () => {
    // Selecciona el elemento que deseas convertir en imagen (en este caso, el afiche-space)
    const aficheElement = document.querySelector('.afiche-space');
  
    // Utiliza html2canvas para capturar el contenido del elemento
    html2canvas(aficheElement).then((canvas) => {
      // Crea un enlace para descargar la imagen
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'mi_afiche.png';
      a.click();
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7">
            {/* Ambas columnas en una sola tarjeta con bordes redondeados */}
            <div className="card" style={{ borderRadius: '20px' }}>
              <h2 className="card-header text-center">Crear Afiche</h2>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    {/* Columna de Plantillas */}
                    <h4>Plantillas</h4>
                    <img
                      src={imagen1}
                      alt="Plantilla 1"
                      style={plantillaStyle}
                      onClick={() => handlePlantillaClick(imagen1)}
                    />
                    <img
                      src={imagen2}
                      alt="Plantilla 2"
                      style={plantillaStyle}
                      onClick={() => handlePlantillaClick(imagen2)}
                    />
                    <button onClick={generarImagen}>Generar Imagen</button>
                  </div>
                  <div className="col-md-9">
                    {/* Columna del Formulario */}
                    <div className="mb-3">
                      <label htmlFor="titulo" className="form-label label-style">Título</label>
                      <input
                        type="text"
                        className="form-control input"
                        id="titulo"
                        name="titulo"
                        value={titulo}
                        onChange={handleTituloChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="descripcion" className="form-label label-style">Descripción</label>
                      <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={handleDescripcionChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="footer" className="form-label label-style">Footer</label>
                      <input
                        type="text"
                        className="form-control"
                        id="footer"
                        name="footer"
                        value={footer}
                        onChange={handleFooterChange}
                      />
                    </div>
                    <div className="mb-3 text-center">
                      <label htmlFor="colorLetra" className="form-label label-style">Color de la Letra</label>
                      <input
                        type="color"
                        className="form-control form-control-color w-30 mx-auto"
                        id="colorLetra"
                        name="colorLetra"
                        value={colorLetra}
                        onChange={(e) => setColorLetra(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            {/* Columna de Vista previa del Afiche */}
            <div className="afiche-space" style={{ ...aficheBackgroundStyle, marginTop: '20px', borderRadius: '20px' }}>
              <h3 className="afiche-title" style={{ color: colorLetra }}>{titulo}</h3>
              <p className="afiche-description" style={{ color: colorLetra, marginTop: '10px' }}>{descripcion}</p>
              <p className="afiche-footer" style={{ color: colorLetra, marginTop: 'auto' }}>{footer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearAfiche;
