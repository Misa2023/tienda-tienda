import React from "react";
import FiltroCategoria from "./FiltroCategoria";
import FiltroModelos from "./FiltroModelos";

const PanelFiltro = ({
  cambiarCategoria,
  categoriaSeleccionada,
  cambiarModelos,
}) => {
  return (
    <div>
      <div className="input-group">
        <h3 className="label">Categorias</h3>
        <FiltroCategoria
          cambiarCategoria={cambiarCategoria}
          categoriaSeleccionada={categoriaSeleccionada}
        />
        <h3 className="label">Modelos</h3>
        <FiltroModelos cambiarModelos={cambiarModelos} />
      </div>
    </div>
  );
};

export default PanelFiltro;
