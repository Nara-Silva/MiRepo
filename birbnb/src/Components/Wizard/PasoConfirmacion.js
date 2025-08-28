import React from "react";
import "./PasoConfirmacion.css";
import { useState } from "react";
import useCrearReserva from "../../Hooks/useCrearReserva.js"
function diferenciaEnDias(fecha1, fecha2) {
    const diffEnMilisegundos = fecha2.getTime() - fecha1.getTime();
    const diffEnDias = diffEnMilisegundos / (1000 * 60 * 60 * 24);
    return diffEnDias;
}

function PasoConfirmacion({formData, formDataPago, onNext}) {
  const [reservaCreada, setReservaCreada] = useState(false);
  const {crearReserva } = useCrearReserva();

  const reservaGuardada = JSON.parse(localStorage.getItem("reservaAlojamiento"));


  const handleConfirmar = () => {
    if (reservaGuardada) {
      crearReserva();
      setReservaCreada(true);
      onNext();
    } else {
      alert("No se encontró la reserva en localStorage");
    }
  }

  const alojamiento = reservaGuardada.alojamiento;
  const fechaInicio = new Date(reservaGuardada.checkIn);
  const fechaFin = new Date(reservaGuardada.checkOut);
  const total = diferenciaEnDias(fechaInicio, fechaFin) * alojamiento.precioPorNoche;



  return (
    <div className="contenedor-confirmacion">
      <h2 className="titulo-confirmacion">Revisá todos los datos antes de confirmar</h2>

      <div className="seccion-resumen-alojamiento">
        <div className="alojamiento-imagen-info">
          <img
            src={alojamiento.fotos[0]}
            alt="Foto del alojamiento"
            className="imagen-alojamiento"
          />
          <div className="info-alojamiento">
            <h3>{alojamiento.nombre}</h3>
            <p>{alojamiento.descripcion}</p>
          </div>
        </div>

        <div className="resumen-reserva">
          <h3>Datos de la reserva</h3>
          <ul>
            <li><strong>Fecha de ingreso:</strong> {reservaGuardada.checkIn}</li>
            <li><strong>Fecha de salida:</strong> {reservaGuardada.checkOut}</li>
            <li><strong>Huéspedes:</strong> {reservaGuardada.viajeros}</li>
            <li><strong>Precio por noche:</strong> ${alojamiento.precioPorNoche}</li>
            <li><strong>Total:</strong> ${total}</li>
          </ul>
        </div>
      </div>

      <div className="seccion-datos">
        <div className="grupo-datos">
          <h3>Datos personales</h3>
          <ul>
            <li><strong>Nombre:</strong> {formData.nombre}</li>
            <li><strong>Apellido:</strong> {formData.apellido}</li>
            <li><strong>Email:</strong> {formData.email}</li>
            <li><strong>Teléfono:</strong> {formData.telefono}</li>
            <li><strong>Documento:</strong> {formData.documento}</li>
            <li><strong>Dirección:</strong> {formData.direccion}</li>
            <li><strong>Ciudad:</strong> {formData.ciudad}</li>
            <li><strong>Código Postal:</strong> {formData.codigoPostal}</li>
          </ul>
        </div>

        <div className="grupo-datos">
          <h3>Datos de pago</h3>
          <ul>
          <li><strong>Últimos 4 dígitos:</strong> **** **** **** {formDataPago.lastFour}</li>
          <li><strong>Tipo de tarjeta:</strong> {formDataPago.cardType.displayName}</li>
          <li><strong>Vencimiento:</strong> {formDataPago.expiryDate}</li>
          </ul>
        </div>
      </div>

      <div className="seccion-boton-total">
        <p className="precio-total">Precio total: <strong>${total}</strong></p>
        <button className="boton-confirmar" onClick={handleConfirmar}>
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
}

export default PasoConfirmacion;
