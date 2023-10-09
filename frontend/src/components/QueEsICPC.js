import React from 'react';
import Navbar from './Navbar';
import './css/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ICPCImage from './images/ICPC-contest.png';
import CarouselComponent from './Carrousel';
const WICPC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-translucent">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                      <CarouselComponent/>
                  </div>
                  <div className="col-md-6">
                    <h3 className="card-header">Que es la ICPC UMSS?</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus et metus nec libero condimentum fermentum. Nullam
                      vehicula, velit eu consequat hendrerit, dolor tortor
                      rhoncus nisl, non varius nisi ipsum nec ex. Nulla eu sapien
                      nec sapien sodales iaculis. Fusce vel purus eu felis rhoncus
                      ultricies eu non tellus. Aenean tristique odio nec tortor
                      ultricies, a ultrices orci cursus. Proin tristique, sapien
                      vel pellentesque mattis, odio arcu fringilla tellus, eu
                      vehicula eros tellus vel dui. Vestibulum volutpat metus vel
                      ex hendrerit, vel lacinia nunc facilisis. Integer interdum
                      elit eu mi vehicula vehicula. Vivamus in augue vel orci
                      scelerisque rhoncus. Vivamus venenatis quam non est vehicula,
                      ut auctor orci fermentum. Suspendisse sit amet euismod odio,
                      eu fringilla justo. Vivamus vel risus vel justo efficitur
                      iaculis in ac lacus. Nulla facilisi.
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
