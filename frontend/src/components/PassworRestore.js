import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./css/Navbar.css";
import "./css/fondo.css";
import Navbar from "./Navbar";
import "./css/Login.css";
import axios from "axios";
import { URL_API } from '../const';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const endpoint = `${URL_API}/forget-password`;

const PasswordRestore = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSend = async () => {
        try {
            Swal.fire({
                title: 'Se está enviando un correo a su email con las instrucciones para recuperar su cuenta',
                text: 'Espere un momento por favor',
                icon: 'info',
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
            });

            const response = await axios.post(endpoint, {
                email: email,
            });

            Swal.fire({
                title: 'Correo enviado',
                text: 'Se ha enviado un correo a su email con instrucciones para recuperar su cuenta',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: true,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
            });

            setSuccess("Se ha enviado un correo a su email con las instrucciones para recuperar su cuenta ");
            setEmail("");
            console.log(response);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'El email ingresado no pertenece a ningún usuario',
                icon: 'error',
                showCancelButton: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
            });
        }
    };

    const handleRestore = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Ingrese un email válido");
            return;
        }

        handleSend();
    }

    const handleEmailChange = (e) => {
        setError("");
        setEmail(e.target.value);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setError("");
            setSuccess("");
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [error, success]);

    return (
        <div>
            <Navbar />
            <div className="container login">
                <div className="heading">Recuperación de la cuenta</div>
                {success && <div className="success-message">{success}</div>}
                <form action="" className="form">
                    <input
                        required=""
                        className="input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ingrese su email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input className="login-button" type="button" onClick={handleRestore} value="Enviar Correo" />
                    {error && <div className="error-message">{error}</div>}
                    <label>Ingrese su email para recuperar su cuenta</label>
                </form>
                <span className="agreement"></span>
            </div>
        </div>
    );
};

export default PasswordRestore;
