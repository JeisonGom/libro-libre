import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const rol = usuario?.rol?.toString().toUpperCase();

    if (!usuario) {
    return <Navigate to="/login" replace />;
    }

    if (rol !== "ADMIN") {
    alert("Acceso denegado. Solo los administradores pueden acceder a esta sección.");
    return <Navigate to="/libros" replace />;
    } 

    return children;
};

export default ProtectedAdminRoute;
