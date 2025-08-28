import React, { useState } from 'react';
import './NotificationList.css';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FechaCalendario = ({ fecha }) => {
  const dateObj = new Date(fecha);
  const dia = dateObj.getDate();
  const mes = dateObj.toLocaleString('default', { month: 'short' });
  const anio = dateObj.getFullYear();

  return (
    <div className="fecha-calendario">
      <div className="mes-fecha">{mes.toUpperCase()}</div>
      <div className="dia-fecha">{dia + 1}</div>
      <div className="anio">{anio}</div>
    </div>
  );
};

const NotificationList = ({ notificaciones, onAceptar, onRechazar , onLeer}) => {
  const [seleccionada, setSeleccionada] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="contenedor-notificaciones">

      <div className="lista-notificaciones">
        <div className="titulo"> 
          <h3>Notificaciones</h3>
        </div>
        
        {notificaciones.length === 0 ? (
          <p>No tenés notificaciones pendientes</p>
        ) : (
          notificaciones.map((n, index) => (
            <div
              key={index}
              className={`notificacion-card ${seleccionada === index ? 'activa' : ''}`}
              onClick={() => setSeleccionada(index)}
            >
              <FaBell className="icono-notificacion" />
              <div className="mensaje-contenido">
                <h3 className="mensaje">
                  {n.reserva?.alojamiento?.nombreAlojamiento || "Reserva no disponible"}
                </h3>
                <p className="info-chica">Estado: {n.reserva?.estado || "Desconocido"}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="detalle-notificacion">
        {seleccionada !== null ? (
          notificaciones[seleccionada]?.reserva ? (
            <div className="detalle-contenido">
              <img
                className="detalle-img"
                src={notificaciones[seleccionada].reserva.alojamiento.fotos?.[0] || "/default-image.jpg"}
                alt="Alojamiento"
              />
              <div className="detalle-texto">
                <h2>Detalle de Notificación</h2>
                <p><strong>Mensaje:</strong> {notificaciones[seleccionada].mensaje}</p>

                <h3>Datos de la Reserva</h3>
                <p><strong>Alojamiento:</strong> {notificaciones[seleccionada].reserva.alojamiento?.nombreAlojamiento || "No disponible"}</p>
                <p>
                  <strong>Link:</strong> 
                  <a 
                    className="link" 
                    onClick={() => navigate(`/alojamientos/${notificaciones[seleccionada].reserva.alojamiento?._id}`)}
                    style={{cursor: 'pointer'}}
                    target="_blank" 
                    rel="noreferrer"
                  >
                    Ver Alojamiento
                  </a>
                </p>

                <div className="fechas-detalle">
                  <div>
                    <strong>Desde:</strong>
                    {notificaciones[seleccionada].reserva.rangoDeFechas?.fechaInicio ? (
                      <FechaCalendario fecha={notificaciones[seleccionada].reserva.rangoDeFechas.fechaInicio} />
                    ) : "No disponible"}
                  </div>
                  <div>
                    <strong>Hasta:</strong>
                    {notificaciones[seleccionada].reserva.rangoDeFechas?.fechaFin ? (
                      <FechaCalendario fecha={notificaciones[seleccionada].reserva.rangoDeFechas.fechaFin} />
                    ) : "No disponible"}
                  </div>
                </div>

                <p><strong>Huéspedes:</strong> {notificaciones[seleccionada].reserva.cantHuespedes || "No disponible"}</p>
                <p><strong>Estado:</strong> {notificaciones[seleccionada].reserva.estado || "No disponible"}</p>

                {notificaciones[seleccionada].reserva.estado === 'PENDIENTE' ? (
                  <div className="botones">
                    <button
                      className="btn aceptar"
                      onClick={() => {
                        onAceptar(notificaciones[seleccionada].reserva?.id); 
                        onLeer(notificaciones[seleccionada]?.id);
                      }}
                    >
                      Aceptar
                    </button>
                    <button
                      className="btn rechazar"
                      onClick={() => {
                        onRechazar(notificaciones[seleccionada].reserva?.id);
                        onLeer(notificaciones[seleccionada].id);
                      }}
                    >
                      Rechazar
                    </button>
                  </div>
                ) : (
                  <div className="botones">
                    <button
                      className="btn aceptar"
                      onClick={() => onLeer(notificaciones[seleccionada].id)}
                    >
                      Marcar como Leída
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="mensaje-instruccion">No hay datos de reserva para esta notificación.</p>
          )
        ) : (
          <p className="mensaje-instruccion">Seleccioná una notificación para ver el detalle</p>
        )}
      </div>

    </div>
  );
};

export default NotificationList;
