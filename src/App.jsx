import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PaginaMain from "./pages/PaginaMain";
import Favoritos from "./pages/Favoritos";
import AgregarLibro from "./pages/AgregarLibro";
import EliminarLibro from "./pages/EliminarLibro";
import ProtectedRoute from "./componentes/ProtectedRoute";
import ProtectedAdminRoute from "./componentes/ProtectedAdminRoute";
import Reservas from "./pages/Reservas";

import "./style/pagina-main.css"; 
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <PaginaMain />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/libros"
                    element={
                        <ProtectedRoute>
                            <PaginaMain />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/favoritos"
                    element={
                        <ProtectedRoute>
                            <Favoritos />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reservas"
                    element={
                        <ProtectedRoute>
                            <Reservas />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedAdminRoute>
                            <AgregarLibro />
                        </ProtectedAdminRoute>
                    }
                />

                <Route
                    path="/admin/agregar-libro"
                    element={
                        <ProtectedAdminRoute>
                            <AgregarLibro />
                        </ProtectedAdminRoute>
                    }
                />

                <Route
                    path="/admin/eliminar-libro"
                    element={
                        <ProtectedAdminRoute>
                            <EliminarLibro />
                        </ProtectedAdminRoute>
                    }
                />

                <Route path="*" element={<div>Página no encontrada</div>} />
            </Routes>
        </div>
    );
}

export default App;
