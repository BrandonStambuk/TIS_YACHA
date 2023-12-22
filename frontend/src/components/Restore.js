import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import { URL_API } from '../const';
import "./css/RegistroUsuario.css";
import Swal from 'sweetalert2';

const endpoint = `${URL_API}/restore`;

const Restore = () => {
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Obtener los valores de los parámetros "email" y "token" de la URL
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordsMatch(newPassword === password_confirmation);
    };

    const handleConfirmPasswordChange = (e) => {
        const newPasswordConfirmation = e.target.value;
        setPassword_confirmation(newPasswordConfirmation);
        setPasswordsMatch(password === newPasswordConfirmation);
    };

    const handleRestorePassword = async (e) => {
        e.preventDefault();

        try {
            if (!passwordsMatch) {
                setError("Las contraseñas no coinciden");
                return;
            }

            Swal.fire({
                title: 'Restableciendo Contraseña',
                text: 'Espere un momento por favor',
                icon: 'info',
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
            });

            await axios.post(endpoint, {
                email: email,
                token: token,
                password: password,
            });

            Swal.fire({
                title: 'Contraseña Restablecida',
                text: 'Su contraseña ha sido restablecida con éxito',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: true,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
            });

            navigate('/login');
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'El enlace ya ha sido utilizado vuelva a solicitar el restablecimiento de contraseña',
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: true,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
            });
            navigate('/login');

            setError("El token ha expirado o ha ocurrido un error");
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setError("");
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [error]);

    return (
        <div>
            <NavbarAdmin />
            <div className="container register">
                <div className="heading_register">Restablecer Contraseña</div>
                {!passwordsMatch && <div className="error-message">Las contraseñas no coinciden</div>}
                <form action="" className="form">
                    <input
                        required
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <input
                        required
                        className="input"
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="Confirmar contraseña"
                        value={password_confirmation}
                        onChange={handleConfirmPasswordChange}
                    />
                    <input className="register-button" type="button" value="Actualizar" onClick={handleRestorePassword} />
                    {error && <div className="error-message">{error}</div>}
                    <label>Ingrese su nueva contraseña</label>
                </form>
                <span className="agreement"></span>
            </div>
        </div>
    );
};

export default Restore;
