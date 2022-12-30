import React, { useState, useContext, useEffect } from "react";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import {
  direccionCrear,
  direccionEditar,
} from "../../../controllers/Direcciones";
import { db } from "../../../db/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import "./Direcciones.css";
import regiones from "./regiones";
import provincias from "./provincias";
import distritos from "./distritos";

const initFormDireccion = {
  direccion: "",
  recomendacion: "",
};

const Direcciones = () => {
  const { usuario } = useContext(EstadoContexto);
  const [formDireccion, setFormDireccion] = useState(initFormDireccion);
  const [regionesData] = useState(regiones);
  const [provinciasData, setProvinciasData] = useState([]);
  const [distritosData, setDistritosData] = useState([]);
  const [regionSelect, setRegionSelect] = useState("Seleccione su Región");
  const [provinciaSelect, setProvinciaSelect] = useState(
    "Seleccione su Provincia"
  );
  const [distritoSelect, setDistritoSelect] = useState(
    "Seleccione su Distrito"
  );
  const [estadoAccion, setEstadoAccion] = useState(false);

  useEffect(() => {
    const rrutaDireccion = `${"Clientes"}/${usuario.IdCliente}/${"Direcciones"}`;
    let idEnvio = "grLgeRrHFEyg8g4IUw2J";
    const clienteRef = doc(db, rrutaDireccion, idEnvio);
    onSnapshot(clienteRef, (doc) => {
      if (doc.data() !== undefined) {
        let idRegionFil = regionesData.filter(
          (region) => region.name === doc.data().Region
        );
        const provinciasFiltradas = provincias.filter(
          (provinciaFiltrada) =>
            provinciaFiltrada.region_id === idRegionFil[0].id
        );
        setRegionSelect(doc.data().Region);
        setProvinciasData(provinciasFiltradas);
        setProvinciaSelect(doc.data().Provincia);
        let idProvinciaFil = provinciasFiltradas.filter(
          (provincia) => provincia.name === doc.data().Provincia
        );

        const distritosFiltrados = distritos.filter(
          (distritoFiltrado) =>
            distritoFiltrado.region_id === idProvinciaFil[0].id
        );
        setDistritosData(distritosFiltrados);
        setDistritoSelect(doc.data().Distrito);
        setFormDireccion({
          direccion: doc.data().Direccion ? doc.data().Direccion : "",
          recomendacion: doc.data().Recomendacion
            ? doc.data().Recomendacion
            : "",
        });
        setEstadoAccion(true);
      } else {
        setEstadoAccion(false);
      }
    });
  }, [regionesData, usuario]);

  const handleChangeRegion = (event) => {
    let idRegionFil = regionesData.filter(
      (region) => region.name === event.target.value
    );
    setRegionSelect(event.target.value);
    const provinciasFiltradas = provincias.filter(
      (provinciaFiltrada) => provinciaFiltrada.region_id === idRegionFil[0].id
    );
    setProvinciasData(provinciasFiltradas);
    setProvinciaSelect(provinciasFiltradas[0].name);
    const distritosFiltrados = distritos.filter(
      (distritoFiltrado) =>
        distritoFiltrado.region_id === provinciasFiltradas[0].id
    );
    setDistritosData(distritosFiltrados);
    setDistritoSelect(distritosFiltrados[0].name);
  };
  const handleChangeProvincia = (event) => {
    let idProvinciaFil = provinciasData.filter(
      (provincia) => provincia.name === event.target.value
    );
    setProvinciaSelect(event.target.value);
    const distritosFiltrados = distritos.filter(
      (distritoFiltrado) => distritoFiltrado.region_id === idProvinciaFil[0].id
    );
    setDistritosData(distritosFiltrados);
    setDistritoSelect(distritosFiltrados[0].name);
  };
  const handleChangeDistrito = (event) => {
    setDistritoSelect(event.target.value);
  };
  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setFormDireccion({
      ...formDireccion,
      [name]: value,
    });
  };

  const editarDireccion = (e) => {
    e.preventDefault();
    const IdCliente = usuario.IdCliente;
    const direcionEnvio = {
      region: regionSelect,
      provincia: provinciaSelect,
      distrito: distritoSelect,
    };
    direccionEditar(IdCliente, formDireccion, direcionEnvio);
  };

  const guardarDireccion = (e) => {
    e.preventDefault();
    const IdCliente = usuario.IdCliente;
    const direcionEnvio = {
      region: regionSelect,
      provincia: provinciaSelect,
      distrito: distritoSelect,
    };
    direccionCrear(IdCliente, formDireccion, direcionEnvio);
  };

  return (
    <>
      <div className="titulo-paginas">
        <h1>DIRECCIONES</h1>
      </div>
      <div className="contenedor-cliente-direcciones">
        <form onSubmit={estadoAccion ? editarDireccion : guardarDireccion}>
          <label htmlFor="name">Destinatario:</label>
          <input
            id="name"
            type="text"
            disabled
            required
            name="nombres"
            defaultValue={usuario.Nombres ? usuario.Nombres + " "+ usuario.Apellidos : ""}
          />
          <label htmlFor="celular">Celular:</label>
          <input
            id="celular"
            type="text"
            disabled
            required
            name="celular"
            defaultValue={usuario.Celular === "undefined" ? "" : usuario.Celular}
          />
          <label>
            Escoja su Región:
            <select onChange={handleChangeRegion} value={regionSelect}>
              <option disabled value={"Seleccione su Región"}>
                Seleccione su Región
              </option>
              {regionesData.map((region) => (
                <option key={region.id} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Escoja su Provincia:
            <select onChange={handleChangeProvincia} value={provinciaSelect}>
              <option disabled value={"Seleccione su Provincia"}>
                Seleccione su Provincia
              </option>
              {provinciasData.map((provincia) => (
                <option key={provincia.id} value={provincia.name}>
                  {provincia.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Escoja su Distrito:
            <select onChange={handleChangeDistrito} value={distritoSelect}>
              <option disabled value={"Seleccione su Distrito"}>
                Seleccione su Distrito
              </option>
              {distritosData.map((distrito) => (
                <option key={distrito.id} value={distrito.name}>
                  {distrito.name}
                </option>
              ))}
            </select>
          </label>
          <h4>Dirección:</h4>
          <input
            type="text"
            required
            name="direccion"
            placeholder="Escribe tu dirección"
            value={formDireccion.direccion}
            onChange={cambiarDatos}
          />
          <h4>Referencia:</h4>
          <textarea
            name="recomendacion"
            required
            cols="30"
            rows="2"
            placeholder="Recomendaciones de envio"
            value={formDireccion.recomendacion}
            onChange={cambiarDatos}
          ></textarea>
          <input
            className="boton-formulario"
            type="submit"
            value={estadoAccion ? "Editar dirección" : "Guardar dirección"}
          />
        </form>
      </div>
    </>
  );
};

export default Direcciones;
