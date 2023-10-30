import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './components/AuthContext';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'; // Asegúrate de importar los estilos CSS antes de App
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación, puedes dejar esta parte
reportWebVitals();
