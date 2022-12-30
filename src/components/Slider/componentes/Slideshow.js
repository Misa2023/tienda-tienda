import React, { useRef, useEffect, useCallback } from "react";

const Slideshow = ({ children, velocidad = "1000", intervalo = "15000" }) => {
  const slideshow = useRef(null);
  const intervaloSlideshow = useRef(null);

  const siguiente = useCallback(() => {
    if (slideshow.current !== null) {
      const primerElemento = slideshow.current.children[0];

      slideshow.current.style.transition = `${velocidad}ms ease-out all`;

      const tamañoSlide = slideshow.current.children[0].offsetWidth;

      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      const transicion = () => {
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translateX(0)`;

        slideshow.current.appendChild(primerElemento);

        slideshow.current.removeEventListener("transitionend", transicion);
      };

      slideshow.current.addEventListener("transitionend", transicion);
    }
  }, [velocidad]);

  const anterior = () => {
    if (slideshow.current.children.length > 0) {
      const index = slideshow.current.children.length - 1;
      const ultimoElemento = slideshow.current.children[index];
      slideshow.current.insertBefore(
        ultimoElemento,
        slideshow.current.firstChild
      );

      slideshow.current.style.transition = "none";
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `${velocidad}ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  useEffect(() => {
    if (slideshow.current !== null) {
      intervaloSlideshow.current = setInterval(() => {
        siguiente();
      }, intervalo);
    }
  }, [intervalo, siguiente]);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{ display: "flex", flexWwrap: "nowrap", height: "520px" }}
        ref={slideshow}
      >
        {children}
      </div>

      <div className="contenedor-botones">
        <button
          className="boton-slider"
          style={{ left: "0" }}
          onClick={anterior}
        >
          <img src="/icons/IconoRegresar.svg" alt="" />{" "}
        </button>
        <button
          className="boton-slider"
          style={{ right: "0" }}
          onClick={siguiente}
        >
          <img src="/icons/IconoAdelante.svg" alt="" />{" "}
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
