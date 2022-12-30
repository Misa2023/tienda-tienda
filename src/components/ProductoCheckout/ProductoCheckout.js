import React from "react";
import ProductoLinea from "./ProductoLinea";
import "./ProductoCheckout.css";

const ProductoCheckout = ({ productos }) => {
  return (
    <table className="tabla-producto-checkout">
      <thead>
        <tr>
          <th>PRODUCTO</th>
          <th>PRECIO</th>
          <th>CANTIDAD</th>
          <th>TOTAL</th>
          <th>ACCIÓN</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <ProductoLinea key={producto.IdProducto} producto={producto} />
        ))}
      </tbody>
    </table>
  );
};

export default ProductoCheckout;