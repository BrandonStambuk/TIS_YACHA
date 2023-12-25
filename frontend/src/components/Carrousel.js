import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
//imagenes cambiadas del carrusel
import primera from './images/primera clasi.jpg';
import imagen1 from './images/imagen3.jpg';
import segunda from './images/segunda clasi.jpg';

import './css/carrousel.css';
//cambio aqui las anteriores imagenes
const images = [
  primera,
  segunda,
  imagen1,
];
{/* agregado el text mas */ }
const CarouselComponent = ({images,texts}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); 
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Carousel showThumbs={false} selectedItem={currentIndex}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt={`Imagen ${index + 1}`} className="carousel-image"/> 
            {/* agregado este text*/ }
            <p className="carousel-text">{texts[index]}</p>
          </div>
        ))}
      </Carousel>
      <button onClick={handlePrev}>Anterior</button>
      <button onClick={handleNext}>Siguiente</button>
    </div>
  );
};

export default CarouselComponent;