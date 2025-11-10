import React from "react";

// 1. Recibimos 'user' y 'onLogout', NO 'auth'
function Bienvenida({ user, onLogout }) {

  // 2. El email del usuario en Amplify v6 se encuentra aquí
  const email = user.signInDetails?.loginId || user.username;

  return (
    <div style={{ margin: "100px auto", maxWidth: 400, textAlign: "center" }}>
      <h2>¡Bienvenido!</h2>
      
      {/* 3. Mostramos el email desde la variable 'email' */}
      <p>Estás autenticado como: {email}</p>
      
      <button
        // 4. Llamamos directamente a la función 'onLogout'
        onClick={onLogout}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Bienvenida;