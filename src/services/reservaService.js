import api from "../api/axiosConfig";

export async function reservarLibro(libroId, usuarioId) {
  try {
    console.log("📤 reservarLibro request", { libroId, usuarioId });
    const response = await api.post("/reservas/reservar", {
      idLibro: libroId,
      idUsuario: usuarioId,
    });
    console.log("📥 reservarLibro response", response.status, response.data);
    return response.data;
  } catch (error) {
    console.error("Error al reservar libro (service):", error.response?.status, error.response?.data || error.message);
    throw error;
  }
}

export async function cancelarReservaPorId(reservaId) {
  try {
    console.log("📤 cancelarReservaPorId request", reservaId);
    const response = await api.delete(`/reservas/${reservaId}`);
    console.log("📥 cancelarReservaPorId response", response.status, response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cancelar reserva (service):", error.response?.status, error.response?.data || error.message);
    throw error;
  }
}

export default api;