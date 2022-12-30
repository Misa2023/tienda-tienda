import React, { useState, useEffect, useRef } from "react";
import {
  categoriaEditarCF,
  categoriaUna,
  categoriaEditarSF,
} from "../../../controllers/Categorias";
import { useHistory } from "react-router-dom";
import GenerarUrl from "../../../util/GenerarUrl";
import "./Categorias.css";

/* ESTADO INICIAL FORMULARIO CATEGORIA */
const initFormCategoria = {
  nombre: "",
  descripcion: "",
  urlCategoria: "",
};

const CategoriasEditar = (props) => {
  const history = useHistory();
  const idCategoriaUrl = props.match.params.id;
  const [formCategoria, setFormCategoria] = useState(initFormCategoria);
  const [foto, setFoto] = useState();
  const [fotoVista, setFotoVista] = useState();
  const imagenRef = useRef();

  useEffect(() => {
    (async () => {
      const categoria = await categoriaUna(idCategoriaUrl);
      setFormCategoria({
        nombre: categoria.Nombre,
        descripcion: categoria.Descripcion,
        urlCategoria: categoria.UrlCategoria,
        idCategoria: idCategoriaUrl,
      });
      if (categoria.ImagenUrl) {
        setFotoVista(categoria.ImagenUrl);
      }
    })();
  }, [idCategoriaUrl]);

  useEffect(() => {
    if (foto !== undefined) {
      const fotoCargada = new FileReader();
      fotoCargada.onload = () => {
        setFotoVista(fotoCargada.result);
      };
      fotoCargada.readAsDataURL(foto);
    }
  }, [foto]);

  function cambiarImagen(e) {
    let fotoSeleccionado;
    if (e.target.files && e.target.files.length === 1) {
      fotoSeleccionado = e.target.files[0];
      setFoto(fotoSeleccionado);
    }
  }

  function cambiarImagenSubir() {
    imagenRef.current.click();
  }

  function eliminarImagen() {
    setFoto(undefined);
    setFotoVista(undefined);
    imagenRef.current.value = "";
  }

  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setFormCategoria({
      ...formCategoria,
      [name]: value,
    });
  };

  function onBlur() {
    setFormCategoria({
      ...formCategoria,
      urlCategoria: GenerarUrl(formCategoria.nombre),
    });
  }

  const editarCategoria = (e) => {
    e.preventDefault();
    if (foto === undefined) {
      categoriaEditarSF(formCategoria, fotoVista);
    } else {
      categoriaEditarCF(formCategoria, foto);
    }
    setFormCategoria(initFormCategoria);
    setFoto(undefined);
    setFotoVista(undefined);
    imagenRef.current.value = "";
    history.push(`/administrador/categorias`);
  };

  return (
    <>
      <div className="contenedor-crear-categorias">
        <h2>Editar Categoria</h2>
        <form onSubmit={editarCategoria}>
          <h4>Nombre:</h4>
          <input
            type="text"
            required
            name="nombre"
            placeholder="Escribe el nombre de la categoria"
            value={formCategoria.nombre}
            onChange={cambiarDatos}
            onBlur={onBlur}
          />

          <h4>URL:</h4>
          <input
            type="text"
            disabled
            required
            defaultValue={GenerarUrl(formCategoria.nombre)}
            placeholder="Escribe el URL de la categoria"
          />

          <h4>Descripción:</h4>
          <textarea
            name="descripcion"
            required
            cols="30"
            rows="8"
            placeholder="Describe la categoria"
            value={formCategoria.descripcion}
            onChange={cambiarDatos}
          ></textarea>
          <h4>Imagen:</h4>
          <input
            ref={imagenRef}
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={cambiarImagen}
          />
          <br />
          <div className="contenedor-imagenes-categorias">
            <div className="contenedor-card-categorias">
              {fotoVista && (
                <div>
                  <img src={fotoVista} alt="vista previa" />

                  <button
                    type="button"
                    style={{ backgroundColor: "red" }}
                    onClick={cambiarImagenSubir}
                  >
                    Cambiar
                  </button>
                  <button
                    type="button"
                    style={{ backgroundColor: "black" }}
                    onClick={eliminarImagen}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
          <input
            className="boton-formulario"
            type="submit"
            value="Editar Categoria"
          />
        </form>
      </div>
    </>
  );
};

export default CategoriasEditar;
