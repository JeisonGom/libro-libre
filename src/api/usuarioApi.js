import api from "./axiosConfig"; 

const usuarioApi = {
    loginORegistro: async (nombre, contrasena) => {
    try {
        const response = await api.post("/usuarios/login", { nombre, contrasena });
        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error.response?.data || error.message || "Error de conexión con el servidor";
    }
    },

    registrar: async (nombre, contrasena) => {
    try {
        const response = await api.post("/usuarios/registro", { nombre, contrasena });
        return response.data;
    } catch (error) {
        console.error("Error al registrar:", error);
        throw error.response?.data || error.message || "Error de conexión con el servidor";
    }
    },

    obtenerPerfil: async (nombre) => {
    try {
        const response = await api.get("/usuarios/perfil", { params: { nombre } });
        return response.data;
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        throw error.response?.data || error.message || "Error al obtener perfil";
    }
    },

    esAdmin: async (nombre) => {
    try {
        const response = await api.get("/usuarios/es-admin", { params: { nombre } });
        return response.data;
    } catch (error) {
        console.error("Error al verificar admin:", error);
        throw error.response?.data || false;
    }
    }
};

export default usuarioApi;
