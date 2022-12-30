import React, { useState, useEffect, useRef, useContext } from "react";
import {
  editarPerfilSinFoto,
  editarPerfilConFoto,
  editarPerfilSoloDatos,
} from "../../../controllers/Perfil";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import "./Perfil.css";

const initFormCliente = {
  idCliente: "",
  nombres: "",
  apellidos: "",
  celular: "",
  fechaNacimiento: "",
};

const Perfil = () => {
  const { usuario } = useContext(EstadoContexto);
  const [foto, setFoto] = useState(undefined);
  const [fotoVista, setFotoVista] = useState(undefined);
  const [genero, setGenero] = useState("hombre");
  const [formCliente, setFormCliente] = useState(initFormCliente);
  const [fotoFirebase, setFotoFirebase] = useState("");

  const imagenRef = useRef();
  useEffect(() => {
    setFormCliente({
      idCliente: usuario.IdCliente,
      nombres: usuario.Nombres,
      apellidos: usuario.Apellidos,
      celular: usuario.Celular === "undefined" ? "" : usuario.Celular,
      fechaNacimiento: usuario.FechaNacimiento === "undefined" ? "2021-01-01" : usuario.FechaNacimiento ,
    });
    setGenero(usuario.Genero === "undefined" ? "hombre" : usuario.Genero);
    if (usuario.FotoUrl !== "undefined") {
      setFotoVista(usuario.FotoUrl);
      setFotoFirebase(usuario.FotoUrl);
    }
  }, [usuario]);

  useEffect(() => {
    if (!foto) {
      return;
    }
    const fotoCargada = new FileReader();
    fotoCargada.onload = () => {
      setFotoVista(fotoCargada.result);
    };
    fotoCargada.readAsDataURL(foto);
  }, [foto]);

  function cambiarImagen(e) {
    let fotoSeleccionado;
    if (e.target.files && e.target.files.length === 1) {
      fotoSeleccionado = e.target.files[0];
      setFoto(fotoSeleccionado);
    }
    imagenRef.current.value = "";
  }

  function cambiarImagenSubir() {
    imagenRef.current.click();
  }

  function eliminarImagen(e) {
    setFoto(undefined);
    if (fotoFirebase) {
      setFotoVista(fotoFirebase);
    } else {
      setFotoVista(undefined);
    }
    imagenRef.current.value = "";
  }

  function cambiarGenero(e) {
    setGenero(e.target.value);
  }

  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setFormCliente({
      ...formCliente,
      [name]: value,
    });
  };

  const guardarFoto = (e) => {
    e.preventDefault();
    const userId = usuario.IdCliente;
    if (foto === undefined) {
      editarPerfilSinFoto(fotoVista, userId);
      setFoto(undefined);
      setFotoVista(fotoVista);
    } else {
      editarPerfilConFoto(foto, userId);
      setFoto(undefined);
      setFotoVista(fotoVista);
    }
  };

  const editarDatosPerfil = (e) => {
    e.preventDefault();
    editarPerfilSoloDatos(formCliente, genero);
  };

  return (
    <>
      <div className="titulo-paginas">
        <h1>EDITAR DATOS PERSONALES</h1>
      </div>
      <div className="grid-perfil-cliente">
        <div className="grid-perfil-cliente-datos">
          <form onSubmit={editarDatosPerfil}>
            <label htmlFor="name">Nombres:</label>
            <input
              id="name"
              type="text"
              required
              name="nombres"
              placeholder="Escribe tu nombres"
              value={formCliente.nombres}
              onChange={cambiarDatos}
            />
            <label htmlFor="apellidos">Apellidos:</label>
            <input
              id="apellidos"
              type="text"
              required
              name="apellidos"
              placeholder="Escribe tu apellidos"
              value={formCliente.apellidos}
              onChange={cambiarDatos}
            />
            <label htmlFor="hombre">Sexo:</label>
            <br />
            <input
              type="radio"
              id="hombre"
              value="hombre"
              checked={genero === "hombre" ? true : false}
              onChange={cambiarGenero}
              name="genero"
            />
            <label htmlFor="hombre"> Hombre</label>{" "}
            <input
              type="radio"
              id="mujer"
              value="mujer"
              checked={genero === "mujer" ? true : false}
              onChange={cambiarGenero}
              name="genero"
            />
            <label htmlFor="mujer"> Mujer</label>
            <br />
            <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formCliente.fechaNacimiento}
              onChange={cambiarDatos}
            />
            <label htmlFor="celular">Celular:</label>
            <input
              type="tel"
              id="celular"
              name="celular"
              pattern="[0-9]{9}"
              size="9"
              required
              placeholder="Escribe tu celular"
              value={formCliente.celular}
              onChange={cambiarDatos}
            />
            <input
              className={"boton-formulario"}
              type="submit"
              value="Guardar cambios"
            />
          </form>
        </div>

        <div className="grid-perfil-cliente-foto">
          <label htmlFor="name">Foto de perfil:</label>

          <div className="grid-perfil-cliente-imagen">
            {fotoVista === undefined && (
              <div>
                <img src="/images/perfil/sinPerfil.jpg" alt="" />
                <button
                  style={{ backgroundColor: "black" }}
                  type="button"
                  onClick={cambiarImagenSubir}
                >
                  Cambiar perfil
                </button>
              </div>
            )}
            {fotoVista && (
              <>
                <img src={fotoVista} alt="vista previa" />
                <button
                  type="button"
                  style={{ backgroundColor: "black" }}
                  onClick={cambiarImagenSubir}
                >
                  Cambiar foto
                </button>
                {foto !== undefined && (
                  <>
                    <button
                      type="button"
                      style={{ backgroundColor: "#7e7878" }}
                      onClick={eliminarImagen}
                    >
                      Cancelar cambio
                    </button>
                    <button
                      type="button"
                      style={{ backgroundColor: "red" }}
                      onClick={guardarFoto}
                    >
                      Guardar foto
                    </button>
                  </>
                )}
              </>
            )}
            <input
              ref={imagenRef}
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={cambiarImagen}
              style={{
                display: "none",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
