import React, { useState, useEffect } from 'react';

const AficheForm = ({ setInput, input, inputFile, onGuardarEvento, contador,onContadorChange }) => {
    const [image, setImage] = useState(null);
    const [inputUrl, setInputFile] = useState(null);

    useEffect(() => {
        if (input) {
            setImage(URL.createObjectURL(input));
            onContadorChange(true);

        } else {
            setInputFile(inputFile);
        }
    }, [input]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setInput(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                let result = reader.result;
                setImage(result);
            };
            reader.readAsDataURL(file);
            onContadorChange(true);

        } else {
            setImage(null);
            onContadorChange(false);

        }
    };

    const handleNoAficheClick = () => {
        setInput(null);
        setImage(null);
    };

    return (
        <div className="card-body tarjeta">
            <div className="mb-3">
                <label htmlFor="upload-button" className="btn btn-primary btn-lg btn-block mx-auto" style={{ margin: '50px' }}>
                    Seleccionar imagen
                </label>
                <input id="upload-button" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />

                {image && <img src={image} alt="Uploaded Image" />}
                {!image && inputUrl && (
                    <img src={inputUrl} alt="Alternate Image" />
                )}
               
            </div>
        </div>
    );
}

export default AficheForm;