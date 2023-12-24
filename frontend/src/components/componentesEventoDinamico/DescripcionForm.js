import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const DescripcionForm = ({ onDescripcionChange, DescripcionIn, onGuardarEvento,contador,onContadorChange }) => {
  const [descripcion, setDescripcion] = useState(DescripcionIn || "");
  const [descripcionError, setDescripcionError] = useState("");
  const [puedeGuardar, setPuedeGuardar] = useState(false);

  const handleDescripcionChange = (content) => {
    setDescripcion(content);
    let error = validateDescripcion(content);
    setDescripcionError(error);
    setPuedeGuardar(!error && content.length >= 18);
    onDescripcionChange(content);
  };

  const validateDescripcion = (content) => {
    if (content.length < 18) {
      

      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (content.length > 500) {
      return "La descripción no puede tener más de 500 caracteres.";
    }
    return "";
  };

  useEffect(() => {
    //onGuardarEvento(puedeGuardar);
    onContadorChange(true);

    // Verificar errores específicos y mostrar en consola
    if (descripcionError) {
      console.log("Error en Descripción:", descripcionError);
      onContadorChange(false);
    }

    const timeoutId = setTimeout(() => {
      setDescripcionError("");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [descripcion, descripcionError, puedeGuardar, onGuardarEvento]);

  return (
    <div className="card-body tarjeta">
      
      <div className="mb-3">
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
        {descripcionError && (
          <div className="invalid-feedback">{descripcionError}</div>
        )}
        {descripcionError && (
          <div className="error-message">{descripcionError}</div>
        )}
      </div>
    </div>
  );
};

export default DescripcionForm;