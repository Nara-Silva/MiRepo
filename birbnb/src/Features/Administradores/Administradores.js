import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header.js';
import AdministradorPage from '../../Components/AdministradorPage/AdministradorPage.js';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';

const Administrador = () => {
    // const { token } = useAccessToken();
    const tokenCodificado = localStorage.getItem("token");
    const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;
    const [formData, setFormData] = useState({
        anfitrion: "", 
        nombreAlojamiento: "",
        descripcion: "",
        precioPorNoche: "",
        moneda: "",
        horarioCheckIn: "",
        horarioCheckOut: "",
        direccion: {
            calle: "",
            altura: "",
            ciudad: {
                nombre: "",
                pais: {
                    nombre: ""
                }
            },
            latitud: "",
            longitud: ""
        },
        cantHuespedesMax: "",
        caracteristicas: [],
        fotos: []
    });

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token?.sub) {
            setFormData(prev => ({ ...prev, anfitrion: token.sub }));
        }
    }, [token]);

    const enviarAlojamiento = async () => {
        try {
            setCargando(true);
            const alojamientoData = { ...formData };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/alojamientos`, alojamientoData, {
                headers: {
                    'Authorization': `Bearer ${tokenCodificado}`,
                    'Content-Type': 'application/json'
                }
            });
            //console.log('Respuesta del backend:', response.data);
            setSubmitSuccess(true);
            setTimeout(() => {
                navigate("/", { state: { creado: true } });
            }, 2000);
        } catch (err) {
            console.error('Error al enviar el formulario:', err);
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
           <Header tokenDeUsuario={token} />
           <AdministradorPage 
             formulario={setFormData} 
             onEnviar={enviarAlojamiento} 
             setSuccess={setSubmitSuccess}
             submitSuccess={submitSuccess}
           />
        </>
    );
};

export default Administrador;
