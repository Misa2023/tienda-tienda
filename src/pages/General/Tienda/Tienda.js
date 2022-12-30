import React, { useState, useEffect, useCallback } from "react";
import PanelFiltro from "./PanelFiltro";
import ProductoSolo from "../../../components/ProductoSolo/ProductoSolo";
import { todosProductos } from "../../../controllers/Inicio";
import "./Tienda.css";

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [selectCategoria, setSelectCategoria] = useState(null);
  const [selectEtiquetas, setSelectEtiquetas] = useState({});

  const cambiarCategoria = (valor) => {
    setSelectCategoria(valor);
  };

  const cambiarModelos = (etiqueta) => {
    const propiedad = Object.keys(etiqueta).join();
    const valor = Object.values(etiqueta).join();
    setSelectEtiquetas({
      ...selectEtiquetas,
      [propiedad]: valor,
    });
  };

  useEffect(() => {
    (async () => {
      const productosDB = await todosProductos();
      setProductos(productosDB);
    })();
  }, []);

  const aplicarFiltros = useCallback(() => {
    let productosActualizados = productos;
    if (selectCategoria) {
      productosActualizados = productosActualizados.filter(
        (producto) => producto.Categoria === selectCategoria
      );
    }
    if (Object.keys(selectEtiquetas).length) {
      const etiquetaArray = Object.entries(selectEtiquetas);
      const etiquetaFiltrada = etiquetaArray.filter(
        ([key, value]) => value === "true"
      );
      const etiquetasEnviar = Object.keys(Object.fromEntries(etiquetaFiltrada));

      productosActualizados = productosActualizados.filter((itemX) => {
        const array1 = itemX.Etiqueta;
        var result = array1.filter((el) => etiquetasEnviar.includes(el));
        return result.length > 0;
      });

      if (productosActualizados.length === 0) {
        productosActualizados = productos;
        setSelectEtiquetas({});
        setSelectCategoria(null);
      }
    }
    setProductosFiltrados(productosActualizados);
  }, [selectCategoria, productos, selectEtiquetas]);

  useEffect(() => {
    aplicarFiltros();
  }, [aplicarFiltros]);

  return (
    <>
      {productos?.length === 0 ? (
        <></>
      ) : (
        <div>
          <div>
            <div className="contenedor-panel-filtro">
              <PanelFiltro
                cambiarCategoria={cambiarCategoria}
                categoriaSeleccionada={selectCategoria}
                cambiarModelos={cambiarModelos}
              />
            </div>
            <div className="contenedor-resultados-filtro">
              <div className="contenedor-card-filtro">
                {productosFiltrados?.length !== 0
                  ? productosFiltrados.map((producto) => (
                      <ProductoSolo
                        key={producto.IdProducto}
                        producto={producto}
                      />
                    ))
                  : productos.map((producto) => (
                      <ProductoSolo
                        key={producto.IdProducto}
                        producto={producto}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tienda;
/*
productosFiltrados.map((producto) => (
                    <ProductoSolo
                      key={producto.IdProducto}
                      producto={producto}
                    />
                  ))

*/

/*
<div className='emptyView-wrap'>
                <img src='/images/gif/empty.gif' alt='' />
              </div>

*/
