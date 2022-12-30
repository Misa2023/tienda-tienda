import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Sidebars.css";
import { EstadoContexto } from "../../context/EstadoGeneral";
const SidebarAdmin = () => {
  const { cerrarSesion, usuario } = useContext(EstadoContexto);
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);
  return (
    <>
      <div className="menu-administrador">
        <button>
          <img onClick={toggleTrueFalse} src="/icons/menu/GeneralIconoMenu.svg" alt="logo" />
        </button>
        <div>
          <Link to="/">
            <img src="/icons/sidebar/SidebarLogan.svg" alt="logo" />
          </Link>
        </div>
      </div>
      <div
        className={
          isToggled === false
            ? "contenedor-sidebar"
            : "contenedor-sidebar activo"
        }
      >
        <div className="contenedor-perfil">
          <div>
            <img src="/images/perfil/perfilLogan.jpg" alt="Avatar" />
          </div>
          <h4>{usuario.Nombres !== "undefined"
              ? usuario.Nombres
              : "Sin nombre"}</h4>
          <p>Gerente</p>
        </div>

        <div className="contenedor-rol">
          <p>ADMINISTRADOR</p>
        </div>

        <div className="contenedor-navegacion">
          <ul>
            <li className="navegacion-items">
              <Link to="/administrador/categorias">
                <img src="/icons/sidebar/SidebarIconoCategoria.svg" alt="logo" />
                Categorias
              </Link>
              <Link to="/administrador/modelos">
                <img src="/icons/sidebar/SidebarIconoEtiqueta.svg" alt="logo" />
                Modelos
              </Link>
              <Link to="/administrador/productos">
                <img src="/icons/sidebar/SidebarIconoProducto.svg"alt="logo" />
                Productos
              </Link>
              <Link to="/administrador/pedidos">
                <img src="/icons/sidebar/SidebarIconoEtiqueta.svg" alt="logo" />
                Pedidos
              </Link>
              <Link to="/administrador/clientes">
                <img src="/icons/sidebar/SidebarIconoCliente.svg" alt="logo" />
                Clientes
              </Link>
              <Link to="/administrador/personales">
                <img src="/icons/sidebar/SidebarIconoPersonal.svg" alt="logo" />
                Personales
              </Link>
              <Link to="/administrador/reportes">
                <img src="/icons/sidebar/SidebarIconoReporte.svg" alt="logo" />
                Reportes
              </Link>
            </li>
          </ul>
          <button onClick={cerrarSesion}>CERRAR</button>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
