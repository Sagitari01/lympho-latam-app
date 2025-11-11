import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser, signOut } from '@aws-amplify/auth';

// --- Componentes/Páginas ---

// Públicas
import LoginForm from "./components/LoginForm";

// Layout Principal (Protegido)
import MainLayout from "./layouts/MainLayout";

// Páginas del Dashboard (Hijas de MainLayout)
import SesionUsuario from "./pages/dashboard/SesionUsuario";
import IngresoPaciente from "./pages/dashboard/IngresoPaciente";
import ListadoPacientes from "./pages/dashboard/ListadoPacientes";
import Reportes from "./pages/dashboard/Reportes";

// --- Componente App ---

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false);
  }

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null); // Esto causará que el router redirija a "/"
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoading(true);
    checkUser();
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
        {/* --- Ruta Pública: LOGIN --- */}
        <Route
          path="/"
          element={
            !user ? (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            ) : (
              // Si ya hay usuario, llévalo al dashboard
              <Navigate to="/app" replace />
            )
          }
        />

        {/* --- Rutas Protegidas: DASHBOARD --- */}
        <Route
          path="/app"
          element={
            user ? (
              // 1. Si hay usuario, muestra el Layout Principal
              <MainLayout user={user} onLogout={handleLogout} />
            ) : (
              // 2. Si no hay usuario, regresa al login
              <Navigate to="/" replace />
            )
          }
        >
          {/* Estas son las rutas "hijas" que se renderizarán 
            dentro del <Outlet /> de MainLayout */}
          
          <Route path="sesion" element={<SesionUsuario />} />
          <Route path="ingreso" element={<IngresoPaciente />} />
          <Route path="listado" element={<ListadoPacientes />} />
          <Route path="reportes" element={<Reportes />} />
          
          {/* Si alguien entra a /app, lo redirigimos a la pág. de sesión */}
          <Route index element={<Navigate to="sesion" replace />} />
        </Route>

        {/* --- Fallback --- */}
        {/* Si se entra a cualquier otra ruta, redirige a la base */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;