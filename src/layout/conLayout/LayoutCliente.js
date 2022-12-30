import React from "react";
import { Link } from "react-router-dom";
import { SidebarCliente } from "../../components/sidebars";
import Menu from "../../components/Menu/Menu";
import "./Layouts.css";

const LayoutCliente = (props) => {
  const { children } = props;
  return (
    <>
      {<Menu />}
      <div className="navegacion-cabecera">
        {/*
          <Link to="/solo-hoy">Por hoy</Link>
        <Link to="/promociones">Promoción</Link>
        <Link to="/vende-en-logan">Vende</Link>
        <Link to="/envios">Envíos</Link>
        <Link to="/gana-premios">Gana</Link>
        <Link to="/embajador-logan">Auspicios</Link>
        */}
        
      </div>
      <div className="historial-navegacion">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/cliente/perfil">Mi perfil</Link>
        <span>/</span>
        <Link to="/cliente/perfil">Datos personales</Link>
      </div>
      <SidebarCliente />
      <section className="section-cliente">
        <div className="contenedor-layout-cliente">{children}</div>
      </section>
    </>
  );
};

export default LayoutCliente;
