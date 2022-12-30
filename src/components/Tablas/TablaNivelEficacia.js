import React, { useState } from "react";
import CalcularPantalla from "../../util/CalcularPantalla";

const TablaNivelEficacia = ({ pedidos }) => {
  const anchoPantalla = CalcularPantalla();

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 20;

  const limiteNumeroPagina = 5;
  const [limiteMaximoPagina, setLimiteMaximoPagina] = useState(5);
  const [limiteMinimoPagina, setLimiteMinimoPagina] = useState(0);

  const paginas = [];
  for (let i = 1; i <= Math.ceil(pedidos.length / elementosPorPagina); i++) {
    paginas.push(i);
  }

  const indiceUltimo = paginaActual * elementosPorPagina;
  const indicePrimero = indiceUltimo - elementosPorPagina;
  const elementoActual = pedidos.slice(indicePrimero, indiceUltimo);

  const clickNumero = (event) => {
    setPaginaActual(Number(event.target.id));
  };

  const numeroDePaginas = paginas.map((number) => {
    if (number < limiteMaximoPagina + 1 && number > limiteMinimoPagina) {
      return (
        <li
          key={number}
          id={number}
          onClick={clickNumero}
          className={paginaActual === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const botonSiguiente = () => {
    setPaginaActual(paginaActual + 1);

    if (paginaActual + 1 > limiteMaximoPagina) {
      setLimiteMaximoPagina(limiteMaximoPagina + limiteNumeroPagina);
      setLimiteMinimoPagina(limiteMinimoPagina + limiteNumeroPagina);
    }
  };

  const botonRetroceder = () => {
    setPaginaActual(paginaActual - 1);

    if ((paginaActual - 1) % limiteNumeroPagina === 0) {
      setLimiteMaximoPagina(limiteMaximoPagina - limiteNumeroPagina);
      setLimiteMinimoPagina(limiteMinimoPagina - limiteNumeroPagina);
    }
  };

  let tablaIncrementar = null;
  if (paginas.length > limiteMaximoPagina) {
    tablaIncrementar = <li onClick={botonSiguiente}> &hellip; </li>;
  }

  let tablaRetroceder = null;
  if (limiteMinimoPagina >= 1) {
    tablaRetroceder = <li onClick={botonRetroceder}> &hellip; </li>;
  }

  return (
    <>
      <div className="contenedor-tabla-controles">
        <div className="tabla-categorias-controles">          
          <button
            onClick={botonRetroceder}
            disabled={paginaActual === paginas[0] ? true : false}
          >
            &laquo;
          </button>
          {tablaRetroceder}
          {numeroDePaginas}
          {tablaIncrementar}
          <button
            onClick={botonSiguiente}
            disabled={
              paginaActual === paginas[paginas.length - 1] ? true : false
            }
          >
            &raquo;
          </button>
        </div>
        {anchoPantalla.ancho >= 800 ? (
          <table className="tabla-categorias">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Ítem</th>
                <th style={{ textAlign: "center" }}>Fecha</th>
                <th style={{ textAlign: "center" }}>Ventas realizadas</th>
                <th style={{ textAlign: "center" }}>Ventas esperadas</th>
                <th style={{ textAlign: "center" }}>Nivel de eficacia</th>
              </tr>
            </thead>
            <tbody>
              {elementoActual.map((elemento, index) => (
                <tr key={elemento.Fecha}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{elemento.Fecha}</td>
                  <td style={{ textAlign: "center" }}>{elemento.Venta}</td>
                  <td style={{ textAlign: "center" }}>{10}</td>
                  <td style={{ textAlign: "center" }}>
                    {(elemento.Venta / 10) * 100}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="tabla-categorias">
            <thead>
              <tr>
                <th>NIVEL DE EFICACIA</th>
              </tr>
            </thead>
            <tbody>
              {elementoActual.map((elemento, index) => (
                <tr key={elemento.Fecha}>
                  <td>
                    <p>
                      <b>Ítem: </b> {index + 1}
                    </p>
                    <p>
                      <b>Fecha: </b>
                      {elemento.Fecha}
                    </p>
                    <p>
                      <b>Ventas realizadas: </b>
                      {elemento.Venta}
                    </p>
                    <p>
                      <b>Ventas esperadas: </b>
                      {10}
                    </p>
                    <p>
                      <b>Nivel de eficacia: </b>
                      {(elemento.Venta / 10) * 100}%
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default TablaNivelEficacia;
