// Esta pagina es del alojamiento mas detallado

import AlojamientoPage from '../../Components/AlojamientoPage/AlojamientoPage.js';
import Header from '../../Components/Header/Header.js';
import Navbar from '../../Components/Navbar/Navbar.js';
import { useParams } from 'react-router-dom'; // Importamos useParams para obtener los parametros de la URL
import './AlojamientoDetailPage.css';
import useAlojamientosPorId from '../../Hooks/useAlojamientoPorId.js';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Hooks/useAuth.js';
// import { useAccessToken } from '../../Hooks/useAccessToken.js';
import { jwtDecode } from 'jwt-decode';

const AlojamientoDetailPage = () => {
    // const { token, loading, error } = useAccessToken();
    const tokenCodificado = localStorage.getItem("token");
    const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;
    const {_id} = useParams();

    const {alojamiento, cargando} = useAlojamientosPorId(_id);

    if(cargando) {
        return <div className="loading">Cargando alojamiento...</div>;
    }

    if (!alojamiento) {
        return (
            <>
                {/* <Header /> */}
                <h2>Alojamiento no encontrado</h2>
            </>
        );
    }

        return (
            <>
                <Header tokenDeUsuario={token}/>
                <AlojamientoPage alojamiento={alojamiento} />
            </>
        );
};

export default AlojamientoDetailPage;