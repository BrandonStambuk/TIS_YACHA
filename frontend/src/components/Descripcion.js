import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

const Descripcion = () => {
    const editorRef = useRef();
    const [descripcion, setDescripcion] = useState("");


    function onClickHandler(){
        console.log(editorRef.current.getContent());
    }




    return (
        <div className="mb-3" style={{ direction: 'ltr', textAlign: 'left' }}>
                        <label htmlFor="descripcion" className="form-label">
                          Descripción
                        </label>
                        <Editor
                          apiKey="et3kv22txmedmy751hwdgrmywr1k93evr5t5in9vmjh0mze8"
                          initialValue={descripcion}
                          init={{
                            directionality: 'ltr', 
                          }}
                          //onEditorChange={handleDescripcionChange}
                        />
                      </div>

    );
}

export default Descripcion;