import useAlojamientos from '../../Hooks/useAlojamientos.js';
import AlojamientoItem from '../Alojamientos/AlojamientoItem.js';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import 'swiper/css/navigation';
import './Carousel.css';
import 'swiper/css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from 'react';

const FlechaIzquierda = ({ style, onClick }) => (
  <button
    className="arrowCarousel arrowCarousel-left"
    onClick={onClick}
    style={{ ...style }}
    aria-label="Desplazar carrusel a la izquierda"
  >
    <FaChevronLeft size={20} />
  </button>
);

const FlechaDerecha = ({ style, onClick }) => (
  <button
    className="arrowCarousel arrowCarousel-right"
    onClick={onClick}
    style={{ ...style }}
    aria-label="Desplazar carrusel a la derecha"
  >
    <FaChevronRight size={20} />
  </button>
);

function Carousel({ criterios }) {
  const { alojamientos, cargando } = useAlojamientos(criterios);
  const sliderRef = useRef(null);

  const actualizarAccesibilidadSlides = () => {
    const slides = document.querySelectorAll(".carousel-container-items .slick-slide");

    slides.forEach((slide) => {
      const isVisible = slide.classList.contains("slick-active");
      const isClone = slide.classList.contains("slick-cloned");

      const ariaHidden = isClone || !isVisible ? "true" : "false";
      const pointerEvents = isClone || !isVisible ? "none" : "";

      slide.setAttribute("aria-hidden", ariaHidden);
      slide.style.pointerEvents = pointerEvents;

      // Quitar foco a elementos internos si están ocultos
      const focusables = slide.querySelectorAll("a, button, input, textarea, select, [tabindex]");
      focusables.forEach((el) => {
        el.setAttribute("tabindex", ariaHidden === "true" ? "-1" : "0");
      });
    });
  };

  useEffect(() => {
    actualizarAccesibilidadSlides();

    const observer = new MutationObserver(actualizarAccesibilidadSlides);
    const container = document.querySelector(".carousel-container-items");

    if (container) {
      observer.observe(container, { subtree: true, childList: true });
    }

    return () => observer.disconnect();
  }, [alojamientos]);

  if (cargando) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!alojamientos || alojamientos.length === 0) {
    return <div>No se encontraron alojamientos.</div>;
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <FlechaIzquierda />,
    nextArrow: <FlechaDerecha />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ],
    afterChange: actualizarAccesibilidadSlides
  };

  return (
    <div className="carousel-container-items">
      <Slider ref={sliderRef} {...settings}>
        {alojamientos.map((alojamiento, index) => (
          <div key={index} className="slide-wrapper">
            <AlojamientoItem aAlojamiento={alojamiento} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
