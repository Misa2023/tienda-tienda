import React, { useState, useEffect, useContext } from "react";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import { favoritosTodos } from "../../../controllers/Favoritos";
import ProductoSolo from "../../../components/ProductoSolo/ProductoSolo";
import "./Favoritos.css";

const Favoritos = () => {
  const { usuario } = useContext(EstadoContexto);
  const [favoritos, setFavoritos] = useState([]);
  useEffect(() => {
    (async () => {
      const favoritosDB = await favoritosTodos(usuario.IdCliente);
      setFavoritos(favoritosDB);
    })();
  }, [usuario]);
  return (
    <>
      <div className="titulo-paginas">
        <h1>MIS PRODUCTOS FAVORITOS</h1>
      </div>
      {favoritos?.length === 0 ? (
        <p>No hay pedidos</p>
      ) : (
        <div className="contenedor-productos-favoritos">
          <div className="producto-favorito">
            {favoritos.map((producto) => (
              <ProductoSolo
                key={producto.IdProducto}
                producto={producto}
                favorito = {true}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favoritos;
