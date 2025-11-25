import api from "./axiosConfig";

const libroAdminApi = {
    agregarLibro: async (libro, nombreUsuario) => {
    const res = await api.post("/admin/libros", libro, { params: { nombreUsuario } });
    return res.data;
    },

    actualizarLibro: async (id, datos, nombreUsuario) => {
    const res = await api.put(`/admin/libros/${id}`, datos, { params: { nombreUsuario } });
    return res.data;
    },

    eliminarLibro: async (id, nombreUsuario) => {
    const res = await api.delete(`/admin/libros/${id}`, { params: { nombreUsuario } });
    return res.data;
    },
};

export default libroAdminApi;
