import React, { useState } from "react";
import CalcularPantalla from "../../util/CalcularPantalla";
//import "./Tabla.css";

const TablaEtiqueta = ({ etiquetas, eliminar, activarEdicion }) => {
  const anchoPantalla = CalcularPantalla();

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const limiteNumeroPagina = 5;
  const [limiteMaximoPagina, setLimiteMaximoPagina] = useState(5);
  const [limiteMinimoPagina, setLimiteMinimoPagina] = useState(0);

  const paginas = [];
  for (let i = 1; i <= Math.ceil(etiquetas.length / elementosPorPagina); i++) {
    paginas.push(i);
  }

  const indiceUltimo = paginaActual * elementosPorPagina;
  const indicePrimero = indiceUltimo - elementosPorPagina;
  const elementoActual = etiquetas.slice(indicePrimero, indiceUltimo);

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
                <th>Nombre</th>
                <th>Descripción</th>
                <th>URL</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {elementoActual.map(
                (elemento) => (
                  <tr key={elemento.IdEtiqueta}>
                    <td>{elemento.Nombre}</td>
                    <td>{elemento.Descripcion}</td>
                    <td>{elemento.UrlEtiqueta}</td>
                    <td>
                      <button
                      className="editar"
                      id={elemento.IdEtiqueta}
                      onClick={() => activarEdicion(elemento)}
                      >
                        <img className="editar" src="/icons/tabla/TablaIconoEditar.svg" alt="logo" />
                      </button>
                      <button
                        className="eliminar"
                        id={elemento.IdEtiqueta}
                        onClick={() => eliminar(elemento.IdEtiqueta)}
                      >
                        <img
                          className="icono-eliminar"
                          src="/icons/tabla/TablaIconoEliminar.svg"
                          alt="logo"
                        />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <table className="tabla-categorias">
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {elementoActual.map(
                (elemento) => (
                  <tr key={elemento.IdEtiqueta}>
                    <td>
                      <p>NOMBRE: {elemento.Nombre}</p>
                      <p>DESCRIPCIÓN: {elemento.Descripcion}</p>
                      <p>URL: {elemento.UrlEtiqueta}</p>
                      <div>
                        <button 
                        className="editar" 
                        id={elemento.IdEtiqueta}
                        onClick={() => activarEdicion(elemento)}
                        >
                          <img
                            className="editar"
                            src="/icons/tabla/TablaIconoEditar.svg"
                            alt="logo"
                          />
                        </button>
                        <button
                          className="eliminar"
                          id={elemento.IdEtiqueta}
                          onClick={() => eliminar(elemento.IdEtiqueta)}
                        >
                          <img
                            className="icono-eliminar"
                            src="/icons/tabla/TablaIconoEliminar.svg"
                            alt="logo"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default TablaEtiqueta;
