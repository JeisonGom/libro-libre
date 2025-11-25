import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import MenuOpciones from "../componentes/MenuOpciones";
import ReservaTarjetaLibro from "../componentes/ReservaTarjetaLibro";
import ModalReserva from "../componentes/ModalReserva";
import "../style/reservas.css";

export default function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seleccionada, setSeleccionada] = useState(null);
    const [error, setError] = useState("");

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarioId = usuario?.id || usuario?._id;

    useEffect(() => {
    if (!usuarioId) {
        setError("No estás logueado");
        setLoading(false);
        return;
    }
    fetchReservas();
    }, [usuarioId]);

    const fetchReservas = async () => {
    setLoading(true);
    setError("");
    try {
        const res = await api.get(`/reservas/usuario/${usuarioId}`);
        console.log("📦 Reservas cargadas:", res.data);
        setReservas(res.data || []);
    } catch (e) {
        console.error("❌ Error cargar reservas:", e);
        setError("Error al cargar reservas");
    } finally {
        setLoading(false);
    }
    };

    const handleClickTarjeta = (reserva) => {
    console.log("🖱️ Click en tarjeta, abriendo modal con:", reserva);
    setSeleccionada(reserva);
    };

    const handleCancelar = async (reservaId) => {
    if (!window.confirm("¿Cancelar reserva?")) return;
    try {
        console.log("🗑️ Cancelando reserva:", reservaId);
        await api.delete(`/reservas/${reservaId}`);
        setReservas(prev => prev.filter(r => r.id !== reservaId));
        console.log("✅ Cancelada");
    } catch (e) {
        console.error("❌ Error cancelar:", e);
        alert("Error al cancelar");
    }
    };

    return (
    <div className="reservas-container">
        <MenuOpciones />
        <h1>Mis Reservas</h1>

        {loading && <p className="mensaje-carga">Cargando...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && reservas.length === 0 && <p className="sin-reservas">Sin reservas</p>}

        {!loading && reservas.length > 0 && (
        <div className="books-grid">
            {reservas.map((r) => (
            <ReservaTarjetaLibro
                key={r.id}
                reserva={r}
                usuario={usuario}
                onClick={handleClickTarjeta}
                onCancelar={handleCancelar}
            />
            ))}
        </div>
        )}

        {seleccionada && (
        <ModalReserva
            reserva={seleccionada}
            onClose={() => {
            console.log("🔚 Cerrando modal");
            setSeleccionada(null);
            }}
        />
        )}
    </div>
    );
}
