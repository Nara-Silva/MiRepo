import React from 'react';
import CarouselBusqueda from '../../Components/Carousel/CarouselBusqueda.js';
import Header from '../../Components/Header/Header.js';
import Navbar from '../../Components/Navbar/Navbar.js';
import Footer from '../../Components/Footer/Footer.js';
import { useFiltros } from '../../Filtros/FiltrosContext';
import { jwtDecode } from 'jwt-decode';

function ResultadosDetailPage() {
    const {filtros} = useFiltros();
    //console.log('Criterios pasados a CarouselBusqueda:', filtros);
    const tokenCodificado = localStorage.getItem("token");
    const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;

    return (
        <div className="resultados-page">
            <Header tokenDeUsuario={token}></Header>
            <Navbar></Navbar>
            <body>
                <CarouselBusqueda criterios={filtros} />
            </body>
            <Footer/>
        </div>
    );
}

export default ResultadosDetailPage;