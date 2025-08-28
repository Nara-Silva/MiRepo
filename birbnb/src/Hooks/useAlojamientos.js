import { useEffect, useState } from 'react';
import axios from 'axios';

const useAlojamientos = (criterios, pagina = 1, limite = 6) => {
    const [alojamientos, setAlojamientos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [totalAlojamientos, setTotalAlojamientos] = useState(0);
  
  // console.log("Criterios", criterios)
  // console.log("Criterios Moneda", criterios.moneda)

    useEffect(() => {
      //console.log('Criterios recibidos en useAlojamientos:', criterios);

      const filterAlojamientos = async () => {
        try {
          setCargando(true);
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/alojamientos`, {
            params: {
              caracteristicas: criterios.caracteristicas?.join(','),
              ciudad: criterios.ciudad,
              pais: criterios.pais,
              precioMin: criterios.precioMin,
              precioMax: criterios.precioMax,
              huespedes: criterios.huespedes,
              moneda: criterios.moneda,
              pagina ,
              limite
            }
          });
          //console.log('Respuesta completa de la API:', response);
          setAlojamientos(response.data.resultados);
          setTotalAlojamientos(response.data.total || 0);
        } catch (error) {
          console.error(error);
        } finally {
          setCargando(false);
        }
      };
      filterAlojamientos();
    }, [criterios, pagina, limite]);
  
    const totalPaginas = Math.ceil(totalAlojamientos / 6);
  
    return { alojamientos, cargando, totalPaginas, totalAlojamientos };
};
  
export default useAlojamientos;