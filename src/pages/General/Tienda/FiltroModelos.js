import React, { useState, useEffect } from "react";
import { etiquetaTodas } from "../../../controllers/Etiquetas";

const FiltroModelos = ({ cambiarModelos }) => {
  const [etiquetasDB, setEtiquetasDB] = useState([]);

  useEffect(() => {
    (async () => {
      const eitquetaDBRes = await etiquetaTodas();
      setEtiquetasDB(eitquetaDBRes);
    })();
  }, []);

  const cambiarEtiqueta = (event) => {
    cambiarModelos({
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <div
      style={{
        margin: "10px 0px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {etiquetasDB.map((etiqueta) => (
        <label
          className="contenedor-check-mediano"
          key={etiqueta.IdEtiqueta}
          style={{
            margin: "5px 0px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {etiqueta.Nombre}
          <input
            type="checkbox"
            className="check-mediano"
            name={etiqueta.Nombre}
            onChange={cambiarEtiqueta}
          />
          <span className="checkmark-mediano">
            <img
              style={{
                width: "18px",
                margin: "1px 0px 3px 3px"
              }}
              src="/icons/IconoCheck.svg"
              alt="logo"
            />
          </span>
        </label>
      ))}
    </div>
  );
};

export default FiltroModelos;
