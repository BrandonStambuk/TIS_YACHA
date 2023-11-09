import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ICPCImage from './images/ICPC-contest.png';
import imagen1 from './images/imagen3.jpg';
import imagen2 from './images/imagen4.jpg';
import './css/carrousel.css';
const images = [
  ICPCImage,
  imagen1,
  imagen2,
  // Agrega aquí más rutas de tus imágenes
];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div style={{ marginTop: '35px' }}>
      <Carousel showThumbs={false} selectedItem={currentIndex}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <button onClick={handlePrev}>Anterior</button>
      <button onClick={handleNext}>Siguiente</button>
    </div>
  );
};

export default CarouselComponent;