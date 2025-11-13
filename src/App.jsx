import React, { useState, useEffect, useCallback } from "react"; // 1. Importar useCallback
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 2. Importar la nueva función
import { getCurrentUser, signOut, fetchUserAttributes } from '@aws-amplify/auth';

// --- Componentes/Páginas ---
import LoginForm from "./components/LoginForm";
import MainLayout from "./layouts/MainLayout";
import SesionUsuario from "./pages/dashboard/SesionUsuario";
import IngresoPaciente from "./pages/dashboard/IngresoPaciente";
import ListadoPacientes from "./pages/dashboard/ListadoPacientes";
import Reportes from "./pages/dashboard/Reportes";
import AtencionMedicaLayout from "./layouts/AtencionMedicaLayout";
import MotivoConsulta from "./pages/atencion-medica/MotivoConsulta";
import PlaceholderPage from "./pages/atencion-medica/PlaceholderPage";

// --- Componente App ---

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Definimos la función checkUser UNA SOLA VEZ
  // Esta función ahora trae la sesión Y los atributos
  const checkUser = useCallback(async () => {
    setIsLoading(true); // Ponemos el loading aquí
    try {
      // Paso 1: Obtener la sesión (quién es el usuario)
      const sessionUser = await getCurrentUser();
      
      // Paso 2: Obtener los atributos (name, email, etc.)
      const attributes = await fetchUserAttributes();
      
      // Paso 3: Combinarlos en el estado 'user'
      setUser({
        ...sessionUser, // { username, userId, signInDetails }
        attributes: attributes // { name: '...', email: '...' }
      });
      
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false); // Quitamos el loading al final
  }, []); // useCallback con array vacío, solo se crea una vez

  // 4. useEffect ahora solo llama a la función
  useEffect(() => {
    checkUser();
  }, [checkUser]); // Se ejecuta al montar

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // 5. handleLoginSuccess ahora solo llama a la función
  const handleLoginSuccess = () => {
    // No es necesario setIsLoading(true), checkUser ya lo hace
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
              <Navigate to="/app" replace />
            )
          }
        />

        {/* --- Rutas Protegidas: DASHBOARD --- */}
        <Route
          path="/app"
          element={
            user ? (
              <MainLayout user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="sesion" element={<SesionUsuario />} />
          <Route path="ingreso" element={<IngresoPaciente />} />
          <Route path="listado" element={<ListadoPacientes />} />
          <Route path="reportes" element={<Reportes />} />
          
          <Route path="atencion-medica/:pacienteId" element={<AtencionMedicaLayout />}>
            <Route path="motivo-consulta" element={<MotivoConsulta />} />
            <Route path="anamnesis" element={<PlaceholderPage />} />
            <Route path="signos-vitales" element={<PlaceholderPage />} />
            <Route path="examen-fisico" element={<PlaceholderPage />} />
            <Route path="diagnostico" element={<PlaceholderPage />} />
            <Route path="evolucion" element={<PlaceholderPage />} />
            <Route path="procedimiento" element={<PlaceholderPage />} />
            <Route index element={<Navigate to="motivo-consulta" replace />} />
          </Route>

          <Route index element={<Navigate to="sesion" replace />} />
        </Route>

        {/* --- Fallback --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;