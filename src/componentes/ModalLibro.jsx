import React, { useState, useEffect } from "react";
import "../style/modal-libro.css";

export default function ModalLibro({ libro, onClose }) {
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
        if (libro) {
            const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
            const esFavorito = favoritosGuardados.some((fav) => fav.id === libro.id);
            setFavorito(esFavorito);
        }
    }, [libro]);

    if (!libro) return null;

    const toggleFavorito = (e) => {
        e.stopPropagation();
        setFavorito(!favorito);

        const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
        if (!favorito) {
            localStorage.setItem("favoritos", JSON.stringify([...favoritosGuardados, libro]));
        } else {
            const nuevos = favoritosGuardados.filter((fav) => fav.id !== libro.id);
            localStorage.setItem("favoritos", JSON.stringify(nuevos));
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                <button className="cerrar-modal" onClick={onClose}>✕</button>

                <img
                    src={libro.portadaUrl}
                    alt={`Portada de ${libro.titulo}`}
                    className="modal-portada"
                    onError={(e) => (e.target.src = "/img/no-image.png")}
                />

                <h2>{libro.titulo}</h2>
                <h3>{libro.autor}</h3>
                <p className="modal-descripcion">
                    {libro.descripcion || "Sin descripción disponible."}
                </p>

                <div className="botones-inferiores">
                    <button
                        className={`bookmarkBtn ${favorito ? "activo" : ""}`}
                        onClick={toggleFavorito}
                    >
                        <span className="IconContainer">
                            <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512
                                    c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6
                                    c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9
                                    24.3-24.3V48c0-26.5-21.5-48-48-48H48
                                    C21.5 0 0 21.5 0 48z" />
                            </svg>
                        </span>
                        <p className="text">{favorito ? "Favorito" : "Agregar"}</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
