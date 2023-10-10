import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import './css/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen1 from '../components/images/mi_afiche.png';
//const endpoint = 'http://localhost:8000/api/crearevento';

const HomePage = () => {

   // const [nombre_evento, setNombreEvento] = useState('')
    //const [tipo_evento, setTipoEvento] = useState('')
    //const [fecha_inicio, setFechaInicio] = useState('')
    //const [fecha_fin, setFechaFin] = useState('')
    //const [descripcion, setDescripcion] = useState('')
    //const navigate = useNavigate()

    //const handleTipoEventoChange = (event) => {
    //    setTipoEvento(event.target.value);
    //};

    //const handleFechaInicioChange = (event) => {
      //  setFechaInicio(event.target.value);
      //};
    
      //const handleFechaFinChange = (event) => {
        //setFechaFin(event.target.value);
      //};

      //const handleHorasChange = (event) => {
       // setDescripcion(event.target.value);
     // };

    //const store = async (e) => {
        //e.preventDefault();
        //await axios.post(endpoint, {nombre_evento: nombre_evento, tipo_evento: tipo_evento, fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, descripcion: descripcion})
        //navigate('/')

    //}
    
  return (
    <div>
        <Navbar/>
        <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card card-translucent">
                            <h3 className="card-header">Competencia Local UMSS </h3>
                            <div className="card-body">
                                <div>
                                    <img src={imagen1} alt="Afiche de Evento" />
                                    <p>
                                       Se esta llevando acabo la primera competencia de progamacion competitiva ICPC en la Universidad Mayor de San Simon!
                                       Tendra lugar el 15/10/2023 en el laboratorio 1 del departamento de Informatica. Ven y demuestra tus habilidades!
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-translucent">
                            <h3 className="card-header">Eventos Pasados</h3>
                            <div className="card-body table-responsive tabla-contenedor">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className='text-white'>Nombre</th>
                                            <th className='text-white'>Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Evento 1</td>
                                            <td>Tipo 1</td>
                                        </tr>
                                        <tr>
                                            <td>Evento 2</td>
                                            <td>Tipo 2</td>
                                        </tr>
                                        <tr>
                                            <td>Evento 1</td>
                                            <td>Tipo 1</td>
                                        </tr>
                                        <tr>
                                            <td>Evento 2</td>
                                            <td>Tipo 2</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );

}

export default HomePage