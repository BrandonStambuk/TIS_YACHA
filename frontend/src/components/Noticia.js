import React, { useState } from 'react';
import NavbarAdmin from './NavbarAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Noticia.css";
import { URL_API } from './const';
import axios from 'axios'; 
import { Editor } from "@tinymce/tinymce-react";
import { Link } from 'react-router-dom';
import AficheForm from './componentesEventoDinamico/AficheForm';
import { useNavigate } from 'react-router-dom';

const endpoint = URL_API;

const Noticia = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [activeSection, setActiveSection] = useState('titulo');
  const navigate = useNavigate();

  const handleGuardarNoticia = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    let ruta =null;
    if (imagen) {
      formData.append('image', imagen);
      const responseImage = await axios.post(`${URL_API}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      ruta = responseImage.data.path;
    }
    await axios.post(`${endpoint}/crearNoticia`, {
      titulo: titulo,
      contenido: contenido,
      imagen: ruta,
    })
    .then(response => {
      console.log('Respuesta del servidor:', response.data);
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error);
    });
    navigate('/tabla-noticias');
  };

  const handleContenidoChange = (content, editor) => {
    setContenido(content);
  };
  const handleImagen = (e) => {
    setImagen(e);
  }

  return (
    <div>
      <NavbarAdmin />
      <div className="mt-5">
        <div className="row">
          <div className="col-md-3 p-0">
            {/* Menú en la parte izquierda */}
            <div className="d-flex flex-column">
              <button
                onClick={() => setActiveSection('titulo')}
                className={`button mb-2 ${activeSection === 'titulo' ? 'active' : ''}`}
              >Información
              </button>
              <button
                onClick={() => setActiveSection('imagen')}
                className={`button mb-2 ${activeSection === 'imagen' ? 'active' : ''}`}
              >Imagen
              </button>
              <button className="btn btn-success" onClick={handleGuardarNoticia}>
                Guardar Noticia
              </button>
              <Link to="/tabla-noticias" className="btn btn-danger">Cancelar</Link>
            </div>
          </div>
          <div className="col-md-9">
            {/* Contenido principal */}
            {activeSection === 'titulo' && (
            <div className="tarjeta">
              <div className="tarjeta-body">
                <h5 className="card-title">Creación de noticia</h5>
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label title-notice">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contenido" className="form-label notice-content">Contenido</label>
                  <Editor
                    apiKey="et3kv22txmedmy751hwdgrmywr1k93evr5t5in9vmjh0mze8"
                    id="contenido"
                    name="contenido"
                    value={contenido}
                    init={{
                      directionality: 'ltr',
                      setup: function (editor) {
                        editor.on('init', function () {
                          // ... configuraciones adicionales si es necesario
                        });
                      },
                    }}
                    onEditorChange={handleContenidoChange}
                  />
                </div>
              </div>
            </div>
            )}
            {activeSection === 'imagen' && (
              <AficheForm
              setInput={handleImagen}
              input={imagen}
              inputUrl={imagenUrl}
            />
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noticia;