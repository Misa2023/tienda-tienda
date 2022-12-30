import React, { useState } from "react";
import CalcularPantalla from "../../util/CalcularPantalla";
//import "./Tabla.css";

const TablaClientes = ({ clientes }) => {
  const anchoPantalla = CalcularPantalla();

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 30;

  const limiteNumeroPagina = 5;
  const [limiteMaximoPagina, setLimiteMaximoPagina] = useState(5);
  const [limiteMinimoPagina, setLimiteMinimoPagina] = useState(0);

  const paginas = [];
  for (let i = 1; i <= Math.ceil(clientes.length / elementosPorPagina); i++) {
    paginas.push(i);
  }

  const indiceUltimo = paginaActual * elementosPorPagina;
  const indicePrimero = indiceUltimo - elementosPorPagina;
  const elementoActual = clientes.slice(indicePrimero, indiceUltimo);

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
        {anchoPantalla.ancho >= 700 ? (
          <table className="tabla-categorias">
            <thead>
              <tr>
                <th>Nombres y Apellidos</th>
                <th>Celular</th>
                <th>Correo</th>
                <th>Genero</th>
                <th>Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {elementoActual.map((elemento) => (
                <tr key={elemento.IdPersonal}>
                  <td>
                    {elemento.Nombres} {elemento.Apellidos}
                  </td>
                  <td>{elemento.Celular}</td>
                  <td>{elemento.Correo}</td>
                  <td>{elemento.Genero}</td>
                  <td>{elemento.FechaNacimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="tabla-categorias">
            <thead>
              <tr>
                <th>CLIENTES</th>
              </tr>
            </thead>
            <tbody>
              {elementoActual.map((elemento) => (
                <tr key={elemento.IdPersonal}>
                  <td>
                    <p>
                      <b>NOMBRES Y APELLIDOS: </b> {elemento.Nombres}
                    </p>
                    <p>
                      <b>CELULAR: </b>
                      {elemento.Celular}
                    </p>
                    <p>
                      <b>CORREO: </b> {elemento.Correo}
                    </p>
                    <p>
                      <b>GENERO: </b>
                      {elemento.Genero}
                    </p>
                    <p>
                      <b>NACIMIENTO: </b>
                      {elemento.FechaNacimiento}
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

export default TablaClientes;
