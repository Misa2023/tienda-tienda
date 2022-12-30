import React from "react";
import { SidebarAdmin } from "../../components/sidebars";
import "./Layouts.css";

const LayoutAdministracion = (props) => {
  const { children } = props;
  return (
    <>
      <SidebarAdmin />
      <section>
        <div className="contenedor-layout-administracion">{children}</div>
      </section>
    </>
  );
};

export default LayoutAdministracion;
