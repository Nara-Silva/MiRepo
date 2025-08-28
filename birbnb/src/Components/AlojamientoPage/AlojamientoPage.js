import GaleriaImagenes from '../GaleriaImagenes/GaleriaImagenes';
import React, { useState, useEffect } from 'react'; 
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "./AlojamientoPage.css";
import { IoIosWifi } from "react-icons/io";
import { MdPool, MdOutlinePets } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import ReservaBoton from '../../Features/Reserva/ReservaBotton';
import { useReserva } from '../../Features/Reserva/ReservaContext.js'; 
import Carousel from '../../Components/Carousel/Carousel.js';
import { useFiltros } from '../../Filtros/FiltrosContext';

const AlojamientoPage = ({ alojamiento }) => {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [viajeros, setViajeros] = useState(1);
    const {filtros} = useFiltros();
    const { setDatosReserva } = useReserva();

    useEffect(() => {
        const datos = {
            checkIn: checkIn ? format(checkIn, 'yyyy-MM-dd') : '',
            checkOut: checkOut ? format(checkOut, 'yyyy-MM-dd') : '',
            viajeros,
            alojamiento
        };
        setDatosReserva(prev => ({ ...prev, ...datos }));
        localStorage.setItem("reservaAlojamiento", JSON.stringify(datos));
    }, [checkIn, checkOut, viajeros, alojamiento]);

    if (!alojamiento) return <p>Alojamiento no disponible</p>;

    function obtenerSimbolo(moneda) {
        switch (moneda) {
            case "DOLAR_USA":
                return "U$D ";
            case "PESO_ARG":
                return "AR$ ";
            case "REALES":
                return "R$ ";
            default:
                return "$";
        }
    }

    const CaracteristicaItem = ({ caracteristica }) => {
        switch (caracteristica) {
            case "WIFI":
                return <span className="caracteristica"><IoIosWifi /> Wifi</span>;
            case "PISCINA":
                return <span className="caracteristica"><MdPool /> Piscina</span>;
            case "MASCOTAS_PERMITIDAS":
                return <span className="caracteristica"><MdOutlinePets /> Mascotas permitidas</span>;
            case "ESTACIONAMIENTO":
                return <span className="caracteristica"><FaCarSide /> Estacionamiento</span>;
            default:
                return <span className="caracteristica">{caracteristica}</span>;
        }
    };

    return (
        <div>
            <div className='alojamiento-page'>
                <h1 className='title'>{alojamiento.nombreAlojamiento}</h1>
                <p className='subtitle'>{alojamiento.descripcion}</p>

                <div className="rating-container"/>

                <GaleriaImagenes className="galeria-container" imagenes={alojamiento.fotos} />

                <div className="detalles-container">
                    <div className="detalles">
                        <p><strong>Capacidad:</strong> {alojamiento.cantHuespedesMax} personas</p>
                        {alojamiento.caracteristicas && alojamiento.caracteristicas.length > 0 ? (
                            <>
                                <p><strong>Características:</strong></p>
                                <div className="caracteristicas-page">
                                    {alojamiento.caracteristicas.map((c, i) => (
                                        <div key={i}><CaracteristicaItem caracteristica={c} /></div>
                                    ))}
                                </div>
                            </>
                        ) : null}
                    </div>
                    
                    <div className="reserva-box">
                        <p className="precio">
                            <strong>{obtenerSimbolo(alojamiento.moneda)}{alojamiento.precioPorNoche}</strong> por noche
                        </p>


                        <div className="viajeros-select">
                            <small>VIAJEROS</small>
                            <select
                                value={viajeros}
                                onChange={(e) => {
                                    const nuevoValor = Number(e.target.value);
                                    setViajeros(nuevoValor);
                                }}
                            >
                                {Array.from(
                                    { length: Number(alojamiento.cantHuespedesMax) },
                                    (_, i) => i + 1
                                ).map(n => (
                                    <option key={n} value={n}>
                                        {n} viajero{n > 1 ? 's' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <ReservaBoton idAlojamiento={alojamiento._id} />
                    </div>
                </div>
            </div>
            <Carousel criterios={filtros}></Carousel>
        </div>
    );
};

export default AlojamientoPage;