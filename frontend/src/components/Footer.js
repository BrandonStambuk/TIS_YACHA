import React from 'react';
import './css/Footer.css';
const Footer = () => {
    return (
        <footer className="footer-user text-white ">
            <div className="container mt-4">
                <div className='d-flex justify-content-between'>
                    <p>© {new Date().getFullYear()} YachayPachaSoft S.A.</p>
                    <div className='d-flex'>
                        <p>Contacto: +591 71234567</p>
                        <span className='mx-2'>|</span>
                        <a
                            className="text-decoration-none text-white"
                            href='https://www.umss.edu.bo/'
                            target="_blank"
                            rel="noopener noreferrer">
                            UMSS
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

