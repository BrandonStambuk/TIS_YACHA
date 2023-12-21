import React, { useState } from 'react';
import NavbarAdmin from './NavbarAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Noticia.css";
import { URL_API } from './const';
import axios from 'axios'; 
import { Editor } from "@tinymce/tinymce-react";

const endpoint = URL_API;

const Noticia = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const handleGuardarNoticia = () => {
    axios.post(`${endpoint}/crearNoticia`, {
      titulo: titulo,
      contenido: contenido,
    })
    .then(response => {
      console.log('Respuesta del servidor:', response.data);
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error);
    });
  };

  const handleContenidoChange = (content, editor) => {
    setContenido(content);
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="mt-5">
        <div className="row">
          <div className="col-md-3 p-0">
            {/* Menú en la parte izquierda */}
            <div className="d-flex flex-column">
              <button className="button mb-2" onClick={handleGuardarNoticia}>
                Guardar Noticia
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {/* Contenido principal */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noticia;