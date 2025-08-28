import { createContext, useContext, useState } from 'react';

const FiltrosContext = createContext();


export const FiltrosProvider = ({ children }) => {
  const [filtros, setFiltros] = useState({
        ciudad: '',
        pais: '',
        caracteristicas: [],
        precioMin: 0,
        precioMax: Infinity,
        huespedes: 1,
        moneda: '',
  });

  return (
    <FiltrosContext.Provider value={{ filtros, setFiltros }}>
      {children}
    </FiltrosContext.Provider>
  );
};

export const useFiltros = () => useContext(FiltrosContext);