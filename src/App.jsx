// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 👇 CAMBIO 1: Importamos las funciones específicas de @aws-amplify/auth
import { getCurrentUser, signOut } from '@aws-amplify/auth';

import LoginForm from "./components/LoginForm";
import Bienvenida from "./pages/Bienvenida";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // 👇 CAMBIO 2: Usamos getCurrentUser()
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      // 👇 CAMBIO 3: Usamos signOut()
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Cargando...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginForm
                // 👇 CAMBIO 4: Pasamos el 'user' al loguear
                onLoginSuccess={() => {
                  // Volvemos a chequear el usuario para actualizar el estado
                  setIsLoading(true);
                  checkUser(); 
                }}
              />
            ) : (
              <Navigate to="/bienvenida" />
            )
          }
        />
        <Route
          path="/bienvenida"
          element={
            user ? (
              <Bienvenida user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );

  // Función interna para recargar el usuario
  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false);
  }
}

export default App;