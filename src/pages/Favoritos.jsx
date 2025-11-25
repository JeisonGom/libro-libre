import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TarjetaLibro from "../componentes/TarjetaLibro";
import MenuOpciones from "../componentes/MenuOpciones";
import ModalLibro from "../componentes/ModalLibro";
import "../style/favoritos.css";
import "../style/pagina-main.css"; 

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        const guardados = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavoritos(guardados);
    }, []);

    const eliminarFavorito = (id) => {
        const nuevosFavoritos = favoritos.filter((libro) => libro.id !== id);
        setFavoritos(nuevosFavoritos);
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    };

    return (
        <div className="home-container">
            <MenuOpciones />
            <h1 className="titulo-principal">Mis libros favoritos</h1>

            {favoritos.length === 0 ? (
                <p className="sin-favoritos">
                    No has agregado ningún libro a favoritos.{" "}
                    <span
                        className="link-volver"
                        onClick={() => navigate("/libros")}
                        style={{ cursor: "pointer", color: "#6c63ff", textDecoration: "underline" }}
                    >
                        Explorar libros
                    </span>
                </p>
            ) : (
                <div className="books-grid">
                    {favoritos.map((libro) => (
                        <div
                            key={libro.id}
                            className="favorito-item"
                            onClick={() => setLibroSeleccionado(libro)}
                        >
                            <TarjetaLibro
                                titulo={libro.titulo}
                                autor={libro.autor}
                                portada={libro.portadaUrl || libro.portada}
                                libro={libro}
                                usuario={usuario}
                            />
                            <button
                                className="btn-eliminar-favorito"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    eliminarFavorito(libro.id);
                                }}
                                title="Eliminar de favoritos"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
            
            {libroSeleccionado && (
                <ModalLibro
                    libro={libroSeleccionado}
                    onClose={() => setLibroSeleccionado(null)}
                />
            )}
            <button className="btn-volver" onClick={() => navigate("/libros")}>
                ← Volver a Inicio
            </button>
        </div>

        
    );
}
