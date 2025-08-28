import { useEffect, useState } from "react";
import AlojamientoItemReserva from "../Alojamientos/AlojamientoItemReserva";
import Calendario from "../Calendario/Calendario.js";
import "./ReservaWizard.css";
import MapaAlojamiento from "../Mapa/MapaAlojamiento";

function PasoFechas({ onNext, alojamientoProp }) {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");


  const reservaGuardada = JSON.parse(localStorage.getItem("reservaAlojamiento"));

  const alojamiento = reservaGuardada?.alojamiento || alojamientoProp;

  useEffect(() => {
    if (reservaGuardada?.checkIn) setFechaInicio(reservaGuardada.checkIn);
    if (reservaGuardada?.checkOut) setFechaFin(reservaGuardada.checkOut);
  }, []);

  const actualizarFechasDesdeCalendario = ({ inicio, fin }) => {
    const formatoISO = (fecha) => fecha.toISOString().split('T')[0];
    setFechaInicio(formatoISO(inicio));
    setFechaFin(formatoISO(fin));
  };

  const manejarContinuar = () => {
    
    if (fechaInicio && fechaFin) {
      const reservaActualizada = {
        ...reservaGuardada,
        checkIn: fechaInicio,
        checkOut: fechaFin,
        alojamiento: alojamiento
      };
      localStorage.setItem("reservaAlojamiento", JSON.stringify(reservaActualizada));
      
      onNext();
    } else {
      alert("Por favor seleccioná ambas fechas.");
    }
  };

  if (!alojamiento) return <p>Cargando alojamiento en paso fechas...</p>;

  return (
    <div className="reserva-wizard-container">
      <div className="alojamiento-container-izquierda">
        <div className="item-reserva-container">
          <AlojamientoItemReserva
            aAlojamiento={alojamiento}
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            cantidadViajeros={reservaGuardada?.viajeros || 1}
          />
        </div>
        <div className="mapa-container">
          <MapaAlojamiento
            latitud={alojamiento.direccion.latitud}
            longitud={alojamiento.direccion.longitud}
          />
        </div>
      </div>

      <div className="fechas-container-derecha">
        <Calendario
          idAlojamiento={alojamiento?._id}
          onSeleccionarRango={actualizarFechasDesdeCalendario}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
        />

        <h2>Seleccioná tus fechas</h2>
        <div className="campo">
          <label>Fecha de inicio:</label>
          <input
            type="date"
            disabled={true}
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Fecha de fin:</label>
          <input
            type="date"
            disabled={true}
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        <button className="boton-continuar" onClick={manejarContinuar}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default PasoFechas;