import "./AlojamientoItem.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosWifi } from "react-icons/io";
import { MdPool, MdOutlinePets } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";

const CaracteristicaItem = ({ caracteristica }) => {
  switch (caracteristica) {
    case "WIFI":
      return <span className="caracteristica"><IoIosWifi /></span>;
    case "PISCINA":
      return <span className="caracteristica"><MdPool /></span>;
    case "MASCOTAS_PERMITIDAS":
      return <span className="caracteristica"><MdOutlinePets /></span>;
    case "ESTACIONAMIENTO":
      return <span className="caracteristica"><FaCarSide /></span>;
    default:
      return <span> </span>;
  }
};

function obtenerSimbolo(moneda) {
  switch (moneda) {
    case "DOLAR_USA":
      return "U$D ";
    case "PESO_ARG":
      return "AR$ ";
    case "REALES":
      return "R$ ";
    default:
      return "$";
  }
}

const AlojamientoItem = ({ aAlojamiento }) => {
  const obtenerImagenUrl = (imagen) => {
    if (typeof imagen === "string") return imagen;
    return Object.keys(imagen)
      .filter((k) => !isNaN(k))
      .sort((a, b) => a - b)
      .map((k) => imagen[k])
      .join("");
  };

  const imagenes = aAlojamiento.fotos || [];
  const imagenesProcesadas = imagenes.map(obtenerImagenUrl);

  const CustomPrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div className="custom-arrow next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );

  const limpiarSlidesInternos = () => {
    const internalSlides = document.querySelectorAll(".slider-alojamiento .slick-slide");

    internalSlides.forEach((slide) => {
      const isVisible = slide.classList.contains("slick-active");
      const isClone = slide.classList.contains("slick-cloned");

      slide.setAttribute("aria-hidden", isClone || !isVisible ? "true" : "false");
      slide.style.pointerEvents = isClone || !isVisible ? "none" : "";

      // Remover tabindex directo del slide
      if (isClone || !isVisible) {
        slide.removeAttribute("tabindex");
      } else {
        slide.setAttribute("tabindex", "-1");
      }

      // Arreglar elementos internos focusables
      const focusables = slide.querySelectorAll("a, button, input, [tabindex]");
      focusables.forEach((el) => {
        el.setAttribute("tabindex", !isClone && isVisible ? "0" : "-1");
      });
    });
  };

  useEffect(() => {
    limpiarSlidesInternos();
  }, []);

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    className: "slider-alojamiento",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    afterChange: limpiarSlidesInternos
  };

  return (
    <Link className="link-alojamiento" to={`/alojamientos/${aAlojamiento._id}`}>
      <div className="alojamiento-item">
        <div className="slider-container">
          <Slider {...settings}>
            {imagenesProcesadas.map((url, i) => (
              <img key={i} src={url} alt={`Imagen ${i + 1}`} />
            ))}
          </Slider>
        </div>

        <div className="alojamiento-info">
          <div className="titulo-alojamiento">{aAlojamiento.nombreAlojamiento}</div>
          <div className="priceAndCaracteristics">
            <p>Precio por noche: {obtenerSimbolo(aAlojamiento.moneda)}{aAlojamiento.precioPorNoche}</p>
            <div className="caracteristicas">
              {aAlojamiento.caracteristicas.map((c, i) => (
                <div key={i}><CaracteristicaItem caracteristica={c} /></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlojamientoItem;
export { obtenerSimbolo, CaracteristicaItem };
