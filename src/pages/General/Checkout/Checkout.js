import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { direccionTraerUno } from "../../../controllers/Direcciones";
import "./Checkout.css";
import ProductoCheckout from "../../../components/ProductoCheckout/ProductoCheckout";
import FormularioPagar from "../../../components/FormularioPagar/FormularioPagar";
import { EstadoContexto } from "../../../context/EstadoGeneral";

const initFormDireccion = {
  region: "",
  provincia: "",
  distrito: "",
  direccion: "",
  recomendacion: "",
};

const Checkout = () => {
  const { productos, usuario } = useContext(EstadoContexto);
  const exiteUsuario = Object.keys(usuario).length;

  const [formDireccion, setFormDireccion] = useState(initFormDireccion);
  const [escogerDireccion, setEscogerDireccion] = useState("tienda");
  let direccionTienda = "Calle ucayali 590";
  useEffect(() => {
    if (exiteUsuario) {
      (async () => {
        const direccionDB = await direccionTraerUno(usuario.IdCliente);
        if (direccionDB) {
          setFormDireccion({
            region: direccionDB.Region,
            provincia: direccionDB.Provincia,
            distrito: direccionDB.Distrito,
            direccion: direccionDB.Direccion,
            recomendacion: direccionDB.Recomendacion,
          });
        }
      })();
    }
  }, [usuario.IdCliente, exiteUsuario]);

  function cambiarDireccion(e) {
    setEscogerDireccion(e.target.value);
  }

  return (
    <>
      {productos?.length === 0 ? (
        <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
          <img src="/images/gif/empty.gif" alt="" />
        </div>
      ) : (
        <div className="contenedor-carrito">
          <div className="titulo-paginas">
            <h1>CARRITO DE COMPRAS</h1>
          </div>
          <div className="contenedor-grid-carrito">
            <div className="grid-carrito-productos">
              <ProductoCheckout productos={productos} />
              <br />

              {exiteUsuario ? (
                <>
                  <div className="titulo-paginas">
                    <h1>ESCOGE DIRECCIÓN DE ENVIO</h1>
                    <span>
                      <i>
                        *Puedes cambiar tu dirección de envio en:{" "}
                        <Link to="/cliente/direcciones"> Mi dirección</Link>
                      </i>
                    </span>
                  </div>
                  <table className="contenedor-direcciones ">
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="radio"
                            id="ubicacion"
                            value="ubicacion"
                            name="direccion"
                            checked={
                              escogerDireccion === "ubicacion" ? true : false
                            }
                            onChange={cambiarDireccion}
                          />
                          <label htmlFor="ubicacion">A mi dirección: </label>{" "}
                        </td>
                        <td>
                          <label>Destinatario: </label>
                          <span>
                            {usuario.Nombres + " " + usuario.Apellidos}
                          </span>
                          <br />
                          <label>Celular: </label>
                          <span>{usuario.Celular ? usuario.Celular : ""}</span>
                          <br />
                          <label>Región: </label>
                          <span>{formDireccion.region}</span>
                          <br />
                          <label>Provincia: </label>
                          <span>{formDireccion.provincia}</span>
                          <br />
                          <label>Distrito: </label>
                          <span>{formDireccion.distrito}</span>
                          <br />
                          <label>Dirección: </label>
                          <span>{formDireccion.direccion}</span>
                          <br />
                          <label>Recomendación de envio: </label>
                          <span>{formDireccion.recomendacion}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            type="radio"
                            id="tienda"
                            value="tienda"
                            name="direccion"
                            checked={
                              escogerDireccion === "tienda" ? true : false
                            }
                            onChange={cambiarDireccion}
                          />
                          <label htmlFor="tienda">Recoger en tienda: </label>{" "}
                        </td>
                        <td>
                          <label>Dirección de Tienda Logan: </label>
                          <span>{direccionTienda}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="grid-carrito-pagar">
              <FormularioPagar
                direccion={
                  escogerDireccion === "tienda"
                    ? direccionTienda
                    : formDireccion
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
