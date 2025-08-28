import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header.js';
import Footer from '../../Components/Footer/Footer.js';
import ReservasList from '../../Components/Reservas/ReservasList.js';
import { jwtDecode } from 'jwt-decode';

const ReservasPorUsuarioDetailPage = () => {
  const tokenCodificado = localStorage.getItem("token");
  const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cargado, setCargado] = useState(false); // evita múltiples ejecuciones

  const fetchReservas = async () => {
    try {
      setCargando(true);

      // if (!token || !token.sub) {
      //   throw new Error("Token inválido o ausente.");
      // }

      console.log("Token codificado en localStorage:", tokenCodificado);
      console.log("Token decodificado:", token);


     const response = await axios.get(`${process.env.REACT_APP_API_URL}/reservasPrueba/usuarios`, {
      headers: {
          Authorization: `Bearer ${tokenCodificado}`
        }
      }).catch(error => {
      console.error("Error axios:", error.response ? error.response.data : error.message);
      throw error;
      });

      console.log("Historial recibido en el front:", response);

      // if (!Array.isArray(response.data)) {
      //   throw new Error("La respuesta del servidor no es un array de reservas.");
      // }

      const reservasfiltradas = response.data.filter(reserva => reserva.estado === 'PENDIENTE');

      const reservasExtendidas = await Promise.all(
        reservasfiltradas.map(async (reserva) => {
          try {
            const resAlojamiento = await axios.get(`${process.env.REACT_APP_API_URL}/alojamientos/${reserva.alojamiento}`);
            return { ...reserva, alojamiento: resAlojamiento.data };
          } catch (error) {
            console.error("Error al obtener datos del alojamiento:", error);
            return reserva;
          }
        })
      );

      setReservas(reservasExtendidas);

    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token && typeof token.sub === 'string' && !cargado) {
      fetchReservas();
      setCargado(true);
    } else if (!token?.sub) {
      console.warn('Token inválido o faltante:', token);
      setCargando(false);
    }
  }, [token, cargado]);

  const onCancelarReserva = async (idReserva) => {
    try {
      console.log("Cancelando reserva con ID:", idReserva);
      await axios.put(`${process.env.REACT_APP_API_URL}/reservas/${idReserva}/cancelacion`);
      await fetchReservas();
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      alert("No se pudo cancelar la reserva. Intente de nuevo más tarde.");
    }
  };

  return (
    <>
      <Header tokenDeUsuario={token} />
      <ReservasList 
        reservas={reservas}
        onCancelarReserva={onCancelarReserva}
      />
      <Footer/>
    </>
  );
};

export default ReservasPorUsuarioDetailPage;
