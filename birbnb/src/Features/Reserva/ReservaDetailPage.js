import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReserva } from '../../Features/Reserva/ReservaContext.js';
import './ReservaDetailPage.css';
import Header from '../../Components/Header/Header.js';
import Footer from '../../Components/Footer/Footer.js';
import ReservaWizard from '../../Components/Wizard/ReservaWizard.js';
import { jwtDecode } from 'jwt-decode';

const ReservaDetailPage = () => {
  const { idAlojamiento } = useParams();
  const tokenCodificado = localStorage.getItem("token");
  const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;
  //console.log("Alojamiento id " + idAlojamiento);

  const { datosReserva, setDatosReserva } = useReserva();
  const { alojamiento } = datosReserva;
  //console.log("El alojamiento que llega es:", alojamiento)

  useEffect(() => {
    const alojamientoGuardado = localStorage.getItem("reservaAlojamiento");
    if (!datosReserva.alojamiento && alojamientoGuardado) {
      const alojamientoParsed = JSON.parse(alojamientoGuardado);
      setDatosReserva(prev => ({
        ...prev,
        alojamiento: alojamientoParsed
      }));
    }
  }, []);

  return (
    <div className='reserva-detail-page-container'>
      <Header tokenDeUsuario={token}/>
      <ReservaWizard alojamiento={alojamiento} />
      <Footer/>
    </div>
  );  
};

export default ReservaDetailPage;
