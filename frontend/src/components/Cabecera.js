import React from 'react';
import imagenUMSS from './images/umss.png';
import imagenICPC from './images/icpc.jpg';
const Cabecera = () => {
  return (
    <div>
      <div style={{ backgroundColor: 'white', height: '130px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img  src={imagenICPC}alt="Logo UMSS" style={{ width: '307px', height: '130px', marginLeft: '10px' }} />
          <img src={imagenUMSS} alt="Logo ICPC" style={{ width: '307px', height: '130px', marginRight: '10px' }} />
        </div>
      </div>

      <div style={{ backgroundColor: 'RGB(242, 183, 5)', height: '15px' }}></div>
    </div>
  );
};

export default Cabecera;

