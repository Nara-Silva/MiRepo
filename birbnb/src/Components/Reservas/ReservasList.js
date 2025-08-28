import React, { useState, useEffect } from 'react';
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import './ReservasList.css';
import { TiHome } from "react-icons/ti";
import { FaLink } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { IoMdClock } from "react-icons/io";
import { IoPricetags } from "react-icons/io5";
import axios from 'axios';
import Calendario from '../Calendario/Calendario';
import { useNavigate } from 'react-router-dom';

const FechaCalendario = ({ fecha }) => {
  const dateObj = new Date(fecha);
  const dia = dateObj.getDate();
  const mes = dateObj.toLocaleString('default', { month: 'short' });
  const anio = dateObj.getFullYear();

  return (
    <div className="fecha-calendario">
      <div className="mes-fecha">{mes.toUpperCase()}</div>
      <div className="dia-fecha">{dia}</div>
      <div className="anio-fecha">{anio}</div>
    </div>
  );
};

const aMedianoche = (fecha) => {
  const d = new Date(fecha);
  d.setHours(0, 0, 0, 0);
  return d;
};

const ReservasList = ({ reservas, onCancelarReserva, onModificarReserva }) => {
  const [seleccionada, setSeleccionada] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState({
    inicio: null,
    fin: null
  });
  const [cargando, setCargando] = useState(false);
  const [errorFechas, setErrorFechas] = useState('');
  const navigate = useNavigate();

  function diferenciaEnDias(fecha1, fecha2) {
    const diffEnMilisegundos = fecha2.getTime() - fecha1.getTime();
    const diffEnDias = diffEnMilisegundos / (1000 * 60 * 60 * 24);
    return Math.ceil(diffEnDias);
  }

  useEffect(() => {
    if (editandoId && reservas.length > 0) {
      const reserva = reservas.find(r => r._id === editandoId);
      if (reserva) {
        setFechasSeleccionadas({
          inicio: new Date(reserva.rangoDeFechas?.fechaInicio),
          fin: new Date(reserva.rangoDeFechas?.fechaFin)
        });
      }
    }
  }, [editandoId, reservas]);

  const iniciarEdicion = (id) => {
    setEditandoId(id);
    setErrorFechas('');
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFechasSeleccionadas({ inicio: null, fin: null });
  };

  const manejarSeleccionRango = (rango) => {
    setFechasSeleccionadas(rango);
    setErrorFechas('');
  };

  const modificarFechasReserva = async () => {
    if (!fechasSeleccionadas.inicio || !fechasSeleccionadas.fin) {
      setErrorFechas('Debes seleccionar un rango de fechas válido');
      return;
    }

    if (fechasSeleccionadas.fin <= fechasSeleccionadas.inicio) {
      setErrorFechas('La fecha de fin debe ser posterior a la de inicio');
      return;
    }

    setCargando(true);
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/reservas/${editandoId}`,
        {
          rangoDeFechas: {
            fechaInicio: fechasSeleccionadas.inicio.toISOString(),
            fechaFin: fechasSeleccionadas.fin.toISOString()
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`  // Checkear esto...
          }
        }
      );

      if (onModificarReserva) {
        onModificarReserva(editandoId, {
          rangoDeFechas: {
            fechaInicio: fechasSeleccionadas.inicio.toISOString(),
            fechaFin: fechasSeleccionadas.fin.toISOString()
          }
        });
      }

      setEditandoId(null);
      setFechasSeleccionadas({ inicio: null, fin: null });
    } catch (error) {
      console.error("Error al modificar reserva:", error);
      setErrorFechas("No se pudieron actualizar las fechas. Intente nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const renderFormularioEdicion = () => {
    const reserva = reservas.find(r => r._id === editandoId);
    if (!reserva) return null;

    return (
      <div className="detalle-contenido">
        <div className="formulario-edicion-fechas">
          <h3><FaEdit /> Modificar Fechas de Reserva</h3>
          
          <div className="calendario-container">
            <Calendario 
              idAlojamiento={reserva.alojamiento?._id}
              onSeleccionarRango={manejarSeleccionRango}
            />
          </div>

          <div className="resumen-precio">
            <p><strong>Precio por noche:</strong> ${reserva.precioPorNoche || "No disponible"}</p>
            <p><strong>Total estimado:</strong> ${
              fechasSeleccionadas.inicio && fechasSeleccionadas.fin 
                ? diferenciaEnDias(fechasSeleccionadas.inicio, fechasSeleccionadas.fin) * reserva.precioPorNoche
                : "Calculando..."
            }</p>
          </div>

          {errorFechas && <p className="error-fechas">{errorFechas}</p>}

          <div className="botones-accion">
            <button 
              className="btn-cancelar" 
              onClick={cancelarEdicion}
              disabled={cargando}
            >
              <FaTimes /> Cancelar
            </button>
            <button 
              className="btn-guardar" 
              onClick={modificarFechasReserva}
              disabled={cargando || !fechasSeleccionadas.inicio || !fechasSeleccionadas.fin}
            >
              {cargando ? 'Guardando...' : <><FaSave /> Guardar</>}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="contenedor-reservas">
      <div className="lista-reservas">
        <div className="titulo">
          <h3>Reservas Pendientes</h3>
        </div>

        {reservas.length === 0 ? (
          <p>No tenés reservas pendientes</p>
        ) : (
          reservas.map((r, index) => (
            <div
              key={index}
              className={`reserva-card ${seleccionada === index ? 'activa' : ''}`}
              onClick={() => {
                setSeleccionada(index);
                setEditandoId(null);
              }}
            >
              <PiPaperPlaneTiltBold />
              <div className="resumen-reserva-reserva">
                <h3 className="mensaje">{r.alojamiento?.nombreAlojamiento || "Alojamiento no disponible"}</h3>
                <p className="info-chica">Estado: {r.estado || "Desconocido"}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="detalle-notificacion">
        {seleccionada !== null ? (
          reservas[seleccionada] ? (
            editandoId === reservas[seleccionada]._id ? (
              renderFormularioEdicion()
            ) : (
              <div className="detalle-contenido">
                <img
                  className="detalle-img"
                  src={reservas[seleccionada].alojamiento?.fotos?.[0] || "/default-image.jpg"}
                  alt="Alojamiento"
                />
                <div className="detalle-texto">
                  <h3>Datos de la Reserva</h3>
                  <p><strong><TiHome /></strong> {reservas[seleccionada].alojamiento?.nombreAlojamiento || "No disponible"}</p>
                  <p><strong><FaLink /></strong> 
                  <a className="link" 
                      onClick={() => navigate(`/alojamientos/${reservas[seleccionada].alojamiento?._id}`)}
                      style={{cursor: 'pointer'}}
                     target="_blank" 
                     rel="noreferrer">Ver Alojamiento
                  </a></p>

                  <div className="fechas-detalle">
                    <div>
                      <strong>Desde:</strong>
                      {reservas[seleccionada].rangoDeFechas?.fechaInicio ? (
                        <FechaCalendario fecha={reservas[seleccionada].rangoDeFechas.fechaInicio} />
                      ) : "No disponible"}
                    </div>
                    <div>
                      <strong>Hasta:</strong>
                      {reservas[seleccionada].rangoDeFechas?.fechaFin ? (
                        <FechaCalendario fecha={reservas[seleccionada].rangoDeFechas.fechaFin} />
                      ) : "No disponible"}
                    </div>
                  </div>

                  <p><strong><FaMoneyBillWave /> </strong> ${reservas[seleccionada].precioPorNoche || "No disponible"}</p>
                  <p>
                    <strong><MdPeopleAlt /></strong>{" "}
                    {reservas[seleccionada].cantHuespedes
                      ? `${reservas[seleccionada].cantHuespedes} ${reservas[seleccionada].cantHuespedes === 1 ? 'persona' : 'personas'}`
                      : 'No disponible'}
                  </p>
                  <p><strong><IoMdClock /></strong> {reservas[seleccionada].estado || "No disponible"}</p>
                  <p>
                    <strong><IoPricetags /> </strong>
                    {reservas[seleccionada].rangoDeFechas?.fechaInicio && reservas[seleccionada].rangoDeFechas?.fechaFin && reservas[seleccionada].precioPorNoche
                      ? `$${diferenciaEnDias(new Date(reservas[seleccionada].rangoDeFechas.fechaInicio), new Date(reservas[seleccionada].rangoDeFechas.fechaFin)) * reservas[seleccionada].precioPorNoche}`
                      : "No disponible"}
                  </p>

                  <div className="botones">
                    {reservas[seleccionada].estado === 'PENDIENTE' && (
                      <button
                        className="btn cancelar"
                        id='cancelar-reserva'
                        onClick={() => onCancelarReserva(reservas[seleccionada]?._id)}
                      >
                        Cancelar Reserva
                      </button>
                    )}
                    <button
                      className="btn modificar"
                      onClick={() => iniciarEdicion(reservas[seleccionada]._id)}
                    >
                      <FaEdit /> Modificar Fechas
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <p className="mensaje-instruccion">No hay datos para esta reserva.</p>
          )
        ) : (
          <p className="mensaje-instruccion">Seleccioná una reserva para ver el detalle</p>
        )}
      </div>
    </div>
  );
};

export default ReservasList;