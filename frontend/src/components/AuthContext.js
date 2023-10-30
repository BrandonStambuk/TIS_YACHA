import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Coloca aquí la lógica de autenticación si es necesario
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Coloca aquí la lógica de cierre de sesión si es necesario
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
