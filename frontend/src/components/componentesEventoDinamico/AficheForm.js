import React, { useState } from "react";
import "../css/Form.css";
import axios from "axios";
import { URL_API } from "../../const";

function AficheForm() {
    const endpoint = `${URL_API}/upload`;
    const [image, setImage] = useState(null);
    const [isImageUploaded, setImageUploaded] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setImageUploaded(true);
    };
    
    const handleUploadToServer = async () => {
        const formData = new FormData();
        formData.append('image', image);
    
        axios.post(endpoint, formData)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="card-body tarjeta">
            <div className="mb-3">
                <h2 htmlFor="nombreEvento" className="card-title text-center text-blue">
                    Afiche
                </h2>
                <div className="form-container">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '20px' }}>
                            <h2>Subir imagen</h2>
                            <label htmlFor="upload-button" className="btn btn-primary btn-lg btn-block mx-auto" style={{ margin: '50px' }}>
                                Seleccionar afiche
                            </label>
                            <br />
                            <input id="upload-button" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
                            <button onClick={handleUploadToServer} disabled={!isImageUploaded} style={{ backgroundColor: isImageUploaded ? 'green' : 'gray', color: 'white', marginTop: '10px' }}>
                                Guardar afiche
                            </button>
                        </div>
                        {image && <img src={image} alt="Imagen subida" style={{ maxWidth: '300px', maxHeight: '300px' }} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AficheForm;
