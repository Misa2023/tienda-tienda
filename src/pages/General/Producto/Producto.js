import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { productoUno } from "../../../controllers/Productos";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import { favoritoAgregar } from "../../../controllers/Favoritos";
import { visitasPaginas } from "../../../controllers/Analytics";
import EnviarWhatsAppProducto from "../../../util/EnviarWhatsAppProducto";

import "./Producto.css";

const Producto = ({ favorito }) => {
  const [producto, setProducto] = useState({});
  const [imagen, setImagen] = useState("");
  const exiteProducto = Object.keys(producto).length;
  let { id } = useParams();
  useEffect(() => {
    (async () => {
      const productoDB = await productoUno(id);
      setProducto({
        IdProducto: id,
        ...productoDB,
      });
      setImagen(productoDB.ImagenesUrl[0]);
      const nombre = `visitas-producto-${productoDB.Nombre}`;
      visitasPaginas(nombre);
    })();
  }, [id]);

  const { agregarProducto, usuario, productos } = useContext(EstadoContexto);
  const exiteUsuario = Object.keys(usuario).length;

  const crearCarrito = (producto) => {
    if (productos.length !== 0) {
      var igualesCarrito = false;
      const producsActual = [...productos];
      Object.entries(producsActual).forEach(([key, value]) => {
        if (value.IdProducto === producto.IdProducto) {
          igualesCarrito = true;
        }
      });
      if (igualesCarrito) {
        console.log("Ya ha sido añadido");
      } else {
        agregarProducto(producto);
      }
    } else {
      agregarProducto(producto);
    }
  };

  const cambiarImagen = (index) => {
    setImagen(producto.ImagenesUrl[index]);
  };

  const tipoImagen = imagen.split(".").pop().split(/|\?/)[0];

  return (
    <>
      {exiteProducto === 0 ? (
        <></>
      ) : (
        <>
          <div className="titulo-paginas" style={{ padding: "10px" }}>
            <h1>{producto.Categoria}</h1>
          </div>
          <div className="contenedor-grid-producto">
            <div className="grid-producto-imagen">
              <div className="grid-producto-imagen-contenedor">
                <div className="grid-producto-imagen-contenedor-items">
                  {producto.ImagenesUrl.map((imagen, index) => (
                    <div key={index}>
                      <img
                        src={imagen}
                        style={{ cursor: "pointer" }}
                        alt=""
                        onClick={() => cambiarImagen(index)}
                      />
                    </div>
                  ))}{" "}
                </div>
                <div className="grid-producto-imagen-contenedor-solo">
                  {tipoImagen === "j" || tipoImagen === "p" ? (
                    <img src={imagen} alt="" />
                  ) : (
                    <model-viewer
                      style={{
                        width: "100%",
                        height: "500px",
                        backgroundColor: "white",
                      }}
                      bounds="tight"
                      src={imagen}
                      ar
                      ar-modes="webxr scene-viewer quick-look"
                      camera-controls
                      poster="/images/poster-mochila-logan.webp"
                      environment-image="neutral"
                      shadow-intensity="1"
                      auto-rotate
                    >
                      <div className="progress-bar hide" slot="progress-bar">
                        <div className="update-bar"></div>
                      </div>
                      <button slot="ar-button" id="ar-button">
                        Ver en tu espacio
                      </button>
                    </model-viewer>
                  )}
                </div>
              </div>
            </div>
            <div className="grid-producto-descripcion">
              <h1>{producto.Nombre}</h1>
              <h3 style={{ color: "red", fontSize: "25px" }}>
                S/.{producto.Precio}
              </h3>
              <br />
              <div>
                <button onClick={() => crearCarrito(producto)}>
                  <img src="/icons/GeneralIconoAnadirCarro.svg" alt="logo" />
                </button>
                {exiteUsuario ? (
                  favorito ? (
                    <button>x</button>
                  ) : (
                    <button
                      onClick={() =>
                        favoritoAgregar(usuario.IdCliente, producto)
                      }
                    >
                      <img src="/icons/GeneralIconoCorazon.svg" alt="logo" />
                    </button>
                  )
                ) : (
                  <button>
                    <img src="/icons/GeneralIconoCorazon.svg" alt="logo" />
                  </button>
                )}
                <button onClick={() => EnviarWhatsAppProducto(producto)}>
                  <img src="/icons/GeneralIconoWhatsApp.svg" alt="logo" />
                </button>
              </div>
              <br />
              <hr />
              <br />
              <div style={{ border: "1px solid #ccc", padding: "5px" }}>
                <p>
                  <strong>Categoria: </strong>
                  {producto.Categoria}
                </p>
                <br />
                <p>
                  <strong>Marca: </strong>
                  {producto.Marca}
                </p>
                <br />
                <p>
                  <strong>Etiqueta: </strong>
                  {producto.Etiqueta[0]}
                </p>
                <br />
                <p>
                  <strong>Descripcion: </strong>
                  {producto.Descripcion}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Producto;
