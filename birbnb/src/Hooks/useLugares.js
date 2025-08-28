import { useEffect, useState } from 'react';
import axios from 'axios';

const useLugares = () => {
    const [lugares, setLugares] = useState([]);
    const [cargando, setCargando] = useState(true);
  
    useEffect(() => {
      const obtenerLugares = async () => {
        try {
          setCargando(true);
              console.log(`${process.env.REACT_APP_API_URL}/alojamientos/lugares`)
              const response = await axios.get(`${process.env.REACT_APP_API_URL}/alojamientos/lugares`,);
          setLugares(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setCargando(false);
        }
      };
  
      obtenerLugares();
    },[]); // solo una vez al montar, no se actualiza con filtros
  
    return { lugares, cargando };
  };
  
  export default useLugares;