import React, { useState, useContext } from "react";
import { EstadoContexto } from "../../context/EstadoGeneral";
import { guardarAgregar } from "../../controllers/Guardar";
import "./ProductoCheckout.css";

const ProductoLinea = ({ producto }) => {
  const { eliminarProducto, aumentarCantidad, disminuirCantidad, usuario } =
    useContext(EstadoContexto);
  const exiteUsuario = Object.keys(usuario).length;

  const [formCantidad, setFormCantidad] = useState(producto.Unidades);

  const aumentar = () => {
    setFormCantidad(formCantidad + 1);
    aumentarCantidad(producto.IdProducto, formCantidad);
  };

  const disminuir = () => {
    if (formCantidad > 1) {
      setFormCantidad(formCantidad - 1);
      disminuirCantidad(producto.IdProducto, formCantidad);
    }
  };

  const guardarProducto = (producto) => {
    if (exiteUsuario) {
      guardarAgregar(usuario.IdCliente, producto);
      eliminarProducto(producto.IdProducto);
    } else {
      console.log("Debe registrarse para guardar su producto");
    }
  };

  return (
    <tr>
      <td>
        <img className="imagen-tabla" src={producto.ImagenesUrl[0]} alt="" />
        <p>{producto.Nombre}</p>
      </td>
      <td>S/. {producto.Precio}</td>
      <td>
        {formCantidad}
        <button
          style={{ width: "25px", height: "25px", background: "red" }}
          onClick={() => aumentar()}
        >
          +
        </button>
        <button
          style={{ width: "25px", height: "25px", background: "black" }}
          onClick={() => disminuir()}
        >
          -
        </button>
      </td>
      <td>
        <h3>S/. {formCantidad * parseFloat(producto.Precio)} </h3>
      </td>

      <td>
        <button
          style={{ background: "red" }}
          onClick={() => eliminarProducto(producto.IdProducto)}
        >
          Eliminar
        </button>
        <br />
        <br />
        <button
          style={{ background: "black" }}
          onClick={() => guardarProducto(producto)}
        >
          Guardar
        </button>
      </td>
    </tr>
  );
};

export default ProductoLinea;
