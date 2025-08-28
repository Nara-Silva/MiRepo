// ReservaContext.js
import { createContext, useContext, useState } from 'react';

const ReservaContext = createContext();

export const ReservaProvider = ({ children }) => {
  const [datosReserva, setDatosReserva] = useState({
    checkIn: '',
    checkOut: '',
    viajeros: 1,
    alojamiento: null
  });

  return (
    <ReservaContext.Provider value= {{ datosReserva, setDatosReserva }}>
      {children}
    </ReservaContext.Provider>
  );
};

export const useReserva = () => useContext(ReservaContext);
