import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser, signOut, fetchUserAttributes } from '@aws-amplify/auth';

// --- Componentes/Páginas ---
import LoginForm from "./components/LoginForm";
import MainLayout from "./layouts/MainLayout";

// Páginas del Dashboard
import SesionUsuario from "./pages/dashboard/SesionUsuario";
import IngresoPaciente from "./pages/dashboard/IngresoPaciente";
import ListadoPacientes from "./pages/dashboard/ListadoPacientes";
import Reportes from "./pages/dashboard/Reportes";

// Páginas de Atención Médica
import AtencionMedicaLayout from "./layouts/AtencionMedicaLayout";
import MotivoConsultaMedica from "./pages/atencion-medica/MotivoConsulta";
import PlaceholderPageMedica from "./pages/atencion-medica/PlaceholderPage";

// Páginas de Atención Terapéutica
import AtencionTerapeuticaLayout from "./layouts/AtencionTerapeuticaLayout";
import MotivoConsultaTerapeutica from "./pages/atencion-terapeutica/MotivoConsulta";
// --- 👇 CAMBIO: Importamos la nueva página ---
import ExamenSegmentado from "./pages/atencion-terapeutica/ExamenSegmentado"; 
import PlaceholderPageTerapeutica from "./pages/atencion-terapeutica/PlaceholderPage";

// --- Componente App ---

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const sessionUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      setUser({
        ...sessionUser,
        attributes: attributes
      });
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleLoginSuccess = () => {
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
          {/* Páginas principales del dashboard */}
          <Route path="sesion" element={<SesionUsuario />} />
          <Route path="ingreso" element={<IngresoPaciente />} />
          <Route path="listado" element={<ListadoPacientes />} />
          <Route path="reportes" element={<Reportes />} />
          
          {/* Rutas Anidadas para Atención Médica */}
          <Route path="atencion-medica/:pacienteId" element={<AtencionMedicaLayout />}>
            <Route path="motivo-consulta" element={<MotivoConsultaMedica />} />
            <Route path="anamnesis" element={<PlaceholderPageMedica />} />
            <Route path="signos-vitales" element={<PlaceholderPageMedica />} />
            <Route path="examen-fisico" element={<PlaceholderPageMedica />} />
            <Route path="diagnostico" element={<PlaceholderPageMedica />} />
            <Route path="evolucion" element={<PlaceholderPageMedica />} />
            <Route path="procedimiento" element={<PlaceholderPageMedica />} />
            <Route index element={<Navigate to="motivo-consulta" replace />} />
          </Route>

          {/* --- 👇 CAMBIO: Rutas Anidadas para Atención Terapéutica --- */}
          <Route path="atencion-terapeutica/:pacienteId" element={<AtencionTerapeuticaLayout />}>
            <Route path="motivo-consulta" element={<MotivoConsultaTerapeutica />} />
            <Route path="anamnesis" element={<PlaceholderPageTerapeutica />} />
            <Route path="signos-vitales" element={<PlaceholderPageTerapeutica />} />
            <Route path="examen-fisico" element={<PlaceholderPageTerapeutica />} />
            {/* Ruta para el nuevo componente */}
            <Route path="examen-segmentado" element={<ExamenSegmentado />} /> 
            <Route path="problemas-objetivos" element={<PlaceholderPageTerapeutica />} />
            {/* Ruta actualizada */}
            <Route path="evaluacion-lipedema" element={<PlaceholderPageTerapeutica />} /> 
            <Route path="procedimiento" element={<PlaceholderPageTerapeutica />} />
            <Route path="reporte" element={<PlaceholderPageTerapeutica />} />
            <Route path="historial" element={<PlaceholderPageTerapeutica />} />
            <Route index element={<Navigate to="motivo-consulta" replace />} />
          </Route>

          {/* Redirige /app a la página de sesión */}
          <Route index element={<Navigate to="sesion" replace />} />
        </Route>

        {/* --- Fallback --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;