import api from "./axiosConfig";

const libroPublicApi = {
    obtenerTodos: async () => {
    const res = await api.get("/public/libros");
    return res.data;
    },

    obtenerPorId: async (id) => {
    const res = await api.get(`/public/libros/${id}`);
    return res.data;
    },

    filtrarPorGenero: async (genero) => {
    const res = await api.get(`/public/libros/genero/${genero}`);
    return res.data;
    },

    buscarPorAutor: async (autor) => {
    const res = await api.get(`/public/libros/autor/${autor}`);
    return res.data;
    },

    buscarPorTitulo: async (titulo) => {
    const res = await api.get(`/public/libros/titulo/${titulo}`);
    return res.data;
    },
};

export default libroPublicApi;
