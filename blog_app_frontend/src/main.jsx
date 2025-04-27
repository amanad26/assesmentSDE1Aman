import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App.jsx";
import { AuthProvider } from "./lib/auth.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </React.StrictMode>
);
