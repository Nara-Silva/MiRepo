import './Navbar.css';
import React, { useState, useEffect, useRef} from 'react';
import { FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useLugares from '../../Hooks/useLugares.js'
import { IoIosWifi } from "react-icons/io";
import { MdPool, MdOutlinePets } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { useFiltros } from '../../Filtros/FiltrosContext';

const CaracteristicaItem = ({ caracteristica }) => {
    switch (caracteristica) {
        case "WIFI":
            return <span className="caracteristica"><IoIosWifi /></span>;
        case "PISCINA":
            return <span className="caracteristica"><MdPool /></span>;
        case "MASCOTAS_PERMITIDAS":
            return <span className="caracteristica"><MdOutlinePets /></span>;
        case "ESTACIONAMIENTO":
            return <span className="caracteristica"><FaCarSide /></span>;
    }
};


function Navbar() {
    const {lugares, cargando} = useLugares();
    const caracteristicas = ['WIFI', 'PISCINA', 'MASCOTAS_PERMITIDAS', 'ESTACIONAMIENTO'];

    const [activeMenu, setActiveMenu] = useState(null);
    const [huespedesCount, setHuespedesCount] = useState(1);
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [busquedaLugar, setBusquedaLugar] = useState('');
    const [moneda, setMoneda] = useState('');
    const [menuFiltrosAbierto, setMenuFiltrosAbierto] = useState(false);
    const monedas = [
        { nombre: 'Reales', bandera: '🇧🇷' },
        { nombre: 'USD', bandera: '🇺🇸' },
        { nombre: 'Peso ARG', bandera: '🇦🇷' },
    ];
    const {filtros, setFiltros} = useFiltros();
    const navigate = useNavigate();

    const navbarRef = useRef(null);
    
    const handleBuscar = () => {
        navigate(`/resultados`);
    };

    const toggleNavbar = () => {
        setMenuFiltrosAbierto(!menuFiltrosAbierto);
    };

    const iconosCaracteristicas = {
        WIFI: <IoIosWifi />,
        PISCINA: <MdPool />,
        MASCOTAS_PERMITIDAS: <MdOutlinePets />,
        ESTACIONAMIENTO: <FaCarSide />,
    }

    function estandarizarMoneda(opcion) {
        switch (opcion) {
            case 'Reales':
                return 'REALES';
            case 'USD':
                return 'DOLAR_USA';
            case 'Peso ARG':
                return 'PESO_ARG';
            default:
                return 'DESCONOCIDO';
        }
    }

    function desestandarizarMoneda(opcion){
        switch (opcion) {
            case 'REALES':
                return 'Reales';
            case 'DOLAR_USA':
                return 'USD';
            case 'PESO_ARG':
                return 'Peso ARG';
            default:
                return 'DESCONOCIDO';
        }
    }

    const hayFiltrosActivos = () => {
    return (
        filtros.ciudad ||
        filtros.pais ||
        filtros.huespedes > 1 ||
        filtros.precioMin !== 0 ||
        filtros.precioMax !== Infinity ||
        filtros.caracteristicas.length > 0 ||
        filtros.moneda !== ''
    );
};

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu); //esto cierra el menu si se clickea cuando ya esta abierto
    };

    // Si la carac. seleccionada ya estaba en la lista se saca, sino se agrega a los ya seleccionados
    const toggleCaracteristica = (caracteristica) => {
        setFiltros((prev) => {
            const nuevaSeleccion = prev.caracteristicas.includes(caracteristica)
                ? prev.caracteristicas.filter((item) => item !== caracteristica)
                : [...prev.caracteristicas, caracteristica];
    
            return { ...prev, caracteristicas: nuevaSeleccion };
        });
    };


    const incrementarHuespedes = () => {
        const nuevoValor = huespedesCount + 1;
        setHuespedesCount(nuevoValor);
        setFiltros(prev => ({...prev, huespedes: nuevoValor}));
    };

    const decrementarHuespedes = () => {
        if (huespedesCount > 1) {
            const nuevoValor = huespedesCount - 1;
            setHuespedesCount(nuevoValor);
            setFiltros(prev => ({ ...prev, huespedes: nuevoValor })); 
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setActiveMenu(null); // Cierra el menú activo
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // useEffect(() => {
    // let intervalo;

    // if (hayFiltrosActivos()) {
    //     intervalo = setInterval(() => {
    //         setMostrarMapa(prev => !prev);
    //     }, 1500); 
    // } else {
    //     setMostrarMapa(false); // vuelve a lupa
    // }

    // return () => clearInterval(intervalo); // limpieza
    // }, [filtros]);

    return (
    <nav className="navbar" id = "navbar" ref={navbarRef}>
        <button className="hamburguesa" onClick={toggleNavbar}>
        &#9776;
        </button>
        <div className={`search-bar ${menuFiltrosAbierto ? 'abierto' : ''}`}>
            <div className="navbar-item">
                <button className="value" onClick={() => toggleMenu('lugar')}>
                    <div className="texto-navbar-item">
                        <span className="label">Lugar</span>
                            <div className='question-label'>
                                {filtros.ciudad && filtros.pais ? (
                                    <div className="selected-lugar">
                                        <span className="texto-lugar">{`${filtros.ciudad}, ${filtros.pais}`}</span>
                                        <button
                                            className="clear-lugar-button"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Evita que se abra el menú al hacer clic en el botón
                                                setFiltros((prev) => ({ ...prev, ciudad: '', pais: '' }));
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    '¿Qué destino?'
                                )}
                            </div>
                    </div>
                </button>
                    {activeMenu === 'lugar' && (
                        <div className="dropdown lugar-dropdown">
                            <input
                                type="text"
                                className="input-busqueda-lugar"
                                placeholder="Buscar lugar..."
                                value={busquedaLugar}
                                onChange={(e) => setBusquedaLugar(e.target.value)}
                            />
                            <div className="lista-lugares-scrollable">
                                {lugares
                                    .filter((lugar) =>
                                        lugar.toLowerCase().includes(busquedaLugar.toLowerCase())
                                    )
                                    .map((lugarFiltrado, index) => (
                                        <div
                                            key={index}
                                            className="item-lugar"
                                            onClick={() => {
                                                const [ciudad, pais] = lugarFiltrado.split(',').map(part => part.trim());
                                                setFiltros(prev => ({ ...prev, ciudad, pais }));
                                                setActiveMenu(null);
                                            }}
                                        >
                                            {lugarFiltrado}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

            </div>

            <div className="divider" />  

            {/* Cantidad de huéspedes */}
            <div className="navbar-item">
                <button onClick={() => toggleMenu('huespedes')}>
                    <div className="texto-navbar-item">
                        <span className="label">Viajeros</span>
                        <div className='question-label'>
                            {filtros.huespedes > 1 ? `${filtros.huespedes} viajeros` : '¿Cuántos viajan?'}
                        </div>  
                    </div>
                </button>
                {activeMenu === 'huespedes' && (
                    <div className="dropdown huespedes-dropdown">
                    <div className="contador-personalizado">
                      <button onClick={decrementarHuespedes} className="boton-contador">−</button>
                      <span className="valor-huespedes">{huespedesCount}</span>
                      <button onClick={incrementarHuespedes} className="boton-contador">+</button>
                    </div>
                  </div>
                )}
            </div>

            <div className="divider" />  

            {/* Precio por noche */}
            <div className="navbar-item">
                
                <button onClick={() => toggleMenu('precio')}>
                    <div className="texto-navbar-item">
                        <span className="label">Precio</span>
                        <div className='question-label'>
                                {(filtros.precioMin !== 0 || filtros.precioMax !== Infinity)
                                    ? `$${filtros.precioMin || '0'} - $${filtros.precioMax === Infinity ? '∞' : filtros.precioMax}`
                                    : '¿Cuánto?'}
                        </div>
                    </div>
                </button>
                {activeMenu === 'precio' && (
                    <div className="dropdown precio-dropdown">
                    <label>
                        Mínimo
                        <div className="input-wrapper">
                            {precioMin === '' && <span className="input-symbol">$</span>}
                            <input
                                type="number"
                                value={precioMin}
                                onChange={(e) => {
                                    const valor = e.target.value;
                                    setPrecioMin(valor);
                                    setFiltros(prev => ({...prev, precioMin:valor}));
                                    }}
                                min="0"
                            />
                        </div>
                    </label>
                    <label>
                        Máximo
                        <div className="input-wrapper">
                            {precioMax === '' && <span className="input-symbol">$</span>}
                            <input
                                type="number"
                                value={precioMax}
                                onChange={(e) =>{
                                    const valor = e.target.value;
                                    setPrecioMax(valor);
                                    setFiltros(prev => ({...prev, precioMax:valor}));
                                }}
                                min="0"
                            />
                        </div>
                    </label>
                </div>
            )}
            </div>

            <div className="divider" />  {/*Para dividir los diferentes navbar-items*/}    

            {/* Características */}
            <div className="navbar-item">
                <button onClick={() => toggleMenu('caracteristicas')}>
                    <div className="texto-navbar-item">
                        <span className="label">Servicios</span>
                        <div className='question-label'>
                        {filtros.caracteristicas.length > 0 
                        ? filtros.caracteristicas.map((ser, i) => (
                            <CaracteristicaItem key={i} caracteristica={ser} />
                        ))
                        : '¿Cuáles?'}
                        </div>
                        
                    </div>
                </button>
                {activeMenu === 'caracteristicas' && (
                      <div className="dropdown caracteristicas-dropdown">
                      {caracteristicas.map((caracteristica, index) => (
                          <label key={index} className="checkbox-label">
                              <input
                                  type="checkbox"
                                  checked={filtros.caracteristicas.includes(caracteristica)}
                                  onChange={() => toggleCaracteristica(caracteristica)}
                              />
                              <span className="custom-checkbox" />
                              <span className="icono-caracteristica">   
                                    {iconosCaracteristicas[caracteristica.replace(/\s+/g, '_')]}
                              </span>
                              <span className="caracteristica-text">{caracteristica.replace('_', ' ')}</span>
                          </label>
                      ))}
                  </div>
              )}
            </div>

            <div className="divider" />
                <div className="navbar-item">
                    <button onClick={() => toggleMenu('moneda')}>
                        <div className="texto-navbar-item">
                            <span className="label">Moneda</span>
                            <div className='question-label'>
                                {filtros.moneda ? desestandarizarMoneda(filtros.moneda) : '¿Moneda de pago?'}
                            </div>
                        </div>
                    </button>
                    {activeMenu === 'moneda' && (
                        <div className="dropdown moneda-dropdown">
                        {monedas.map((opcion) => (
                          <label
                            key={opcion.nombre}
                            className={`opcion-moneda ${moneda === opcion.nombre ? 'seleccionada' : ''}`}
                            onClick={() => {
                                setMoneda(opcion.nombre)
                                const monedaEnum = estandarizarMoneda(opcion.nombre)
                                setFiltros(prev => ({...prev, moneda: monedaEnum}));
                            }}
                          >
                            <input
                              type="radio"
                              name="moneda"
                              value={opcion.nombre}
                              checked={moneda === opcion.nombre}
                              readOnly
                            />
                            <span className="custom-radio" />
                            <span className="texto-moneda">{opcion.nombre}</span>
                            <span className="bandera">{opcion.bandera}</span>
                          </label>
                        ))}
                        {filtros.moneda !== '' && (
                            <span
                                className="texto-borrar-moneda"
                                onClick={() => {
                                    setMoneda('');
                                    setFiltros(prev => ({ ...prev, moneda: '' }));
                                }}
                            >
                                Borrar selección
                            </span>
                        )}
                      </div>
                    )}
                </div>

            <div className="search-icon">
            <button
            onClick={handleBuscar}
            className={`boton-search ${hayFiltrosActivos() ? '' : ''}`}
            aria-label="Buscar alojamientos"
            >
            <span className={`icono-busqueda ${hayFiltrosActivos() ? 'rebotar-infinito' : ''}`}>
                <FaSearch />
                {hayFiltrosActivos() && <span className="texto-buscar">Buscar</span>}
            </span>
            </button>
            </div>
        </div>
    </nav>);
}

export default Navbar;