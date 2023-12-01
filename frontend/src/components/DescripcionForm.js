import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const DescripcionForm = ({
  descripcion,
  setDescripcion,
  handleFileChange,
  navigate,handleTextAlignChange
}) => {
  const editorRef = useRef(null);

  const handleDescripcionChange = (content, editor) => {
    setDescripcion(content);
  };



  return (
    <div className="card-body tarjeta">
      <div className="mb-3">
        
      
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <Editor
            apiKey="et3kv22txmedmy751hwdgrmywr1k93evr5t5in9vmjh0mze8"
            id="descripcion"
            name="descripcion"
            value={descripcion}
            init={{
              directionality: 'ltr',
              setup: function (editor) {
                editor.on('init', function () {
                 
                });
              },
            }}
            onEditorChange={handleDescripcionChange}
          />


        <div>
          <button
            type="button"
            className="btn btn-warning btn-lg btn-block mx-auto boton-2"
            onClick={() => navigate("/crearafiche")}
          >
            Crear afiche
          </button>
          <br />
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none", visibility: "hidden" }}
          />
          <label
            htmlFor="subirAfiche"
            type="button"
            className="btn btn-warning btn-lg btn-block mx-auto boton-2"
          >
            Subir afiche
          </label>
        </div>
      </div>
    </div>
  );
};

export default DescripcionForm;