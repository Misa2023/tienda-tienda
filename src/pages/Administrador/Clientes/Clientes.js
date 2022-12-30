import React, { useState, useEffect } from "react";
import { db } from "../../../db/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { TablaClientes } from "../../../components/Tablas";
import "./Clientes.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "Clientes"), (snapshot) => {
      setClientes(
        snapshot.docs.map((doc) => ({
          IdPersonal: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  return (
    <>
      <div className="contenedor-etiqueta">
        <h2>Clientes</h2>
        {clientes?.length === 0 ? (
          <p>No hay clientes</p>
        ) : (
          <TablaClientes
            clientes={clientes}
          />
        )}
      </div>
    </>
  );
};

export default Clientes;
