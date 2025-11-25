import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import TarjetaLibro from "../componentes/TarjetaLibro";
import "../style/eliminar-libro.css";
import MenuOpciones from "../componentes/MenuOpciones";

export default function EliminarLibro() {
    const [libros, setLibros] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const esAdmin = usuario?.rol?.toUpperCase() === "ADMIN";

    useEffect(() => {
        if (!esAdmin) {
            alert("No tienes permisos para acceder a esta página");
            navigate("/libros");
        }
    }, [esAdmin, navigate]);

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await api.get("/public/libros");
                setLibros(response.data || []);
            } catch (err) {
                setMensaje("Error al cargar libros: " + err.message);
            }
        };
        fetchLibros();
    }, []);

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este libro?")) return;

        try {
            await api.delete(`/admin/libros/${id}`);
            setLibros((prev) => prev.filter((libro) => (libro.id ?? libro._id) !== id));
            setMensaje("Libro eliminado correctamente");
        } catch (err) {
            setMensaje("Error al eliminar el libro: " + err.message);
        }
    };

    const librosFiltrados = libros.filter(
        (libro) =>
            (libro.titulo || "").toLowerCase().includes(busqueda.toLowerCase()) ||
            (libro.autor || "").toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="gestionar-libros-container">
            <MenuOpciones />
            <h2>Eliminar Libro</h2>
            {mensaje && <p className="mensaje">{mensaje}</p>}

            <div className="busqueda-container">
                <input
                    type="text"
                    placeholder="Buscar por título o autor..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="barra-busqueda"
                />
            </div>

            <div className="libros-lista">
                {librosFiltrados.length > 0 ? (
                    librosFiltrados.map((libro) => (
                        <div key={libro.id ?? libro._id} className="libro-item">
                            <TarjetaLibro
                                titulo={libro.titulo}
                                autor={libro.autor}
                                portada={libro.portadaUrl || libro.portada}
                            />
                            <button
                                className="btn-eliminar"
                                onClick={() => handleEliminar(libro.id ?? libro._id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="sin-resultados">No se encontraron libros</p>
                )}
            </div>

            <button className="btn-volver" onClick={() => navigate("/libros")}>
                Volver
            </button>
        </div>
    );
}
