import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";  
import "../style/historial-reservas.css";
import { cancelarReserva } from "../services/reservaService";

export default function HistorialReservas({ usuarioId, onBack }) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!usuarioId) {
            setError("Usuario no identificado");
            setCargando(false);
            return;
        }
        fetchHistorial();
    }, [usuarioId]);

    const fetchHistorial = async () => {
        setCargando(true);
        setError(null);
        try {
            const res = await api.get(`/reservas/usuario/${usuarioId}`);
            setReservas(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error(e);
            setError(
                e.response?.data?.message ||
                e.response?.data ||
                "Error al obtener historial"
            );
        } finally {
            setCargando(false);
        }
    };

    const handleCancelar = async (libroId, usuarioId) => {
        if (!window.confirm("¿Seguro que quieres cancelar esta reserva?")) return;

        try {
            await cancelarReserva(libroId, usuarioId);
            alert("Reserva cancelada");
            fetchHistorial();
        } catch (e) {
            console.error(e);
            alert(
                e.response?.data ||
                e.message ||
                "No se pudo cancelar la reserva."
            );
        }
    };

    return (
        <div className="historial-container">
            <div className="historial-header">
                <h2>Historial de reservas</h2>
                {onBack && (
                    <button className="btn-back" onClick={onBack}>
                        ← Volver
                    </button>
                )}
            </div>

            {cargando ? (
                <p className="historial-info">Cargando...</p>
            ) : error ? (
                <p className="historial-error">{error}</p>
            ) : reservas.length === 0 ? (
                <p className="historial-info">No tienes reservas registradas.</p>
            ) : (
                <div className="historial-table-wrapper">
                    <table className="historial-table">
                        <thead>
                            <tr>
                                <th>Portada</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservas.map((reserva) => {
                                const libro = reserva.libro || {};
                                const fechaRaw = reserva.fechaReserva || reserva.fecha || null;
                                const fecha = fechaRaw
                                    ? new Date(fechaRaw).toLocaleString()
                                    : "-";
                                const estado = "Activa";

                                return (
                                    <tr key={reserva.id ?? reserva._id}>
                                        <td className="col-portada">
                                            {libro.portadaUrl ? (
                                                <img
                                                    src={libro.portadaUrl}
                                                    alt={`Portada ${libro.titulo}`}
                                                    className="historial-portada"
                                                />
                                            ) : (
                                                <div className="historial-portada placeholder">—</div>
                                            )}
                                        </td>

                                        <td>{libro.titulo || "Sin título"}</td>
                                        <td>{libro.autor || "—"}</td>
                                        <td>
                                            <span className="badge badge-activa">{estado}</span>
                                        </td>
                                        <td>{fecha}</td>
                                        <td>
                                            <button
                                                className="btn-cancelar-reserva"
                                                onClick={() => handleCancelar(libro.id, usuarioId)}
                                            >
                                                Cancelar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
