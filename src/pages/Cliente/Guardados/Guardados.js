import React, { useState, useEffect, useContext } from "react";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import { guardadosTodos } from "../../../controllers/Guardar";
import ProductoSolo from "../../../components/ProductoSolo/ProductoSolo";
import "./Guardados.css";

const Guardados = () => {
  const { usuario } = useContext(EstadoContexto);
  const [guardados, setGuardados] = useState([]);
  useEffect(() => {
    (async () => {
      const guardadosDB = await guardadosTodos(usuario.IdCliente);
      setGuardados(guardadosDB);
    })();
  }, [usuario]);
  return (
    <>
      <div className="titulo-paginas">
        <h1>GUARDADOS PARA COMPRAR</h1>
      </div>
      {guardados?.length === 0 ? (
        <p>No hay pedidos</p>
      ) : (
        <div className="contenedor-productos-favoritos">
          <div className="producto-favorito">
            {guardados.map((producto) => (
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

export default Guardados;
