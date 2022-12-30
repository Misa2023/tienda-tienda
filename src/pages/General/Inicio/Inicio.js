import React, { useState, useEffect } from "react";
import { todosProductos } from "../../../controllers/Inicio";
import ProductoSolo from "../../../components/ProductoSolo/ProductoSolo";
import Slider from "../../../components/Slider/Slider";
import { visitasPaginas } from "../../../controllers/Analytics";
import { actualizarVisitas } from "../../../controllers/Visitas";
import "./Inicio.css";

const Inicio = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    (async () => {
      const productosDB = await todosProductos();
      setProductos(productosDB);
    })();
  }, []);

  useEffect(() => {
    const nombre = "visitas-pagina-inicio";
    visitasPaginas(nombre);
  }, []);

  useEffect(() => {
    const nombreCookieSet = "IPCLIENTE";
    const nombreCookieGet = "IPCLIENTE=";
    const arrayCookie = document.cookie.split(";");
    let respuestaCookie;
    for (let i = 0; i < arrayCookie.length; i++) {
      let c = arrayCookie[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(nombreCookieGet) === 0) {
        respuestaCookie = c.substring(nombreCookieGet.length, c.length);
      }
    }
    if (respuestaCookie) {
    } else {
      fetch("https://api.ipify.org?format=jsonp?callback=?", {
        method: "GET",
        headers: {},
      })
        .then((res) => {
          return res.text();
        })
        .then((ipCliente) => {
          const fecha = new Date();
          fecha.setTime(fecha.getTime() + 24 * 60 * 60 * 1000);
          const expiracion = "expires=" + fecha.toUTCString();
          document.cookie =
            nombreCookieSet + "=" + ipCliente + ";" + expiracion + ";path=/";

          const fecha2 = new Date();
          const anio = fecha2.getFullYear();
          const mes = `${fecha2.getMonth() + 1}`.padStart(2, "0")
          const dia =  `${fecha2.getDate()}`.padStart(2, "0")
          var fechaID = [dia, mes, anio].join("-");
          actualizarVisitas(fechaID);
        });
    }
  }, []);
  return (
    <>
      <Slider />
      <div className="contenedor-subtitulo">
        <h2>Todos los productos</h2>
      </div>
      <div className="contenedor-equipo-lista">
        <div className="contenedor-card-centrar">
          {productos?.length === 0 ? (
            <></>
          ) : (
            productos.map((producto) => (
              <ProductoSolo key={producto.IdProducto} producto={producto} />
            ))
          )}
        </div>
      </div>
      <div className="contenedor-subtitulo">
        <h2>Mochilas</h2>
      </div>
      <div className="contenedor-equipo-lista">
        <div className="contenedor-card-centrar">
          {productos?.length === 0 ? (
            <></>
          ) : (
            productos.map(
              (producto) =>
                producto.Categoria === "Mochilas" && (
                  <ProductoSolo key={producto.IdProducto} producto={producto} />
                )
            )
          )}
        </div>
      </div>
      <div className="contenedor-subtitulo">
        <h2>Maletines</h2>
      </div>
      <div className="contenedor-equipo-lista">
        <div className="contenedor-card-centrar">
          {productos?.length === 0 ? (
            <></>
          ) : (
            productos.map(
              (producto) =>
                producto.Categoria === "Maletines" && (
                  <ProductoSolo key={producto.IdProducto} producto={producto} />
                )
            )
          )}
        </div>
      </div>{" "}
    </>
  );
};

export default Inicio;
