import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Bienvenida from '../Bienvenida'; // Importamos tu componente existente

function SesionUsuario() {
  // Usamos el hook para recibir el 'context' enviado desde el Outlet en MainLayout
  const { user, onLogout } = useOutletContext();

  // Renderizamos el componente Bienvenida con las props necesarias
  // Lo envolvemos en el '.container' para que respete el layout
  return (
    <div className="container form-content">
      <Bienvenida user={user} onLogout={onLogout} />
    </div>
  );
}

export default SesionUsuario;