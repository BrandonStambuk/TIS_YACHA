import React, { useState } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/crearAfiche.css';
import imagen1 from './images/plantilla1.jpg';
import imagen2 from './images/plantilla2.jpg';
import html2canvas from 'html2canvas';

const CrearAfiche = () => {
  const [titulo, setTitulo] = useState({
    texto: '',
    color: '#000000',
    fuente: 'Arial, sans-serif'
  });

  const [descripcion, setDescripcion] = useState({
    texto: '',
    color: '#000000',
    fuente: 'Arial, sans-serif'
  });

  const [footer, setFooter] = useState({
    texto: '',
    color: '#000000',
    fuente: 'Arial, sans-serif'
  });

  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);
  const [aficheBackgroundStyle, setAficheBackgroundStyle] = useState({
    backgroundImage: 'none',
  });
  const [imagen, setImagen] = useState(null);

  const handleTituloChange = (e) => {
    setTitulo({
      ...titulo,
      texto: e.target.value
    });
  };

  const handleDescripcionChange = (e) => {
    setDescripcion({
      ...descripcion,
      texto: e.target.value
    });
  };

  const handleFooterChange = (e) => {
    setFooter({
      ...footer,
      texto: e.target.value
    });
  };

  const handleColorYFuenteChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('titulo')) {
      setTitulo({
        ...titulo,
        [name.split('-')[1]]: value
      });
    } else if (name.startsWith('descripcion')) {
      setDescripcion({
        ...descripcion,
        [name.split('-')[1]]: value
      });
    } else if (name.startsWith('footer')) {
      setFooter({
        ...footer,
        [name.split('-')[1]]: value
      });
    }
  };

  const handlePlantillaClick = (plantilla) => {
    setPlantillaSeleccionada(plantilla);
    setAficheBackgroundStyle({
      backgroundImage: `url(${plantilla})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
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
    const aficheElement = document.querySelector('.afiche-space');
    html2canvas(aficheElement).then((canvas) => {
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
            <div className="card" style={{ borderRadius: '20px' }}>
              <h2 className="card-header text-center">Crear Afiche</h2>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
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
                    <div className="mb-3 text-start">
                      <label htmlFor="titulo" className="form-label label-style">Título</label>
                      <input
                        type="text"
                        className="form-control input"
                        id="titulo"
                        name="titulo-texto"
                        value={titulo.texto}
                        onChange={handleTituloChange}
                      />
                      <label htmlFor="titulo-color" className="form-label label-style">Color</label>
                      <input
                        type="color"
                        className="form-control form-control-color custom-title"
                        id="titulo-color"
                        name="titulo-color"
                        value={titulo.color}
                        onChange={handleColorYFuenteChange}
                        style={{ marginTop: '-35px'}}
                      />
                      <label htmlFor="titulo-fuente" className="form-label label-style">Fuente</label>
                      <select
                        className="form-select"
                        id="titulo-fuente"
                        name="titulo-fuente"
                        value={titulo.fuente}
                        onChange={handleColorYFuenteChange}
                      >
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Times New Roman, serif">Times New Roman</option>
                        <option value="Amatic SC, cursive">Amatic SC</option>
                        {/* Agrega más opciones de fuente aquí */}
                      </select>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="descripcion" className="form-label label-style">Descripción</label>
                      <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion-texto"
                        value={descripcion.texto}
                        onChange={handleDescripcionChange}
                      />
                      <label htmlFor="descripcion-color" className="form-label label-style">Color</label>
                      <input
                        type="color"
                        className="form-control form-control-color custom-title"
                        id="descripcion-color"
                        name="descripcion-color"
                        value={descripcion.color}
                        onChange={handleColorYFuenteChange}
                        style={{ marginTop: '-35px'}}
                      />
                      <label htmlFor="descripcion-fuente" className="form-label label-style">Fuente</label>
                      <select
                        className="form-select"
                        id="descripcion-fuente"
                        name="descripcion-fuente"
                        value={descripcion.fuente}
                        onChange={handleColorYFuenteChange}
                      >
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Times New Roman, serif">Times New Roman</option>
                        <option value="Amatic SC, cursive">Amatic SC</option>
                        {/* Agrega más opciones de fuente aquí */}
                      </select>
                    </div>
                    <div className="mb-3 text-start ">
                      <label htmlFor="footer" className="form-label label-style">Footer</label>
                      <input
                        type="text"
                        className="form-control"
                        id="footer"
                        name="footer-texto"
                        value={footer.texto}
                        onChange={handleFooterChange}
                      />
                      <label htmlFor="footer-color" className="form-label label-style">Color</label>
                      <input
                        type="color"
                        className="form-control form-control-color custom-title"
                        id="footer-color"
                        name="footer-color"
                        value={footer.color}
                        onChange={handleColorYFuenteChange}
                        style={{ marginTop: '-35px'}}
                      />
                      <label htmlFor="footer-fuente" className="form-label label-style">Fuente</label>
                      <select
                        className="form-select"
                        id="footer-fuente"
                        name="footer-fuente"
                        value={footer.fuente}
                        onChange={handleColorYFuenteChange}
                      >
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Times New Roman, serif">Times New Roman</option>
                        <option value="Amatic SC, cursive">Amatic SC</option>
                        {/* Agrega más opciones de fuente aquí */}
                      </select>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="imagen" className="form-label label-style">Logo</label>
                      <input
                        type="file"
                        className="form-control"
                        id="imagen"
                        name="imagen"
                        accept="image/*"
                        onChange={handleImagenChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="afiche-space" style={{ ...aficheBackgroundStyle, marginTop: '0px', borderRadius: '20px' }}>
              <h3 className="afiche-title" style={{ color: titulo.color, fontFamily: titulo.fuente }}>{titulo.texto}</h3>
              <p className="afiche-description" style={{ color: descripcion.color, fontFamily: descripcion.fuente }}>{descripcion.texto}</p>
              <p className="afiche-footer" style={{ color: footer.color, fontFamily: footer.fuente }}>{footer.texto}</p>
              {imagen && (
                <img
                  src={URL.createObjectURL(imagen)}
                  alt="Imagen cargada"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '30px',
                    maxWidth: '100px',
                    maxHeight: '100px',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearAfiche;