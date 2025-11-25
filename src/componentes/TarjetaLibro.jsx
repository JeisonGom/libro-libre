import React, { useState, useCallback } from "react";
import "../style/tarjetaLibro.css";
import { reservarLibro } from "../services/reservaService";

export default function TarjetaLibro({ libro, titulo, autor, portada, usuario, onClick, onReservar }) {
    const [imgError, setImgError] = useState(false);
    const [loading, setLoading] = useState(false);

    const libroObj = libro || { titulo, autor, portadaUrl: portada, id: Math.random() };
    const portadaUrl = libroObj?.portadaUrl || libroObj?.portada || portada || null;

    const handleReservar = useCallback(
    async (e) => {
        e.stopPropagation();
        console.log("🔔 handleReservar clicked", { libroObj, usuario, onReservar });
        if (!usuario) {
        alert("Debes iniciar sesión para reservar.");
        return;
        }

        try {
        setLoading(true);
        let result;
        if (typeof onReservar === "function") {
            result = await onReservar(libroObj.id);
        } else {
            result = await reservarLibro(libroObj.id, usuario.id || usuario._id);
        }
        console.log("reservar result:", result);
        alert(result?.message || "Reserva ejecutada");
        } catch (err) {
        console.error("Error reservar (component):", err?.response?.data || err.message);
        alert(err?.response?.data?.message || "Error al reservar. Revisa Network / logs.");
        } finally {
        setLoading(false);
        }
    },
    [libroObj, usuario, onReservar]
    );

    return (
    <article
        className="tarjeta-libro"
        role="button"
        tabIndex={0}
        onClick={() => onClick?.(libroObj)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.(libroObj)}
        aria-label={`Ver detalles de ${libroObj.titulo}`}
    >
        {!imgError && portadaUrl ? (
        <img
            src={portadaUrl}
            alt={`Portada de ${libroObj.titulo}`}
            className="portada-imagen"
            onError={() => setImgError(true)}
        />
        ) : (
        <div className="portada-placeholder">{imgError ? "Imagen no disponible" : "Cargando..."}</div>
        )}

        <div className="contenido-tarjeta">
        <h2 className="titulo">{libroObj.titulo}</h2>
        <h3 className="autor">{libroObj.autor}</h3>
        </div>

        {usuario && (
        <button
            type="button"
            onClick={handleReservar}
            className="btn-reservar"
            disabled={loading}
            aria-busy={loading}
            title="Reservar libro"
        >
            {loading ? "Procesando..." : "Reservar"}
        </button>
        )}
    </article>
    );
}
