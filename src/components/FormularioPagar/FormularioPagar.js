import React, { useContext, useState } from "react";
import Axios from "axios";
import { EstadoContexto } from "../../context/EstadoGeneral";
import { agregarCarrito } from "../../controllers/Carrito";
import EnviarWhatsAppCarrito from "../../util/EnviarWhatsAppCarrito";
import CargandoPagina from "./CargandoPagina";
import "./FormularioPagar.css";
let functionGenerarID =
  "https://us-central1-ecommerce-logan-29604.cloudfunctions.net/crearIdMP";
//let functionGenerarID =  "http://localhost:5001/ecommerce-logan-29604/us-central1/crearIdMP";

const FormularioPagar = ({ direccion }) => {
  const [cargando, setCargando] = useState(false);

  const { productos, totalAPagar, usuario, eliminarCarrito } =
    useContext(EstadoContexto);
  const exiteUsuario = Object.keys(usuario).length;

  const pagarMercadoPago = async () => {
    //console.log(JSON.stringify(productos));

    if (exiteUsuario) {
      const request = await Axios({
        method: "post",
        baseURL: functionGenerarID,
        data: JSON.stringify(productos),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://mochilaslogan.com",
        },
        withCredentials: true,
      });
      //"Access-Control-Allow-Origin": "https://mochilaslogan.com",
      setCargando(true);

      //console.log(request);
      if (request.data) {
        const total = totalAPagar();
        //console.log(total, usuario, productos, direccion);
        agregarCarrito(total, usuario, productos, direccion);
        //console.log("request.data: ", request.data)
        setTimeout(() => {
          window.location.href = request.data.url;
          setCargando(false);
          eliminarCarrito();
        }, 5000);
      } else {
        console.log("Hubo un error con mercado pago");
      }
    } else {
      console.log("Debe registrarse para comprar");
    }
  };
  return (
    <>
      <div className="formulario-pagar">
        {cargando && <CargandoPagina />}

        <div className="formulario-pagar-titulo">
          <h3>RESUMEN PEDIDO</h3>
        </div>
        <div className="contenedor-resultado">
          <p>Cantidad productos: </p>
          <span style={{ color: "red" }}>{productos?.length}</span>
        </div>
        <div className="contenedor-resultado">
          <p>Total a pagar: </p>
          <span style={{ color: "red" }}>S/. {totalAPagar()}.00</span>
        </div>
        <div className="contenedor-resultado">
          <p>Envio: </p>
          <span style={{ color: "black" }}>A tratar</span>
        </div>
        <div className="contenedor-boton-pagar">
          <button
            className="boton-formulario"
            onClick={() => pagarMercadoPago()}
          >
            Pagar ahora
          </button>
        </div>
        <div className="contenedor-descripcion-imagen">
          <img src="/images/pagos/tarjeta-visa-mastercard.jpg" alt="" />
        </div>
        <div className="contenedor-descripcion-imagen">
          <img src="/images/pagos/compra-y-participa.jpg" alt="" />
        </div>
        <div className="contenedor-descripcion-imagen">
          <img src="/images/pagos/compra-y-participa.jpg" alt="" />
        </div>
        <div className="contenedor-boton-ayuda">
          <button
            onClick={() => EnviarWhatsAppCarrito(productos, totalAPagar())}
            className="card-empresa-iconos"
          >
            <img src="/icons/GeneralIconoWhatsApp.svg" alt="logo" />
            <p>Ayuda al WhatsApp 936234467</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default FormularioPagar;
