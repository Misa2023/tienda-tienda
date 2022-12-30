import React, { useState, useEffect, useContext } from "react";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import { pedidosTodos } from "../../../controllers/Pedidos";
import { PDFViewer } from "@react-pdf/renderer";
import Recibo from "./Recibo";
import "./Compras.css";

const Compras = () => {
  const { usuario } = useContext(EstadoContexto);
  const [verRecibo, setVerRecibo] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [infoPedido, setInfoPedido] = useState();
  useEffect(() => {
    (async () => {
      const pedidosDB = await pedidosTodos(usuario.IdCliente);
      setPedidos(pedidosDB);
    })();
  }, [usuario]);
  const mostrarRecibo = (pedido) => {
    setVerRecibo(true);
    setInfoPedido(pedido);
  };
  return (
    <>
      <div className="titulo-paginas">
        <h1>MIS PEDIDOS</h1>
      </div>
      {verRecibo ? (
        <div className="contendor-pdf">
          <button
            onClick={() => setVerRecibo(false)}
            style={{
              color: "white",
              backgroundColor: "red",
              padding: "5px",
              fontSize: "16px",
              fontWeight: "bolder",
            }}
          >
            Cerrar COMPROBANTE DE PAGO "( X )"
          </button>
          <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <Recibo pedido={infoPedido} />
          </PDFViewer>
        </div>
      ) : null}
      {pedidos?.length === 0 ? (
        <p>No hay pedidos</p>
      ) : (
        <>
          {pedidos.map((pedido) => (
            <div key={pedido.IdPedido} className="contenedor-pedido">
              <div className="titulo-pedido">
                <div>
                  <p>N° Pedido: {pedido.NumeroPedido}</p>
                  <span>|</span>
                  <p>Fecha: {pedido.Fecha.toDate().toLocaleDateString()}</p>
                  <span>|</span>
                  <p style={{ fontWeight: "700" }}>
                    Monto total: S/. {pedido.Total}.00{" "}
                  </p>
                  <button
                    onClick={() => mostrarRecibo(pedido)}
                    style={{ color: "white", backgroundColor: "red" }}
                  >
                    Ver recibo
                  </button>
                </div>
                <div>
                  <button
                    style={
                      pedido.Estado === "pedido"
                        ? { color: "white", backgroundColor: "red" }
                        : { color: "black" }
                    }
                  >
                    Pedido
                  </button>
                  <button
                    style={
                      pedido.Estado === "ruta"
                        ? { color: "white", backgroundColor: "red" }
                        : { color: "black" }
                    }
                  >
                    Ruta
                  </button>
                  <button
                    style={
                      pedido.Estado === "entregado"
                        ? { color: "white", backgroundColor: "red" }
                        : { color: "black" }
                    }
                  >
                    Entregado
                  </button>
                </div>
              </div>
              <div className="productos-pedido">
                {pedido.Productos.map((producto) => (
                  <div
                    key={producto.IdProducto}
                    style={{ marginBottom: "5px" }}
                  >
                    <img src={producto.ImagenesUrl[0]} alt="" />
                    <p>{producto.Nombre}</p>
                    <span>|</span>
                    <p>Cantidad: {producto.Unidades}</p>
                    <span>|</span>
                    <p style={{ fontWeight: "700" }}>
                      Precio: S/. {producto.Precio}.00{" "}
                    </p>{" "}
                  </div>
                ))}
              </div>
              <hr />
              <div style={{ padding: "8px" }}>
                <label>Destinatario: </label>
                <span>{pedido.Nombres + pedido.Apellidos}</span>
                <br />
                <label>Celular: </label>
                <span>{pedido.Celular ? pedido.Celular : ""}</span>
                <br />
                {typeof pedido.Direccion === "object" ? (
                  <>
                    <hr />

                    <p
                      style={{
                        padding: "5px 0px",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      Producto enviado a tu dirección
                    </p>
                    <hr />
                    <label>Región: </label>
                    <span>{pedido.Direccion.region}</span>
                    <br />
                    <label>Provincia: </label>
                    <span>{pedido.Direccion.provincia}</span>
                    <br />
                    <label>Distrito: </label>
                    <span>{pedido.Direccion.distrito}</span>
                    <br />
                    <label>Dirección: </label>
                    <span>{pedido.Direccion.direccion}</span>
                    <br />
                    <label>Recomendación de envio: </label>
                    <span>{pedido.Direccion.recomendacion}</span>
                  </>
                ) : (
                  <>
                    <hr />

                    <p
                      style={{
                        padding: "5px 0px",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      Producto para recoger en Tienda Logan
                    </p>
                    <hr />
                    <label>Dirección tienda LOGAN: </label>
                    <span>{pedido.Direccion}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Compras;
