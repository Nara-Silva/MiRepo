// useAlojamientoPorIdUsuario.js
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useAlojamientoPorIdUsuario = (token) => {
    const [alojamientos, setAlojamientos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const fetchAlojamientos = useCallback(async () => {
        try {
            console.log("Entre al useAlojamientosPorIDUsuario", token);
            setCargando(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/alojamientosPrueba/usuarios`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              })
            setAlojamientos(response.data);
        } catch (error) {
            console.error("Error al obtener alojamientos:", error);
        } finally {
            setCargando(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchAlojamientos();
        }
    }, [token, fetchAlojamientos]);

    return {
        alojamientos,
        cargando,
        refetch: fetchAlojamientos
    };
};

export default useAlojamientoPorIdUsuario;
