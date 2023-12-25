import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './css/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselComponent from './Carrousel';
import { URL_API } from './const';
import NavbarCoach from './NavbarCoach';
const endpoint = URL_API;

const WICPC = () => {

  const isAuthenticated = localStorage.getItem('token');
  const rol = localStorage.getItem('role');


  return (
    <div>
      {isAuthenticated && rol === "Coach" ? <NavbarCoach /> : <Navbar />}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-translucent">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <CarouselComponent />
                  </div>
                  <div className="col-md-6">
                    <h3 className="card-header" style={{ backgroundColor: '#0f5fa6', color: 'white' }}>¿Qué es la ICPC UMSS?</h3>
                    <p style={{ textAlign: 'justify', marginTop: 25 }}>
                      La ICPC (International Collegiate Programming Contest) es un concurso de programación a nivel universitario que atrae a estudiantes de todo el mundo. Fue fundada en 1970 y es considerada una de las competencias de programación más prestigiosas y desafiantes a nivel mundial. La ICPC pone a prueba las habilidades de programación, resolución de problemas y trabajo en equipo de los estudiantes.

                      El concurso consiste en resolver una serie de problemas algorítmicos en un tiempo limitado, utilizando lenguajes de programación como C++, Java, Python, entre otros. Los equipos de tres estudiantes trabajan juntos para encontrar soluciones eficientes a estos problemas, y compiten contra otros equipos de diferentes universidades.
                    </p>
                    
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default WICPC;
