import React from "react";
import "./Flecha.css";
import { FaArrowAltCircleUp } from "react-icons/fa";

const Flecha = () => {
  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      duration: 4000,
      reset: false
    });
  };

  return (
    <div>
    <a href="#header" className="flecha" onClick={handleScrollTop} aria-label="Ir al inicio">
      <FaArrowAltCircleUp className="flecha-container" />
    </a>
    </div>
  );
};

export default Flecha;
