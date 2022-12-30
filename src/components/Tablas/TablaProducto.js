import React, { useState } from "react";
import { Link } from "react-router-dom";
import CalcularPantalla from "../../util/CalcularPantalla";
//import "./Tabla.css";

const TablaProducto = ({ productos, eliminar }) => {
  const anchoPantalla = CalcularPantalla();

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const limiteNumeroPagina = 5;
  const [limiteMaximoPagina, setLimiteMaximoPagina] = useState(5);
  const [limiteMinimoPagina, setLimiteMinimoPagina] = useState(0);

  const paginas = [];
  for (let i = 1; i <= Math.ceil(productos.length / elementosPorPagina); i++) {
    paginas.push(i);
  }

  const indiceUltimo = paginaActual * elementosPorPagina;
  const indicePrimero = indiceUltimo - elementosPorPagina;
  const elementoActual = productos.slice(indicePrimero, indiceUltimo);

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
                <th>Imagen</th>
                <th>Nombre</th>
                <th>URL</th>
                <th>Descripción</th>
                <th>Categoria</th>
                <th>Etiquetas</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Entrega</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {elementoActual.map((elemento) => (
                <tr key={elemento.IdProducto}>
                  <td>
                    <img
                      className="imagen-tabla"
                      src={elemento.ImagenesUrl[0]}
                      alt=""
                    />
                  </td>
                  <td>{elemento.Nombre}</td>
                  <td>{elemento.UrlProducto}</td>
                  <td>{elemento.Descripcion}</td>
                  <td>{elemento.Categoria}</td>
                  <td>{elemento.Etiqueta.join()}</td>
                  <td>{elemento.Marca}</td>
                  <td>S/. {elemento.Precio}</td>
                  <td>{elemento.Cantidad}</td>
                  <td>{elemento.TiempoEntrega} días</td>
                  <td>
                    <Link
                      className="editar"
                      to={`/administrador/producto-editar/${elemento.IdProducto}`}
                      >
                      <img
                        className="icono-editar"
                        src="/icons/tabla/TablaIconoEditar.svg"
                        alt="logo"
                      />
                    </Link>
                    <button
                      className="eliminar"
                      id={elemento.IdProducto}
                      onClick={() => eliminar(elemento.IdProducto)}
                    >
                      <img
                        className="icono-eliminar"
                        src="/icons/tabla/TablaIconoEliminar.svg"
                        alt="logo"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="tabla-categorias">
            <thead>
              <tr>
                <th>PRODUCTO</th>
              </tr>
            </thead>
            <tbody>
              {elementoActual.map((elemento) => (
                <tr key={elemento.IdProducto}>
                  <td>
                    <img
                      className="imagen-tabla"
                      src={elemento.ImagenesUrl[0]}
                      alt=""
                    />
                    <p><b>NOMBRE: </b> {elemento.Nombre}</p>
                    <p><b>URL: </b>{elemento.UrlProducto}</p>
                    <p><b>DESCRIPCIÓN: </b>{elemento.Descripcion}</p>
                    <p><b>CATEGORIA: </b>{elemento.Categoria}</p>
                    <p><b>ETIQUETA: </b>{elemento.Etiqueta.join()}</p>
                    <p><b>MARCA: </b>{elemento.Marca}</p>
                    <p><b>PRECIO: </b>S/. {elemento.Precio}</p>
                    <p><b>CANTIDAD: </b>{elemento.Cantidad} días</p>
                    <div>
                      <Link
                        className="editar"
                        to={`/administrador/producto-editar/${elemento.IdProducto}`}
                      >
                        <img src="/icons/tabla/TablaIconoEditar.svg" alt="logo" />
                      </Link>
                      <button
                        className="eliminar"
                        id={elemento.IdProducto}
                        onClick={() => eliminar(elemento.IdProducto)}
                      >
                        <img src="/icons/tabla/TablaIconoEliminar.svg" alt="logo" />
                      </button>
                    </div>
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

export default TablaProducto;
