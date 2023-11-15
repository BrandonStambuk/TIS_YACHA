import React from 'react';
import imagenUMSS from './images/umss.png';
import imagenICPC from './images/icpc.jpg';

const Cabecera = () => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ backgroundColor: 'white', height: '80px' }}>
        <div className="col-6 d-flex align-items-center">
          <img src={imagenUMSS} alt="Logo UMSS" className="img-fluid mx-3 UMSS" style={{ maxWidth: '80%', height: 'auto' }} />
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end">
          <img src={imagenICPC} alt="Logo ICPC" className="img-fluid mx-3 ICPC" style={{ maxWidth: '80%', height: 'auto' }} />
        </div>
        
      </div>
    </div>
  );
};

export default Cabecera;