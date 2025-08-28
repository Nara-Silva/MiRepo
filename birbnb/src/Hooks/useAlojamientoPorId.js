import { useEffect, useState } from 'react';
import axios from 'axios';

const useAlojamientosPorId = (id) => {
  const [alojamiento, setAlojamiento] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchAlojamiento = async () => {
      try {
        setCargando(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/alojamientos/${id}`);
        setAlojamiento(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      fetchAlojamiento();
    }
  }, [id]);

  return { alojamiento, cargando };
};

export default useAlojamientosPorId;  