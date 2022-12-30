import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { EstadoContexto } from "../context/EstadoGeneral";
const RutaSemiPrivada = (props) => {
  const { layout: Layout, component: Component, location, ...rest } = props;
  const { usuario } = useContext(EstadoContexto);
  const exiteUsuario = Object.keys(usuario).length 

  return !exiteUsuario ? (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout >
          {<Component {...matchProps} />}
        </Layout>
      )}
    />
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  );
};

RutaSemiPrivada.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RutaSemiPrivada;
