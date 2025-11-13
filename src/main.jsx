// main.jsx
import "./i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from 'aws-amplify';

// 👇 --- AÑADIR ESTA LÍNEA ---
import 'flag-icons/css/flag-icons.min.css';

// 👇 Configuración actualizada para v6
Amplify.configure({
  Auth: {
    Cognito: {
      // Tu región se infiere del ID, pero puedes ponerla si quieres
      // region: "us-east-2", 
      userPoolId: "us-east-2_emxxr5rVE",
      userPoolClientId: "5pboctejrohnr886ihfehl0j6e",
    }
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);