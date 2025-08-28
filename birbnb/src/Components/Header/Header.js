import './Header.css'; 
import { FaRegBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserMenu from '../MenuUsuario/MenuUsuario.js'
import { LuBellDot } from "react-icons/lu";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoPerson } from "react-icons/io5";
import { FaHouseUser } from "react-icons/fa";
import { useAuth} from '../../Hooks/useAuth.js'
import { jwtDecode } from 'jwt-decode';


const Header = () => {
  const [notisSinLeer, setNotisSinLeer] = useState(0);
  const [esAnfitrion, setEsAnfitrion] = useState(true); 
  const tokenCodificado = localStorage.getItem("token");
  const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;

  useEffect(() => {
    const cargarNotificaciones = async () => {
      try {
        if (token?.sub) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios/notificaciones/sin-leer`, {
             headers: {
                    Authorization: `Bearer ${tokenCodificado}`,
                    'Content-Type': 'application/json',
                }
          });
          setNotisSinLeer(response.data.length);
        }
      } catch (err) {
        console.error("Error cargando notificaciones", err);
        setNotisSinLeer(0);
      }
    };

    cargarNotificaciones();
  }, [token, tokenCodificado]);

  useEffect(() => {
    // Decodificar el token y verificar el rol
    if (token) {
      try {
        setEsAnfitrion(token.tipo === "ANFITRION"); // Verificar si el rol "Anfitrion" está presente
      } catch (err) {
        console.error("Error decodificando el token", err);
        setEsAnfitrion(false);
      }
    }
  }, [token]);

  return (
<header className="header" id="header">
  <div className="left-section">
    <Link to={`/`} className="logo-link">
      <div className="logo"> 
        <h1>Birbnb</h1>
      </div>
    </Link>

    <div className="ocultar-en-celu">
      <nav className="nav-links" aria-label="Enlaces al pie de página">
        <a href="#footer">Historia</a>
        <a href="#footer">Contacto</a>
      </nav>
    </div>
  </div>

  <div className="right-section">
  {esAnfitrion && token !== null  ? (
      <>
      {/* <div className="iconos-navegacion"> */}
        <Link to={`/admin`} className="admin-link" title="Panel de Administracion">
          <IoPerson />
        </Link>

        <Link to={`/mis-Alojamientos`} className="admin-link" title="Mis Propiedades">
          <FaHouseUser />
        </Link>
      {/* </div> */}
      </>
    ) : null}
    
    {token !== null ? (
      <Link to={`/notificaciones`} className="notificaciones" title="Notificaciones">
        <div className="campanita-container">
          {notisSinLeer === 0 ? (
            <FaRegBell className="campanita" />
          ) : (
            <LuBellDot className="campanita" />
          )}
        </div>
      </Link>
    ): null }

<div>
<div>
      {token !== null ? (  <UserMenu user={token}></UserMenu>
                          ) : (<Link to="/loginK" className="login-link">LogIn / SignUp</Link>)}
      </div>
    </div>
  </div>
</header>
  );
};

export default Header;
