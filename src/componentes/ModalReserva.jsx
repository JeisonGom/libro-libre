import React, { useState, useEffect } from "react";
import "../style/modal-libro.css";

export default function ModalReserva({ libro, reserva, onClose }) {
    const [favorito, setFavorito] = useState(false);

    const libroObj = libro || reserva?.libro;

    useEffect(() => {
    if (libroObj && libroObj.id) {
        const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
        const esFavorito = favoritosGuardados.some((fav) => fav.id === libroObj.id);
        setFavorito(esFavorito);
    }
    }, [libroObj]);

    if (!libroObj) return null;

    const toggleFavorito = (e) => {
    e.stopPropagation();
    setFavorito(!favorito);

    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (!favorito) {
        if (libroObj) localStorage.setItem("favoritos", JSON.stringify([...favoritosGuardados, libroObj]));
    } else {
        const nuevos = favoritosGuardados.filter((fav) => fav.id !== libroObj.id);
        localStorage.setItem("favoritos", JSON.stringify(nuevos));
    }
    };

    const portadaUrl =
    libroObj?.portadaUrl ||
    libroObj?.portada ||
    libroObj?.imagenUrl ||
    libroObj?.imagen ||
    "/img/no-image.png";

    return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={onClose}>✕</button>

        <img
            src={portadaUrl}
            alt={`Portada de ${libroObj?.titulo}`}
            className="modal-portada"
            onError={(e) => (e.currentTarget.src = "/img/no-image.png")}
        />

        <h2>{libroObj?.titulo}</h2>
        <h3>{libroObj?.autor}</h3>

        <p className="modal-descripcion">
            {libroObj?.descripcion || "Sin descripción disponible."}
        </p>

        {reserva && (
            <div className="reserva-detalle">
            <p><strong>Reserva #</strong> {reserva.id}</p>
            <p>
                <strong>Fecha de reserva:</strong>{" "}
                {reserva.fechaReserva ? new Date(reserva.fechaReserva).toLocaleString() : "-"}
            </p>
            <p><strong>Estado:</strong> {reserva.estado || "activa"}</p>
            <p><strong>Usuario:</strong> {reserva.usuario?.nombre || "-"}</p>
            </div>
        )}

        <div className="botones-inferiores">
            <button
            className={`bookmarkBtn ${favorito ? "activo" : ""}`}
            onClick={toggleFavorito}
            >
            <span className="IconContainer">
                <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                </svg>
            </span>
            <p className="text">{favorito ? "Favorito" : "Agregar"}</p>
            </button>

            {libroObj?.linkLectura && (
            <a
                href={libroObj.linkLectura}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-leer"
            >
                Leer
            </a>
            )}
        </div>
        </div>
    </div>
    );
}
