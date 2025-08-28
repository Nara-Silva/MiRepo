import Header from '../../Components/Header/Header.js';
import Footer from '../../Components/Footer/Footer.js';
import { Outlet } from "react-router"
import { jwtDecode } from 'jwt-decode';

const Layout = () => {
    const tokenCodificado = localStorage.getItem("token");
    const token = tokenCodificado ? jwtDecode(tokenCodificado) : null;
    return (
        <>
            <Header tokenDeUsuario={token} />
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout;