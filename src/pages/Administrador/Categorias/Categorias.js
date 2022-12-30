import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../db/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { TablaCategoria } from "../../../components/Tablas";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "Categorias"), (snapshot) => {
      setCategorias(
        snapshot.docs.map((doc) => ({
          IdCategoria: doc.id,
          ...doc.data()
        }))
      );
    });
  }, []);

  const eliminarCategoria = async (idCategoria) => {
    await deleteDoc(doc(db, "Categorias", idCategoria));
  };

  return (
    <>
      <h2>Categorias</h2>
      <Link to="/administrador/categoria-crear">
        <button className="boton-formulario">AGREGAR NUEVA CATEGORIA</button>
      </Link>
      {categorias?.length === 0 ? (
        <></>
      ) : (
        <TablaCategoria categorias={categorias} eliminar={eliminarCategoria} />
      )}
    </>
  );
};

export default Categorias;
