import React, { useState, useEffect } from 'react';

const AficheForm = ({ setInput, input, inputFile}) => {
    const [image, setImage] = useState(null);
    const [inputUrl, setInputFile] = useState(null);

    useEffect(() => {
        if(input){
            setImage(URL.createObjectURL(input));
        }else{
            setInputFile(inputFile);
        }
    }, [input]);

    const handleImageUpload = (event) => {
        console.log(event.target.files[0]);
        const file = event.target.files[0];
        setInput(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            let result = reader.result;
            setImage(result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
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
