import React, { useState } from "react";
import "../style/tarjetaLibro.css";

export default function ReservaTarjetaLibro({ reserva, usuario, onClick, onCancelar }) {
    const [imgError, setImgError] = useState(false);

    const libro = reserva?.libro;

    const portadaUrl = (
    libro?.portadaUrl || libro?.portada || libro?.imagenUrl || libro?.imagen || null
    );

    return (
    <article
        className="tarjeta-libro"
        role="button"
        tabIndex={0}
        onClick={() => onClick?.(reserva)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.(reserva)}
        aria-label={`Ver reserva ${reserva?.id ?? ""}`}
    >
        {!imgError && portadaUrl ? (
        <img
            src={portadaUrl}
            alt={`Portada de ${libro?.titulo}`}
            className="portada-imagen"
            onError={() => setImgError(true)}
        />
        ) : (
        <div className="portada-placeholder">
            {imgError ? "Imagen no disponible" : "Cargando..."}
        </div>
        )}

        <div className="contenido-tarjeta">
        <h2 className="titulo">{libro?.titulo}</h2>
        <h3 className="autor">{libro?.autor}</h3>

        <div className="reserva-meta">
            <p className="meta"><strong>Reserva #</strong> {reserva?.id ?? "-"}</p>
            <p className="meta">
            <strong>Fecha:</strong>{" "}
            {reserva?.fechaReserva
                ? new Date(reserva.fechaReserva).toLocaleString()
                : "-"}
            </p>
            <p className="meta">
            <strong>Usuario:</strong> {reserva?.usuario?.nombre || usuario?.nombre || "-"}
            </p>
            <p className="meta">
            <strong>Estado:</strong> {reserva?.estado || "activa"}
            </p>
        </div>
        </div>

        {typeof onCancelar === "function" && (
        <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onCancelar(reserva?.id); }}
            className="btn-cancelar"
            title="Cancelar reserva"
        >
            Cancelar
        </button>
        )}
    </article>
    );
}
