import React, { useState, useEffect } from 'react';
import useAlojamientoPorIdUsuario from "../../Hooks/useAlojamientoPorIdUsuario";
import { FaHome, FaEdit, FaTrash, FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaClock, FaSave, FaTimes } from 'react-icons/fa';
import './MisAlojamientos.css';
// import { useAccessToken } from '../../Hooks/useAccessToken.js';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Header from '../../Components/Header/Header.js';
import Footer from '../../Components/Footer/Footer.js';
import { FaPencilAlt } from "react-icons/fa";

import { jwtDecode } from 'jwt-decode';

const MisAlojamientos = () => {
    const tokenCodificado = localStorage.getItem("token");
    const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;
    const { alojamientos, cargando, refetch } = useAlojamientoPorIdUsuario(tokenCodificado);
    const [eliminando, setEliminando] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Inicializar formData cuando cambian los alojamientos
        if (alojamientos.length > 0 && editandoId) {
            const alojamiento = alojamientos.find(a => a._id === editandoId);
            if (alojamiento) {
                setFormData({
                    nombreAlojamiento: alojamiento.nombreAlojamiento,
                    descripcion: alojamiento.descripcion,
                    precioPorNoche: alojamiento.precioPorNoche,
                    moneda: alojamiento.moneda,
                    horarioCheckIn: alojamiento.horarioCheckIn,
                    horarioCheckOut: alojamiento.horarioCheckOut,
                    calle: alojamiento.direccion?.calle || '',
                    altura: alojamiento.direccion?.altura || '',
                    ciudad: alojamiento.direccion?.ciudad?.nombre || '',
                    pais: alojamiento.direccion?.ciudad?.pais?.nombre || '',
                    cantHuespedesMax: alojamiento.cantHuespedesMax
                });
            }
        }
    }, [editandoId, alojamientos]);

    const redirigiraCrearAlojamientos = () => {
        navigate('/admin');
    };

    const iniciarEdicion = (id) => {
        setEditandoId(id);
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const modificarAlojamiento = async (id) => {
        try {
            const camposEditados = {
                nombreAlojamiento: formData.nombreAlojamiento,
                descripcion: formData.descripcion,
                precioPorNoche: formData.precioPorNoche,
                moneda: formData.moneda,
                horarioCheckIn: formData.horarioCheckIn,
                horarioCheckOut: formData.horarioCheckOut,
                direccion: {
                    calle: formData.calle,
                    altura: formData.altura,
                    ciudad: {
                        nombre: formData.ciudad,
                        pais: {
                            nombre: formData.pais
                        }
                    }
                },
                cantHuespedesMax: formData.cantHuespedesMax
            };

            await axios.patch(`${process.env.REACT_APP_API_URL}/alojamientos/${id}`, camposEditados);
            refetch();
            setEditandoId(null);
        } catch (error) {
            console.error("Error al modificar alojamiento:", error);
            alert("No se pudo modificar el alojamiento");
        }
    };

    const eliminarAlojamiento = async (id) => {
        setEliminando(true);
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/alojamientos/${id}`);
            refetch();
        } catch (error) {
            console.error("Error al eliminar alojamiento:", error);
            alert("No se pudo eliminar el alojamiento");
        } finally {
            setEliminando(false);
        }
    };

    const getDireccionCompleta = (direccion) => {
        if (!direccion) return "Dirección no disponible";
        
        const calle = direccion.calle || "";
        const altura = direccion.altura || "";
        let ciudad = "";
        let pais = "";
        
        if (direccion.ciudad) {
            if (typeof direccion.ciudad === 'string') {
                ciudad = direccion.ciudad;
            } else {
                ciudad = direccion.ciudad.nombre || "";
                if (direccion.ciudad.pais && typeof direccion.ciudad.pais === 'object') {
                    pais = direccion.ciudad.pais.nombre || "";
                }
            }
        }
        
        return `${calle} ${altura}${ciudad ? `, ${ciudad}` : ""}${pais ? `, ${pais}` : ""}`.trim();
    };

    if (cargando) {
        return (
            <div className="mis-alojamientos-loading">
                <div className="loading-spinner"></div>
                <p>Cargando tus alojamientos...</p>
            </div>
        );
    }

    return (
        <>
            <Header tokenDeUsuario={token} />
            <div className="mis-alojamientos-container">
                <div className="mis-alojamientos-header">
                    <h1 className="titulo-principal"><FaHome /> Mis Alojamientos</h1>
                    {alojamientos.length > 0 && (
                        <button className="btn-mas-alojamientos" onClick={redirigiraCrearAlojamientos}>
                            <FaHome /> Crear mas alojamientos
                        </button>
                    )}
                </div>
                
                {alojamientos.length > 0 ? (
                    <div className="lista-alojamientos">
                        {alojamientos.map((alojamiento) => (
                            <div key={alojamiento._id} className="tarjeta-alojamiento">
                                <div className="alojamiento-imagen-container">
                                    {alojamiento.fotos?.length > 0 ? (
                                        <img 
                                            src={alojamiento.fotos[0]} 
                                            alt={alojamiento.nombreAlojamiento} 
                                            className="alojamiento-imagen"
                                        />
                                    ) : (
                                        <div className="imagen-placeholder">
                                            <span>Sin imagen disponible</span>
                                        </div>
                                    )}
                                </div>
                                
                                {editandoId === alojamiento._id ? (
                                    <div className="formulario-edicion">
                                        <input
                                            type="text"
                                            name="nombreAlojamiento"
                                            value={formData.nombreAlojamiento || ''}
                                            onChange={handleChange}
                                            placeholder="Nombre del alojamiento"
                                        />
                                        <textarea
                                            name="descripcion"
                                            value={formData.descripcion || ''}
                                            onChange={handleChange}
                                            placeholder="Descripción"
                                            className="textarea-edicion"
                                        />
                                        <div className="grupo-inputs">
                                            <input
                                                type="text"
                                                name="calle"
                                                value={formData.calle || ''}
                                                onChange={handleChange}
                                                placeholder="Calle"
                                            />
                                            <input
                                                type="text"
                                                name="altura"
                                                value={formData.altura || ''}
                                                onChange={handleChange}
                                                placeholder="Altura"
                                            />
                                        </div>
                                        <div className="grupo-inputs">
                                            <input
                                                type="text"
                                                name="ciudad"
                                                value={formData.ciudad || ''}
                                                onChange={handleChange}
                                                placeholder="Ciudad"
                                            />
                                            <input
                                                type="text"
                                                name="pais"
                                                value={formData.pais || ''}
                                                onChange={handleChange}
                                                placeholder="País"
                                            />
                                        </div>
                                        <div className="grupo-inputs">
                                            <input
                                                type="number"
                                                name="precioPorNoche"
                                                value={formData.precioPorNoche || ''}
                                                onChange={handleChange}
                                                placeholder="Precio por noche"
                                            />
                                            <input
                                                type="text"
                                                name="moneda"
                                                value={formData.moneda || ''}
                                                onChange={handleChange}
                                                placeholder="Moneda (EUR, USD, etc.)"
                                            />
                                        </div>
                                        <div className="grupo-inputs">
                                            <input
                                                type="text"
                                                name="horarioCheckIn"
                                                value={formData.horarioCheckIn || ''}
                                                onChange={handleChange}
                                                placeholder="Horario check-in (ej: 14:00)"
                                            />
                                            <input
                                                type="text"
                                                name="horarioCheckOut"
                                                value={formData.horarioCheckOut || ''}
                                                onChange={handleChange}
                                                placeholder="Horario check-out (ej: 11:00)"
                                            />
                                        </div>
                                        <input
                                            type="number"
                                            name="cantHuespedesMax"
                                            value={formData.cantHuespedesMax || ''}
                                            onChange={handleChange}
                                            placeholder="Huéspedes máximos"
                                        />
                                    </div>
                                ) : (
                                    <div className="info-alojamiento">
                                        <h2 className="nombre-alojamiento">{alojamiento.nombreAlojamiento}</h2>
                                        <p className="descripcion">{alojamiento.descripcion}</p>
                                        
                                        <div className="detalles-alojamiento">
                                            <div className="detalle-item">
                                                <FaMapMarkerAlt className="icono-detalle" />
                                                <span>{getDireccionCompleta(alojamiento.direccion)}</span>
                                            </div>
                                            
                                            <div className="detalle-item">
                                                <FaMoneyBillWave className="icono-detalle" />
                                                <span>${alojamiento.precioPorNoche} {alojamiento.moneda} por noche</span>
                                            </div>
                                            
                                            <div className="detalle-item">
                                                <FaUsers className="icono-detalle" />
                                                <span>Hasta {alojamiento.cantHuespedesMax} huéspedes</span>
                                            </div>
                                            
                                            <div className="detalle-item">
                                                <FaClock className="icono-detalle" />
                                                <span>Check-in: {alojamiento.horarioCheckIn} | Check-out: {alojamiento.horarioCheckOut}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="acciones-alojamiento">
                                    {editandoId === alojamiento._id ? (
                                        <>
                                            <button 
                                                className="boton-accion guardar" 
                                                onClick={() => modificarAlojamiento(alojamiento._id)}
                                            >
                                                <FaSave /> Guardar
                                            </button>
                                            <button 
                                                className="boton-accion cancelar" 
                                                onClick={cancelarEdicion}
                                            >
                                                <FaTimes /> Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button 
                                                className="boton-accion eliminar" 
                                                onClick={() => eliminarAlojamiento(alojamiento._id)}
                                                disabled={eliminando}
                                            >
                                                <FaTrash /> {eliminando ? 'Eliminando...' : 'Eliminar'}
                                            </button>
                                            <button 
                                                className="boton-accion editar" 
                                                onClick={() => iniciarEdicion(alojamiento._id)}
                                            >
                                                <FaPencilAlt /> Editar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="sin-alojamientos">
                        <p>No tienes alojamientos registrados.</p>
                        <button className="btn-primario" onClick={redirigiraCrearAlojamientos}>
                            Crear mi primer alojamiento
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default MisAlojamientos;