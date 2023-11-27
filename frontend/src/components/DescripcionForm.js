
import React from "react";
/*import izqImage from "./images/izq.png";
import derImage from "./images/der.png";
import cenImage from "./images/cen.png";
import jusImage from "./images/jus.png";*/

import { Editor } from '@tinymce/tinymce-react';
const DescripcionForm = ({
  descripcion,
  /*fontSize,
  textAlign,
  handleFontSizeChange,
  handleTextAlignChange,
  setDescripcion,
  handleFileChange,*/
  navigate,
  setDescripcion,
  fontSize,
  textAlign,
  handleFileChange,
  handleDescripcionChange,
  handleFontSizeChange,
  handleTextAlignChange,
}) => {
  const buttonImageStyle = {
    width: "20px",
    height: "20px",
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
          onChange={(e) => setDescripcion(e.target.value)}
          rows="4"
          style={{
            //fontSize: `${fontSize}px`,
            //textAlign: textAlign,
            width: "100%",
            height: "200px",
            resize: "none",
          }}
          onEditorChange={handleDescripcionChange}
        />
      </div>


        

        <div>
          <button
            type="button"
            className="btn btn-warning btn-lg btn-block mx-auto boton-2"
            id="Afiche"
            onClick={() => navigate("/crearafiche")}
          >
            Crear afiche
          </button>
          <br></br>
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
  );
};

export default DescripcionForm;