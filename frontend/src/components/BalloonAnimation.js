import React, { useEffect } from 'react';
import './css/balloon-animation.css'; 

const BalloonAnimation = ({ onAnimationEnd }) => {
  useEffect(() => {
    const balloonContainer = document.getElementById("balloon-container");

    function random(num) {
      return Math.floor(Math.random() * num);
    }

    function getRandomStyles() {
      var r = random(255);
      var g = random(255);
      var b = random(255);
      var mt = random(200);
      var ml = random(50);
      var dur = random(5) + 5;
      return `
        background-color: rgba(${r},${g},${b},0.7);
        color: rgba(${r},${g},${b},0.7); 
        box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
        margin: ${mt}px 0 0 ${ml}px;
        animation: float ${dur}s ease-in infinite;
      `;
    }

    function createBalloons(num) {
      for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer.appendChild(balloon);
      }
    }

    function removeBalloons() {
      balloonContainer.style.opacity = 0;
      const timeesp = 3000;
      setTimeout(() => {
        balloonContainer.remove();
        onAnimationEnd(); // Llama a la función proporcionada cuando la animación termina
      }, timeesp);
    }

    // Crea los globos al cargar la página
    createBalloons(30);

    // Elimina los globos al hacer clic
   

    // Limpieza del efecto secundario al desmontar el componente
    return () => {

    };
  }, [onAnimationEnd]);

  return null;
};

export default BalloonAnimation;