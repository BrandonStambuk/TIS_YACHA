import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const DescripcionForm = ({onDescripcionChange, DescripcionIn}) => {

    const [descripcion, setDescripcion] = React.useState(DescripcionIn ||"");

  const handleDescripcionChange = (content) => {
    setDescripcion(content);
    onDescripcionChange(content);
  };
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
      </div>
    </div>
  );
};

export default DescripcionForm;