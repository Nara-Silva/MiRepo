// Components/UserMenu.jsx
import { useState, useRef, useEffect } from "react";
import { Link} from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./MenuUsuario.css"; // para estilos personalizados
import {jwtDecode} from "jwt-decode";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const tokenCodificado = localStorage.getItem("token");
  const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;
  const { logout } = useAuth();
  const navigate = useNavigate();
  // console.log("el token es", token);
  // console.log("el nombre del token es", token.nombre);

  // Cerrar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

const handleLogout = () => {
  logout();
  navigate("/"); 
};

const handleReserva = () => {
  navigate("/reservas");
};



  return (
    <div className="user-menu" ref={menuRef}>
    <span> Hola, {token?.nombre || "invitado"}</span>
      <button className="user-icon-button" onClick={() => setOpen(!open)}>
        {token?.avatar ? (
          <img src={token.avatar} alt="avatar" className="user-avatar" />
        ) : (
          <FaUserCircle className="iconito-usuario" size={28}/>
        )}
      </button>

      {open && (
        <div className="user-dropdown">
          <Link to="/perfil">Datos personales</Link>
          <button onClick={handleReserva}>Mis reservas</button>
          <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
