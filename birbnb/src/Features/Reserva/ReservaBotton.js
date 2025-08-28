import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservaBotton.css'; 
import { useReserva } from './ReservaContext'; 
import { jwtDecode } from 'jwt-decode';

function ReservaBoton({ idAlojamiento }) {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [shake, setShake] = useState(false);
  const tokenCodificado = localStorage.getItem("token");
  const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;
  const navigate = useNavigate();

  
  const handleClick = () => {
    const reserva = JSON.parse(localStorage.getItem("reservaAlojamiento"));
    const checkIn = reserva?.checkIn;
    const checkOut = reserva?.checkOut;
    const viajeros = reserva?.viajeros;
    
    const reservaCompleta = viajeros;
    if (token == null) {
      setMensajeAlerta("¡Debes iniciar sesión para realizar una reserva!");
      setMostrarAlerta(true);
      setShake(true);
  
      setTimeout(() => setShake(false), 1000);
      setTimeout(() => setMostrarAlerta(false), 3000);
      return;
    }
    if (!reservaCompleta) {
      setMensajeAlerta("¡Seleccioná fechas y cantidad de viajeros antes de reservar!");
      setMostrarAlerta(true);
      setShake(true);

      setTimeout(() => setShake(false), 1000);
      setTimeout(() => setMostrarAlerta(false), 3000);
      return;
    }
    if (new Date(checkIn) > new Date(checkOut)) {
      setMensajeAlerta("¡Verifique las fechas seleccionadas!");
      setMostrarAlerta(true);
      setShake(true);

      setTimeout(() => setShake(false), 1000);
      setTimeout(() => setMostrarAlerta(false), 3000);
      return;
    }

    // Si está todo correcto, ir a la ruta de reserva
    navigate(`/reserva/${idAlojamiento}`);
  };

  const irALogin = () => {
    navigate('/loginK');
  };

  return (
    <>
      <button className={`btn-reservar ${shake ? 'shake' : ''}`} onClick={handleClick}>
        Reservar
      </button>

      {mostrarAlerta && (
        <div className="alerta-registro">
          <p>{mensajeAlerta}</p>
            <button onClick={irALogin} >Ir a login</button>
        </div>
      )}
    </>
  );
}

export default ReservaBoton;
