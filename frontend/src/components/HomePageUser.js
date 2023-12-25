import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './css/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselComponent from './Carrousel';
import { URL_API } from './const';
import './css/carrousel.css';
import Footer from './Footer';
import BalloonAnimation from './BalloonAnimation';
import primera from './images/primera clasi.jpg'
import imagen1 from './images/imagen3.jpg';
import segunda from './images/segunda clasi.jpg';
const endpoint = URL_API;

{/* Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahora este es lo que era que es la icpc, nuevo home page */ }

const WICPC = () => {
  {/* imagenes con el texto que les corresponde*/ }
const images  = [primera,
  segunda,
  imagen1];
const texts = ["1ra Clasificacion al mudial","2da Clasificacion al mudial","3ra Clasificacion al mudial"];

 const [showBalloons, setShowBalloons] = useState(true);

  const handleAnimationEnd = () => {
    // Lógica cuando la animación de globos termina
    setShowBalloons(false);
  };
 

  return (
    <div>
      <Navbar />
      {/* Cambio en el tamaño y casi todo en el home*/ }

      <div className="container md-12">
        <div className="row">
          <div className="col-md-8">
            
            <div className="card card-translucent">
              <div className="card-body">
                <h3 className="card-header" style={{ backgroundColor: "#0f5fa6", color: 'white'}}>ICPC-UMSS Trayectoria </h3>
                <div className="row-justify-content-md-center">
                <p style={{ textAlign: 'justify', marginTop: 25, lineHeight: 2.3, fontSize: "large" }}>
                  La ICPC (Competición Internacional Universitaria de Programación) es una competición de programación a nivel internacional que involucra a equipos de estudiantes de universidades de todo el mundo. La competición está diseñada para desafiar a los participantes a resolver problemas algorítmicos complejos en un tiempo limitado.
                  </p>
                  <p style={{ textAlign: 'justify', marginTop: 25, lineHeight: 2.3, fontSize: "large" }}>
                    La Universidad Mayor de San Simón lleva ya muchos años con la formación de competidores de alto nivel, dando como resultado múltiples competencias ganadas tanto a nivel nacional como a nivel regional y 
                    actualmente cuenta con su tercera clasificación al mundial de programación competitiva, siendo la primera en 2017, la segunda en 2021 y la clasificación más reciente en 2022.
                  </p>
                  
                  <div className="col-sm-11 carousel-container" id='balloon-container'>
                  
                    <CarouselComponent images={images} texts={texts}/>
                    {showBalloons && <BalloonAnimation onAnimationEnd={handleAnimationEnd} />}
                  </div>
                  
                </div>

              </div>

            </div>

          </div>
          <div className="col-md-4">
            
            <div className="card card-translucent">
              
                <h3 className="card-header" style={{ backgroundColor: "#0f5fa6", color: 'white'}}>Palabras motivadoras </h3>
                <div className="row">
                
                  <p style={{ textAlign: 'justify', marginTop: 25, lineHeight: 2.4, fontSize: "large" }}>
                    HOLA MUNDO
                  </p>
                 
                </div>

             

            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WICPC;
