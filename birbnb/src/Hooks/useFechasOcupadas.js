import { useEffect, useState } from 'react';
import axios from 'axios';

const useFechasOcupadas = (idAlojamiento) => {

    const [fechasOcupadas, setFechasOcupadas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchFechasOcupadas = async () => {
            try {
                //console.log(idAlojamiento)
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/reservas/fechasOcupadas/${idAlojamiento}`);
                //console.log('Fechas ocupadas obtenidas:', response.data);
                setFechasOcupadas(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setCargando(false);
            }
        };

        fetchFechasOcupadas();
    }, [idAlojamiento]);

    return { fechasOcupadas, cargando };
}

export default useFechasOcupadas;