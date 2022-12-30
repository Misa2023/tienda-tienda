import React, { useState, useEffect } from "react";
import { categoriasTodas } from "../../../controllers/Categorias";

const FiltroCategoria = ({ cambiarCategoria, categoriaSeleccionada }) => {
  const [categoriasDB, setCategoriasDB] = useState([]);
  useEffect(() => {
    (async () => {
      const categoriaDBRes = await categoriasTodas();
      setCategoriasDB(categoriaDBRes);
    })();
  }, []);
  const verificarCateogoria = (categoriaItem) => {
    if (categoriaSeleccionada === categoriaItem.Nombre) {
      cambiarCategoria(null);
    } else {
      cambiarCategoria(categoriaItem.Nombre);
    }
  };

  return (
    <div
      style={{
        margin: "10px 0px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {categoriasDB.map((categoriaItem) => (
        <button className="boton-mediano"
          key={categoriaItem.IdCategoria}
          onClick={() => verificarCateogoria(categoriaItem)}
        >
          {categoriaItem.Nombre}
        </button>
      ))}
    </div>
  );
};

export default FiltroCategoria;
