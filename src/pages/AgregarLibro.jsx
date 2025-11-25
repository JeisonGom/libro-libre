import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import libroAdminApi from "../api/libroAdminApi";
import "../style/agregar-libro.css";
import MenuOpciones from "../componentes/MenuOpciones";

export default function AgregarLibro() {
    const [libros, setLibros] = useState([]);
    const [nuevoLibro, setNuevoLibro] = useState({
        titulo: "",
        autor: "",
        genero: "",
        anioPublicacion: "",
        portadaUrl: "",
        descripcion: "",
        linkLectura: "",
    });

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const nombreUsuario = usuario?.nombre;

    useEffect(() => {
        fetchLibros();
    }, []);

    const fetchLibros = async () => {
        try {
            const res = await api.get("/libros");
            setLibros(res.data || []);
        } catch (error) {
            console.error("Error al cargar los libros:", error);
        }
    };

    const handleAgregarLibro = async (e) => {
        e.preventDefault();
        try {
            await libroAdminApi.agregarLibro(nuevoLibro, nombreUsuario);
            alert("Libro agregado correctamente");
            setNuevoLibro({
                titulo: "",
                autor: "",
                genero: "",
                anioPublicacion: "",
                portadaUrl: "",
                descripcion: "",
                linkLectura: "",
            });
            fetchLibros();
        } catch (error) {
            console.error("Error al agregar libro:", error);
            alert("No se pudo agregar el libro");
        }
    };

    const handleEliminarLibro = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este libro?")) return;
        try {
            await libroAdminApi.eliminarLibro(id, nombreUsuario);
            alert("Libro eliminado correctamente");
            fetchLibros();
        } catch (error) {
            console.error("Error al eliminar libro:", error);
            alert("No se pudo eliminar el libro");
        }
    };

    return (
        <div className="admin-page">
            <MenuOpciones />
            <h2>Panel de Administración</h2>

            <form onSubmit={handleAgregarLibro} className="form-agregar">
                <input
                    type="text"
                    placeholder="Título"
                    value={nuevoLibro.titulo}
                    onChange={(e) => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Autor"
                    value={nuevoLibro.autor}
                    onChange={(e) => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Género"
                    value={nuevoLibro.genero}
                    onChange={(e) => setNuevoLibro({ ...nuevoLibro, genero: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Año de publicación"
                    value={nuevoLibro.anioPublicacion}
                    onChange={(e) =>
                        setNuevoLibro({ ...nuevoLibro, anioPublicacion: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="URL de portada"
                    value={nuevoLibro.portadaUrl}
                    onChange={(e) =>
                        setNuevoLibro({ ...nuevoLibro, portadaUrl: e.target.value })
                    }
                />
                <textarea
                    placeholder="Descripción del libro"
                    value={nuevoLibro.descripcion}
                    onChange={(e) =>
                        setNuevoLibro({ ...nuevoLibro, descripcion: e.target.value })
                    }
                    rows="4"
                ></textarea>
                <input
                    type="text"
                    placeholder="Link de lectura (PDF o página web)"
                    value={nuevoLibro.linkLectura}
                    onChange={(e) =>
                        setNuevoLibro({ ...nuevoLibro, linkLectura: e.target.value })
                    }
                />

                <button type="submit">Agregar libro</button>
            </form>

            <h3>Lista de libros disponibles</h3>
            <div className="lista-libros">
                {libros.map((libro) => (
                    <div key={libro.id ?? libro._id} className="tarjeta-libro-admin">
                        <img
                            src={libro.portadaUrl}
                            alt={libro.titulo}
                            onError={(e) => (e.target.src = "/img/no-image.png")}
                        />
                        <h4>{libro.titulo}</h4>
                        <p>{libro.autor}</p>
                        <button
                            className="btn-eliminar"
                            onClick={() => handleEliminarLibro(libro.id ?? libro._id)}
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
