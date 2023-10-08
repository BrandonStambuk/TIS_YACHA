import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'

const endpoint = 'http://localhost:8000/api'
const ListaEventos = () => {

    const [eventos, setEventos] = useState([])
    useEffect ( ()=> {
        getAllEventos()
    }, [])

    const getAllEventos = async () => {
        const response = await axios.get(`${endpoint}/eventos`)
        setEventos(response.data)
    }

    const deleteEvento = async (id) => {

       await axios.delete(`${endpoint}/evento/${id}`)
       getAllEventos()
         
    }
  return (
    <div>
        <Navbar />        
        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha Fin</th>
                    <th>Duracion</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                { eventos.map( (evento) => (
                    <tr key={evento.id}>
                        <td>{evento.nombre_evento}</td>
                        <td>{evento.tipo_evento}</td>
                        <td>{evento.fecha_inicio}</td>
                        <td>{evento.fecha_fin}</td>
                        <td>{evento.descripcion}</td>
                        <td>
                            <Link to={`/edit/${evento.id}`} className='btn btn-info'>Edit</Link>
                            <button onClick={ ()=>deleteEvento(evento.id)} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                ))}                
            </tbody>
        </table>
        <div className='d-grid gap-2'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
        </div>
    </div>
  )
}

export default ListaEventos
