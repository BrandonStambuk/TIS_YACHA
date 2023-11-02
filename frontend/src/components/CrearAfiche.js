import React, { useState } from 'react';
import NavbarAdmin from './NavbarAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/crearAfiche.css'; // Asegúrate de importar el archivo CSS
import imagen1 from './images/plantilla1.jpg';
import imagen2 from './images/plantilla2.jpg';
import html2canvas from 'html2canvas';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//probando para subir al main
//hola
const CrearAfiche = () => {
  // Estados para el texto del título, descripción, el footer y los colores de letra
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [colorLetraTitulo, setColorLetraTitulo] = useState('#000000');
  const [footer, setFooter] = useState('');
  const [colorLetraDescripcion, setColorLetraDescripcion] = useState('#000000');
  const [colorLetraFooter, setColorLetraFooter] = useState('#000000');

  // Estados para las fuentes de título, descripción y pie de página
  const [fuenteTitulo, setFuenteTitulo] = useState('Arial, sans-serif');
  const [fuenteDescripcion, setFuenteDescripcion] = useState('Arial, sans-serif');
  const [fuenteFooter, setFuenteFooter] = useState('Arial, sans-serif');

  // Estado para la plantilla seleccionada
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);

  // Estado para el estilo de fondo del afiche-space
  const [aficheBackgroundStyle, setAficheBackgroundStyle] = useState({
    backgroundImage: 'none', // Sin fondo inicialmente
  });

  // Estado para manejar la imagen cargada
  const [imagen, setImagen] = useState(null);

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleFooterChange = (e) => {
    setFooter(e.target.value);
  };

  const handleColorLetraTituloChange = (e) => {
    setColorLetraTitulo(e.target.value);
  };

  const handleColorLetraDescripcionChange = (e) => {
    setColorLetraDescripcion(e.target.value);
  };

  const handleColorLetraFooterChange = (e) => {
    setColorLetraFooter(e.target.value);
  };

  const handleFuenteTituloChange = (e) => {
    setFuenteTitulo(e.target.value);
  };

  const handleFuenteDescripcionChange = (e) => {
    setFuenteDescripcion(e.target.value);
  };

  const handleFuenteFooterChange = (e) => {
    setFuenteFooter(e.target.value);
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
      <NavbarAdmin />
      <div className="container mt-5 - cardEditor">
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
                      <Card>
                        <Card.Body>
                          <Card.Title>Título</Card.Title>
                          <input
                            type="text"
                            className="form-control input"
                            id="titulo"
                            name="titulo"
                            value={titulo}
                            onChange={handleTituloChange}
                          />
                          <Row>
                            <Col sm={6}>
                              <label htmlFor="color-title" className="form-label label-style">Color título:</label>
                                <input
                                  type="color"
                                  className="form-control form-control-color custom-title"
                                  id="colorLetraTitulo"
                                  name="colorLetraTitulo"
                                  value={colorLetraTitulo}
                                  onChange={handleColorLetraTituloChange}
                                />
                            </Col>
                            <Col sm={6}>
                              <label htmlFor="fuenteTitulo" className="form-label label-style">Fuente del Título</label>
                              <select
                                className="form-select"
                                id="fuenteTitulo"
                                name="fuenteTitulo"
                                value={fuenteTitulo}
                                onChange={handleFuenteTituloChange}
                              >
                                <option value="Arial, sans-serif">Arial</option>
                                <option value="Times New Roman, serif">Times New Roman</option>
                                <option value="Amatic SC, cursive">Amatic SC</option>
                                {/* Agrega más opciones de fuente aquí */}
                              </select>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="mb-3 text-start">
                      <Card>
                        <Card.Body>
                          <Card.Title>Descripción</Card.Title>
                          <textarea
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            value={descripcion}
                            onChange={handleDescripcionChange}
                          />
                          <Row>
                            <Col sm={6}>
                              <label htmlFor="color-description" className="form-label label-style">Color Descripcion:</label>
                              <input
                                type="color"
                                className="form-control form-control-color custom-color-input"
                                id="colorLetraDescripcion"
                                name="colorLetraDescripcion"
                                value={colorLetraDescripcion}
                                onChange={handleColorLetraDescripcionChange}
                                style={{ marginTop: '-35px'}}//revisar
                              />
                            </Col>
                            <Col sm={6}>
                            <label htmlFor="fuenteDescripcion" className="form-label label-style">Fuente de la Descripción</label>
                            <select
                              className="form-select"
                              id="fuenteDescripcion"
                              name="fuenteDescripcion"
                              value={fuenteDescripcion}
                              onChange={handleFuenteDescripcionChange}
                            >
                              <option value="Arial, sans-serif">Arial</option>
                              <option value="Times New Roman, serif">Times New Roman</option>
                              <option value="Amatic SC, cursive">Amatic SC</option>
                              {/* Agrega más opciones de fuente aquí */}
                            </select>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="mb-3 text-start">
                      <Card>
                        <Card.Body>
                          <Card.Title>Footer</Card.Title>
                          <input
                            type="text"
                            className="form-control"
                            id="footer"
                            name="footer"
                            value={footer}
                            onChange={handleFooterChange}
                          />
                          <Row>
                            <Col sm={6}>
                              <label htmlFor="color-footer" className="form-label label-style">Color Footer:</label>
                              <input
                                type="color"
                                className="form-control form-control-color custom-footer"
                                id="colorLetraFooter"
                                name="colorLetraFooter"
                                value={colorLetraFooter}
                                onChange={handleColorLetraFooterChange}
                                style={{ marginTop: '-35px'}}
                              />
                            </Col>
                            <Col sm={6}>
                            <label htmlFor="fuenteFooter" className="form-label label-style">Fuente del Footer</label>
                            <select
                              className="form-select"
                              id="fuenteFooter"
                              name="fuenteFooter"
                              value={fuenteFooter}
                              onChange={handleFuenteFooterChange}
                            >
                              <option value="Arial, sans-serif">Arial</option>
                              <option value="Times New Roman, serif">Times New Roman</option>
                              <option value="Amatic SC, cursive">Amatic SC</option>
                              {/* Agrega más opciones de fuente aquí */}
                            </select>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
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
          <div className="col-md-5">
            <div className="afiche-space" style={{ ...aficheBackgroundStyle, marginTop: '0px', borderRadius: '20px' }}>
              <h3 className="afiche-title" style={{ color: colorLetraTitulo, fontFamily: fuenteTitulo }}>{titulo}</h3>
              <p className="afiche-description" style={{ color: colorLetraDescripcion, fontFamily: fuenteDescripcion, marginTop: '10px' }}>{descripcion}</p>
              <p className="afiche-footer" style={{ color: colorLetraFooter, fontFamily: fuenteFooter, marginTop: 'auto' }}>{footer}</p>
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

export default CrearAfiche;