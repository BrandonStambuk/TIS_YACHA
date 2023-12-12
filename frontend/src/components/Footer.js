import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light bg-transparent">
            <div class="container mt-4">
                <div className='d-flex justify-content-between'>
                    <p>© {new Date().getFullYear()} YachayPachaSoft S.A.</p>
                    <div className='d-flex'>
                        <p>Contacto: +591 71234567</p>
                        <span className='mx-2'>|</span>
                        <a
                            className="text-decoration-none text-dark"
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

