import { useState } from "react";
import PasoFechas from "./PasoFechas";
// import PasoPago from "./PasoPago";
// import PasoConfirmacion from "./PasoConfirmacion";
import { FaRegCheckCircle } from "react-icons/fa";
import "./ReservaWizard.css";
import PasoInfoPersonal from "../InformacionPersonal/PasoInfoPersonal";
import PasoPago from "../Pago/PasoPago";
import PasoConfirmacion from "./PasoConfirmacion";
import { useNavigate } from "react-router";

function ReservaWizard({alojamiento}) {
  const [pasoActual, setPasoActual] = useState(1);
  const totalDePasos = 5;
  const navigate = useNavigate();

  //Formulario de datos personales
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    documento: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    pais: ''
  });

  const [datosPago, setDatosPago] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });


  const avanzar = () => {
    if (pasoActual < totalDePasos) {
      setPasoActual(pasoActual + 1);
    }
  };

  const retroceder = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1);
  };

  const pasos = ["Fechas", "Información", "Pago", "Confirmación"];

  return (
    <div className="reserva-wizard-container">
      
      <div className="form-wizard">
        <h1>Reserva</h1>

        <div className="progress-container">
          <ol>
            {pasos.map((nombre, index) => {
              const numero = index + 1;
              let clase = "";
              if (pasoActual > numero) clase = "done";
              else if (pasoActual === numero) clase = "current";

              return (
                <li key={numero} className={clase}>
                  {nombre}
                  {clase === "current" && <span className="destello" />}
                </li>
              );
            })}
          </ol>
          <div
            className="progress"
            style={{
              transform: `scaleX(${pasoActual === 5 ? 1 : (pasoActual - 0.5) / (totalDePasos - 1)})`,
            }}
          />
        </div>

        {pasoActual === 1 && <PasoFechas onNext={avanzar} alojamiento={alojamiento} />}
        {pasoActual === 2 && (
          <PasoInfoPersonal
            onNext={avanzar}
            onBack={retroceder}
            formData={datosPersonales}
            setFormData={setDatosPersonales}
          />
        )}
        {pasoActual === 3 && (<PasoPago
          onNext={(infoPago) => {
            setDatosPago(prev => ({ ...prev, ...infoPago }));
            avanzar();
          }}
          onBack={retroceder}
          formDataPago={datosPago}
          setFormDataPago={setDatosPago}
        />)}
        {pasoActual === 4 && (
          <PasoConfirmacion
            formData={datosPersonales}
            formDataPago={datosPago}
            onNext={avanzar}
          />
        )}
        {pasoActual === 5 && (
          <div className="contenedor-confirmacion">
          <h2 className="titulo-exito">¡Reserva creada exitosamente!</h2>
            <FaRegCheckCircle size={30} />
            <p className="mensaje-exito">
              Recibirás una notificacion del anfitrion cuando sea confirmada.
            </p>
        <button
            className="boton-volver"
            onClick={() => {
              navigate("/reservas") 
              }}
            >
              Mis reservas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservaWizard;