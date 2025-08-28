import Carousel from '../../Components/Carousel/Carousel.js';
import Header from '../../Components/Header/Header.js';
import Navbar from '../../Components/Navbar/Navbar.js';
import Footer from '../../Components/Footer/Footer.js';
import Body from '../../Components/Body/Body.js';
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Fecha from '../../Components/Flecha/Flecha.js';
import { useLocation, useNavigate } from 'react-router-dom';

function HomePage() {
    // const { setFiltros } = useFiltros();
    const location = useLocation();
    const navigate = useNavigate();

    const [mostrarToast, setMostrarToast] = useState(false);

    const criteriosPorPesos = {moneda: 'PESO_ARG'};
    const criteriosPorDolares = {moneda: 'DOLAR_USA'};
    const criteriosPorCaracteristicas = {caracteristicas: ['WIFI']};
    const criteriosPorCaracteristicasMascotas = {caracteristicas: ["MASCOTAS_PERMITIDAS"]};
    const criteriosPorCaracteristicasEstacionamiento = {caracteristicas: ["ESTACIONAMIENTO"]};
    const criteriosPorCaracteristicasEstacionamientoOferta = {precioMax: 1500};
    const criteriosPorCaracteristicasEstacionamientoCaros = {precioMin: 500};
    const criteriosPorCaracteristicasCaracteristicasVarias = {caracteristicas: ["WIFI","ESTACIONAMIENTO","PISCINA"]}

    useEffect(() => {
        if (location.state?.creado) {
            setMostrarToast(true);
            navigate(location.pathname, { replace: true, state: {} });

            setTimeout(() => {
                setMostrarToast(false);
            }, 2000);
        }
    }, [location, navigate]);

    const handleReservasClick = () => {
        navigate('/alojamientos/reservar');
    };

    return (
        <>
            <Header/>
            <Navbar />
            {mostrarToast && (
                <div className="admin-toast">¡Alojamiento creado correctamente!</div>
            )}
            <Body>
            <p className="carousel-item-title">Alojamientos en oferta</p>
            <Carousel criterios={criteriosPorCaracteristicasEstacionamientoOferta} />

            <p className="carousel-item-title">Alojamientos en pesos</p>
            <Carousel criterios={criteriosPorPesos} />

            <p className="carousel-item-title">Alojamientos con wifi</p>
            <Carousel criterios={criteriosPorCaracteristicas} />

            <p className="carousel-item-title">Alojamientos con mascotas permitidas</p>
            <Carousel criterios={criteriosPorCaracteristicasMascotas} />

            <p className="carousel-item-title">Alojamientos en dólares</p>
            <Carousel criterios={criteriosPorDolares} />

            <p className="carousel-item-title">Alojamientos con estacionamiento</p>
            <Carousel criterios={criteriosPorCaracteristicasEstacionamiento} />

            <p className="carousel-item-title">Alojamientos de lujo</p>
            <Carousel criterios={criteriosPorCaracteristicasEstacionamientoCaros} />

            <p className="carousel-item-title">Alojamientos con características varias</p>
            <Carousel criterios={criteriosPorCaracteristicasCaracteristicasVarias} />
            </Body>
            <Fecha />
            <Footer />
        </>
    );
}

export default HomePage;
