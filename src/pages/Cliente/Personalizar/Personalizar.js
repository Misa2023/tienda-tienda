import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import {
  editarPerfilSinFoto,
  editarPerfilConFoto,
} from "../../../controllers/Perfil";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import "./Personalizar.css";

const Personalizar = () => {
  const { usuario } = useContext(EstadoContexto);
  const [foto, setFoto] = useState(undefined);
  const [fotoVista, setFotoVista] = useState(undefined);
  var [posicionX, setPosicionX] = useState(20);
  var [posicionY, setPosicionY] = useState(20);

  const imagenRef = useRef();

  useEffect(() => {
    if (!foto) {
      return;
    }
    const catImage = new Image();
    const fotoCargada = new FileReader();
    fotoCargada.onload = () => {
      catImage.src = fotoCargada.result;
    };
    fotoCargada.readAsDataURL(foto);
    catImage.onload = () => setFotoVista(catImage);
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
    setFotoVista(undefined);
    imagenRef.current.value = "";
  }

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

  const canvas = useRef(null);
  var moverse = false;
  var imageX = 20;
  var imageY = 20;
  var inicioX;
  var inicioY;

  const draw = useCallback(() => {
    const contexto = canvas.current.getContext("2d");
    const vistaCanvas = canvas.current.getBoundingClientRect();
    setPosicionX(vistaCanvas.left);
    setPosicionY(vistaCanvas.top);
    const fondo = new Image();
    fondo.src = "/images/personalizados/mochila-azul.jpg";
    fondo.onload = () => {
      contexto.drawImage(fondo, 0, 0);
      if (fotoVista) {
        contexto.drawImage(fotoVista, imageX, imageY, 200, 200);
      }
    };
  }, [fotoVista, imageX, imageY]);

  useEffect(() => {
    if (canvas) {
      draw();
    }
  }, [draw]);

  function descargarImagen(e) {
    e.preventDefault();
    const instancia = canvas.current;
    const extension = instancia.toDataURL("image/png");
    const descargar = document.createElement("a");
    descargar.download = "Mochila-logan-personalizado.png";
    descargar.href = extension;
    descargar.click();
  }

  const myDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    var mx = parseInt(e.clientX - posicionX);
    var my = parseInt(e.clientY - posicionY);
    moverse = true;
    inicioX = mx;
    inicioY = my;
  };

  const myUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    moverse = false;
  };

  const myMove = (e) => {
    if (moverse) {
      e.preventDefault();
      e.stopPropagation();
      var mx = parseInt(e.clientX - posicionX);
      var my = parseInt(e.clientY - posicionY);
      var dx = mx - inicioX;
      var dy = my - inicioY;
      imageX += dx;
      imageY += dy;
      inicioX = mx;
      inicioY = my;
      draw();
    }
  };

  return (
    <>
      <div className="titulo-paginas">
        <h1>PERSONALIZAR MI MOCHILA</h1>
      </div>
      <div className="grid-personalizar-cliente">
        <div className="contenedor-personalizar">
          <canvas
            onMouseDown={myDown}
            onMouseUp={myUp}
            onMouseMove={myMove}
            style={{ background: "#ededed" }}
            ref={canvas}
            width={600}
            height={600}
          ></canvas>
        </div>
        {fotoVista === undefined && (
          <button
            style={{ backgroundColor: "red" }}
            type="button"
            onClick={cambiarImagenSubir}
          >
            Subir imagen
          </button>
        )}
        {fotoVista && (
          <>
            <button
              type="button"
              style={{ backgroundColor: "blue" }}
              onClick={descargarImagen}
            >
              Descargar imagen
            </button>
            <button
              type="button"
              style={{ backgroundColor: "red" }}
              onClick={eliminarImagen}
            >
              Cancelar cambio
            </button>
            <button
              type="button"
              style={{ backgroundColor: "black" }}
              onClick={guardarFoto}
            >
              Mandar foto
            </button>
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
    </>
  );
};

export default Personalizar;
