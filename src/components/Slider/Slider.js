import React from "react";
import { Link } from "react-router-dom";
import Slideshow from "./componentes/Slideshow";
import "./Slider.css";

const slider = [
  {
    id: 111,
    nombre: "Maletin",
    descripcion: "Sport FIT",
    color: "#2e311c",
    imgURL: "/images/slider/slider-maletin-1.png",
    link: "maletin-sport-fit",
  },
  {
    id: 112,
    nombre: "Maletin",
    descripcion: "Sport Forte",
    color: "#030619",
    imgURL: "/images/slider/slider-maletin-2.png",
    link: "maletin-sport-forte",
  },
  {
    id: 113,
    nombre: "Mochila",
    color: "black",
    descripcion: "Ergonomic SD",
    imgURL: "/images/slider/slider-mochila-1.png",
    link: "mochila-ergonomic-sd",
  },
  {
    id: 114,
    nombre: "Mochila",
    color: "#9f601d",
    descripcion: "University",
    imgURL: "/images/slider/slider-mochila-2.png",
    link: "mochila-university",
  },
];

const Slider = () => {
  return (
    <div className="contenedor-slider">
      <Slideshow velocidad="1000" intervalo="15000">
        {slider.map((slider) => (
          <div
            className="contenedor-imagen-descripcion"
            key={slider.id}
            style={{ backgroundColor: slider.color }}
          >
            <div
              className="contenedor-slider-descripcion"
              style={{ marginRight: "10%" }}
            >
              <div className="contenedor-datos-descripcion">
                <h2>{slider.nombre} </h2>
                <p>{slider.descripcion} </p>
                <Link to={`/tienda`}>
                  <button>Ver ahora</button>
                </Link>
              </div>
            </div>
            <div className="contenedor-slider-imagen">
              <img src={slider.imgURL} alt="" />
            </div>
          </div>
        ))}
      </Slideshow>
    </div>
  );
};

export default Slider;
