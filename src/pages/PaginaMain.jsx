import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import TarjetaLibro from "../componentes/TarjetaLibro";
import BarraBusqueda from "../componentes/BarraBusqueda";
import MenuOpciones from "../componentes/MenuOpciones";
import ModalLibro from "../componentes/ModalLibro";
import "../style/pagina-main.css";

export default function PaginaMain() {
    const [libros, setLibros] = useState([]);
    const [filteredLibros, setFilteredLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        let mounted = true;
        api.get("/public/libros")
            .then((res) => {
                if (!mounted) return;

                const data = Array.isArray(res.data) ? res.data : [];
                setLibros(data);
                setFilteredLibros(data);
            })
            .catch((err) => {
                console.error("Error cargando libros:", err);
                if (mounted) {
                    setLibros([]);
                    setFilteredLibros([]);
                    setError("Error al cargar libros");
                }
            })
            .finally(() => mounted && setLoading(false));

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredLibros(libros);
            return;
        }

        const q = searchTerm.toLowerCase();
        setFilteredLibros(
            libros.filter(
                (l) =>
                    (l.titulo || "").toLowerCase().includes(q) ||
                    (l.autor || "").toLowerCase().includes(q) ||
                    ((l.genero || "").toLowerCase().includes(q))
            )
        );
    }, [searchTerm, libros]);

    if (loading) return <p className="mensaje-carga">Cargando...</p>;
    if (error) return <p className="mensaje-error">{error}</p>;

    return (
        <div className="home-container">
            <MenuOpciones />
            <h1 className="titulo-principal">Bienvenido a la Libro Libre</h1>

            <BarraBusqueda searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="books-grid">
                {Array.isArray(filteredLibros) && filteredLibros.length > 0 ? (
                    filteredLibros.map((libro) => (
                        <TarjetaLibro
                            key={libro.id}
                            libro={libro}
                            usuario={usuario}
                            onClick={() => setLibroSeleccionado(libro)}
                        />
                    ))
                ) : (
                    <p className="mensaje-no-resultados">No se encontraron libros.</p>
                )}
            </div>

            {libroSeleccionado && (
                <ModalLibro
                    libro={libroSeleccionado}
                    onClose={() => setLibroSeleccionado(null)}
                />
            )}
        </div>
    );
}
