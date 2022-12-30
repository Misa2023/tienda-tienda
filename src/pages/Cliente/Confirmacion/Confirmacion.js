import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { carritoTraerUno } from "../../../controllers/Carrito";
import { useHistory } from "react-router-dom";
let functionsPagarMP =
  "https://us-central1-ecommerce-logan-29604.cloudfunctions.net/creaPagoMP";
//let functionsPagarMP = "http://localhost:5001/ecommerce-logan-29604/us-central1/creaPagoMP";

const Confirmacion = () => {
  const history = useHistory();
  const [compraExitosa, setCompraExitosa] = useState("esperando");
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let payment_id = query.get("payment_id");
  let status = query.get("status");
  const idCliente = localStorage.getItem("IdCliente");

  useEffect(() => {
    (async () => {
      if (payment_id !== null && status === "approved") {
        const carritoDB = await carritoTraerUno(idCliente);
        //console.log("FRONT: ", carritoDB)
        const pedido = {
          payment_id: payment_id,
          status: status,
          carritoDB: carritoDB,
        };

        const request = await Axios({
          method: "post",
          baseURL: functionsPagarMP,
          data: JSON.stringify(pedido),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://mochilaslogan.com",
          },
          withCredentials: true,
        });
        //"Access-Control-Allow-Origin": "https://mochilaslogan.com",

        if (request.data) {
          setCompraExitosa("comprado");
          setTimeout(() => {
            history.push(`/cliente/mis-compras`);
          }, 4000);
        } else {
          console.log("No se puedo comprar");
          setCompraExitosa("error");
        }
      }
    })();
  }, [payment_id, status, idCliente, history]);

  return (
    <>
      <div className="titulo-paginas">
        <h1>CONFIRMACIÓN DEL PEDIDO</h1>
      </div>
      <p>Esperando confirmación de la compra:</p>
      {compraExitosa === "esperando" && <h3>Procesando....</h3>}
      {compraExitosa === "comprado" && <h3>Gracias por comprar</h3>}
      {compraExitosa === "error" && <h3>Error en la compra</h3>}
    </>
  );
};

export default Confirmacion;
