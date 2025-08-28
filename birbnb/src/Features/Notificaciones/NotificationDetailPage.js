import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationList from '../../Components/Notificaciones/NotificationList';
import Header from '../../Components/Header/Header.js';
import Footer from '../../Components/Footer/Footer.js';
import { jwtDecode } from 'jwt-decode';

const NotificationDetailPage = () => {
  // const { token} = useAccessToken();
  const tokenCodificado = localStorage.getItem("token");
  const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cargado, setCargado] = useState(false); // flag para evitar ejecución múltiple

  const fetchNotificaciones = async () => {
    try {
      setCargando(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios/notificaciones/sin-leer`, {
         headers: {
                    'Authorization': `Bearer ${tokenCodificado}`,
                    'Content-Type': 'application/json',
                }
      });
      const notificaciones = response.data;

      const notificacionesExtendidas = await Promise.all(
        notificaciones.map(async (notif) => {
          try {
            const resReserva = await axios.get(`${process.env.REACT_APP_API_URL}/reservas/${notif.reserva}`);
            const reserva = resReserva.data;

            return {
              id: notif.id,
              ...notif,
              reserva: {
                id: notif.reserva,
                ...reserva
              }
            };
          } catch (error) {
            console.error("Error al obtener datos relacionados:", error);
            return notif;
          }
        })
      );

      setNotificaciones(notificacionesExtendidas);
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token && typeof token.sub === 'string' && !cargado) {
      fetchNotificaciones();
      setCargado(true);
    }
  }, [token, cargado]);

  const handleAceptar = async (idReserva) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/reservas/${idReserva}/confirmacion`);
      await fetchNotificaciones();
    } catch (error) {
      console.error('Error al aceptar la reserva:', error);
      alert("No se pudo confirmar la reserva. Intente nuevamente.");
    }
  };

  const handleRechazar = async (idReserva) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/reservas/${idReserva}/cancelacion`);
      await fetchNotificaciones();
    } catch (error) {
      console.error('Error al rechazar la reserva:', error);
      alert("No se pudo rechazar la reserva. Intente nuevamente.");
    }
  };

  const onLeer = async (idnotificacion) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/notificaciones/${idnotificacion}`);
      await fetchNotificaciones();
    } catch (error) {
      console.error('Error al marcar la notificación como leída:', error);
      alert("No se pudo marcar como leída. Intente nuevamente.");
    }
  };

  return (
    <>
      <Header tokenDeUsuario={token} />
      <NotificationList
        notificaciones={notificaciones}
        onAceptar={handleAceptar}
        onRechazar={handleRechazar}
        onLeer={onLeer}
      
      />
      <Footer/>
    </>
  );
};

export default NotificationDetailPage;
