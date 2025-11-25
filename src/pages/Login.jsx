import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usuarioApi from "../api/usuarioApi";
import "../style/fondo.css";
import "../style/login.css";

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMensaje("");

    try {
      const usuario = await usuarioApi.loginORegistro(nombre, contrasena);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      navigate("/libros");
    } catch (error) {
      const msg =
        error?.message || error?.response?.data || "Error al iniciar sesión";
      setErrorMensaje(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fondo-animado login-page">
      <div className="login-glass">
        <h2>Iniciar Sesión</h2>
        {errorMensaje && <p className="error">{errorMensaje}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>

        <p className="login-register-text">
          ¿No tienes cuenta?{" "}
          <span className="login-register-link" onClick={() => navigate("/registro")}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}
