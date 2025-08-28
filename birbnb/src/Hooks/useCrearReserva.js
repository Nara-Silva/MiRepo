import { useState } from 'react';
import axios from 'axios';

import { jwtDecode } from 'jwt-decode';

const useCrearReserva = () => {
    const tokenCodificado = localStorage.getItem("token");
    const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    
    const crearReserva = async () => {
        const reservaGuardada = JSON.parse(localStorage.getItem("reservaAlojamiento"));
        if (!reservaGuardada || !tokenCodificado) {
            console.log("Entre al error de crear reserva reservaguarda")
            setError("Faltan datos para crear la reserva");
            return;
        }

        const body = {
            cantHuespedes: reservaGuardada.viajeros,
            id_alojamiento: reservaGuardada.alojamiento._id,
            fechaInicio: new Date(reservaGuardada.checkIn).toISOString(),
            fechaFin: new Date(reservaGuardada.checkOut).toISOString(),
        };

        try {
            console.log("Entre al post de crear reserva ")
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/reservas`, body, {
                headers: {
                    Authorization: `Bearer ${tokenCodificado}`,
                    'Content-Type': 'application/json',
                },
            });
            setResponse(res.data);
        } catch (err) {
            console.log("Rompi al crear reserva")
            setError(err);
        }
    };
    
    return { response, error, crearReserva };
}

export default useCrearReserva;
