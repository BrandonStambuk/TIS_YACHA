import React, { useState, useEffect } from 'react';

const AficheForm = ({ setInput, input }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if(input){
            setImage(URL.createObjectURL(input));
        }
    }, []);

    const handleImageUpload = (event) => {
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
                <h2 htmlFor="nombreEvento" className="card-title text-center text-blue">
                    Afiche
                </h2>
                <label htmlFor="upload-button" className="btn btn-primary btn-lg btn-block mx-auto" style={{ margin: '50px' }}>
                    Seleccionar afiche
                </label>
                <input id="upload-button" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />

                {image && <img src={image} alt="Uploaded Image" />}
            </div>
        </div>
    );
}

export default AficheForm;
