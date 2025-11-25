import React from "react";
import "../style/barra-busqueda.css";

const BarraBusqueda = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="barra-busqueda">
            <input 
                type="text" 
                placeholder="Buscar por título, autor o género..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="input-busqueda"
            />
        </div>
    );
};

export default BarraBusqueda;
