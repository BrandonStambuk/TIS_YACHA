
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
import Swal from 'sweetalert2';

const endpoint = URL_API;

const Noticia = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [activeSection, setActiveSection] = useState('titulo');
  const [contador, setContador] = useState(false);
  const navigate = useNavigate();

  const handleGuardarNoticia = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos antes de guardar la noticia.',
        customClass: {
          confirmButton: 'btn btn-danger', // Clase para el botón "OK"
        },
        buttonsStyling: false, // Desactiva el estilizado por defecto
      });
      return;
    }


    if (!titulo.trim() || titulo.length < 10 || !contenido.trim() || contenido.length < 10) {
      Swal.fire({
        icon: 'error',
        title: 'Campos inválidos',
        text: 'Por favor, asegúrate de que tanto el título como el contenido tengan al menos 10 caracteres.',
        customClass: {
          confirmButton: 'btn btn-danger', // Clase para el botón "OK"
        },
        buttonsStyling: false, // Desactiva el estilizado por defecto
      });
      return;
    }
    const alphanumericRegex = /^[a-zA-Z0-9\s\u200B!.,;?]+$/;

    if (!alphanumericRegex.test(titulo)) {
      Swal.fire({
        icon: 'error',
        title: 'Campos inválidos',
        text: 'No estan permitidos caracteres especiales en el titulo',
        customClass: {
          confirmButton: 'btn btn-danger', // Clase para el botón "OK"
        },
        buttonsStyling: false, // Desactiva el estilizado por defecto
      });
      return;
    }

    let formData = new FormData();
    let ruta = null;
    Swal.fire({
      title: 'Guardando noticia...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
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

    Swal.fire({
      icon: 'success',
      title: 'Noticia guardada',
      text: 'La noticia se ha guardado correctamente.',
      customClass: {
        confirmButton: 'btn-swal-confirm ',
      },
      buttonsStyling: false,
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
              contador={contador}
              onContadorChange={setContador}
            />
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noticia;