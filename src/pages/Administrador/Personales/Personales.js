import React, { useState, useEffect } from "react";
import { db } from "../../../db/firebase";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { TablaPersonal } from "../../../components/Tablas";
//import { personalCrear } from "../../../controllers/Personal";
import { registrarPersonalAuth } from "../../../controllers/Sesion";

import "./Personales.css";

const initFormPersonal = {
  nombres: "",
  celular: "",
  correo: "",
  contrasena: "",
};

const Personales = () => {
  const [personales, setPersonales] = useState([]);
  const roles = [
    { Index: 1, Nombre: "administrador" },
    { Index: 2, Nombre: "editor" },
    { Index: 3, Nombre: "despachador" },
  ];
  const [formPersonal, setFormPersonal] = useState(initFormPersonal);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [categoriaSelect, setCategoriaSelect] = useState("Editor");
  useEffect(() => {
    onSnapshot(collection(db, "Personales"), (snapshot) => {
      setPersonales(
        snapshot.docs.map((doc) => ({
          IdPersonal: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setFormPersonal({
      ...formPersonal,
      [name]: value,
    });
  };
  const cambiarCategoria = (e) => {
    setCategoriaSelect(e.target.value);
  };

  const activarEdicion = (personal) => {
    setModoEdicion(true);
    const personalEditado = {
      idPersonal: personal.IdPersonal,
      nombres: personal.Nombres,
      celular: personal.Celular,
      correo: personal.Correo,
    };
    setFormPersonal(personalEditado);
    setCategoriaSelect(personal.Rol);
  };

  function cancelarEditar(e) {
    e.preventDefault();
    setModoEdicion(false);
    setFormPersonal(initFormPersonal);
  }

  const eliminarPersonal = async (idPersonal) => {
    await deleteDoc(doc(db, "Personales", idPersonal));
  };

  const editarPersonal = async (e) => {
    e.preventDefault();

    const personalRef = doc(db, "Personales", formPersonal.idPersonal);
    if (formPersonal.contrasena) {
      await updateDoc(personalRef, {
        Nombres: formPersonal.nombres,
        Celular: formPersonal.celular,
        Correo: formPersonal.correo,
        Rol: categoriaSelect,
        Contrasena: formPersonal.contrasena,
      });
    } else {
      await updateDoc(personalRef, {
        Nombres: formPersonal.nombres,
        Celular: formPersonal.celular,
        Correo: formPersonal.correo,
        Rol: categoriaSelect,
      });
    }

    setModoEdicion(false);
    setFormPersonal(initFormPersonal);
  };

  const crearPersonal = (e) => {
    e.preventDefault();
    registrarPersonalAuth(formPersonal, categoriaSelect).then((res) => {
      if (res === "Correcto") {
        console.log(
          "Registrado Correctamente, verifique su correo para validar."
        );
      } else if (res === "Repetido") {
        console.log("Este correo ya fue registrado");
      } else if (res === "Contrasena") {
        console.log("Contraseña debe ser mayor de 6 dígitos");
      }
    });
    setFormPersonal(initFormPersonal);
    setCategoriaSelect("administrador");
  };

  return (
    <>
      <div className="contenedor-etiqueta">
        <h2>Personales</h2>
        <form onSubmit={modoEdicion ? editarPersonal : crearPersonal}>
          <div className="contenedor-etiqueta-item">
            <h4>Nombres:</h4>
            <input
              type="text"
              required
              name="nombres"
              value={formPersonal.nombres}
              onChange={cambiarDatos}
              placeholder="Escribe el nombre"
            />
          </div>
          <div className="contenedor-etiqueta-item">
            <h4>Correo:</h4>
            <input
              type="email"
              required
              name="correo"
              value={formPersonal.correo}
              onChange={cambiarDatos}
              placeholder="Escribe el correo"
            />
          </div>
          <div className="contenedor-etiqueta-item">
            <h4>Celular:</h4>
            <input
              type="number"
              required
              name="celular"
              value={formPersonal.celular}
              onChange={cambiarDatos}
              placeholder="Escribe el celular"
            />
          </div>
          <div className="contenedor-etiqueta-item">
            <h4>Rol:</h4>
            <select onChange={cambiarCategoria} value={categoriaSelect}>
              {roles.map((role) => (
                <option key={role.Index} value={role.Nombre}>
                  {role.Nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="contenedor-etiqueta-item">
            <h4>Contraseña:</h4>
            <input
              type="password"
              required={!modoEdicion}
              name="contrasena"
              value={formPersonal.contrasena}
              onChange={cambiarDatos}
              placeholder="Escribe la contraseña"
            />
          </div>

          <div className="contenedor-etiqueta-item">
            <input
              style={{ backgroundColor: "red" }}
              type="submit"
              value={modoEdicion ? "Editar" : "Crear"}
            />
            {modoEdicion && (
              <button
                style={{ backgroundColor: "black" }}
                onClick={cancelarEditar}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {personales?.length === 0 ? (
          <p>No hay personales</p>
        ) : (
          <TablaPersonal
            personales={personales}
            eliminar={eliminarPersonal}
            activarEdicion={activarEdicion}
          />
        )}
      </div>
    </>
  );
};

export default Personales;
