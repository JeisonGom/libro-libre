import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/menu-opciones.css";

export default function MenuOpciones() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const esAdmin = usuario?.rol?.toUpperCase() === "ADMIN";

    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
    };

    return (
    <div className="menu-container">
        <button className="menu-btn" onClick={toggleMenu}>
        ☰ Opciones
        </button>

        {menuAbierto && (
        <div className={`menu-dropdown ${menuAbierto ? "abierto" : ""}`}>
            <button onClick={() => navigate("/libros")}>Inicio</button>

            {esAdmin && (
            <>
                <button onClick={() => navigate("/admin/agregar-libro")}>
                Agregar libro
                </button>
                <button onClick={() => navigate("/admin/eliminar-libro")}>
                Eliminar libro
                </button>
            </>
            )}
            <button onClick={() => navigate("/favoritos")}>Favoritos</button>
            <button onClick={() => navigate("/reservas")}>Reservas</button>
            <button onClick={handleLogout} className="logout">
            Cerrar sesión
            </button>
        </div>
        )}
    </div>
    );
}
