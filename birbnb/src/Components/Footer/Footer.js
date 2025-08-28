import './Footer.css';
import { FaGithub } from "react-icons/fa";


function Footer(){
    return (
        <div>
        <footer id="footer" className="footer">
            <div className="footer-content">
                
                <div className="footer-left">
                    <p className="titulo-footer">Sobre Birbnb</p>
                    <p>Birbnb es una plataforma de reservas que conecta a viajeros con alojamientos únicos y cómodos en todo el país. Ya sea para turismo, trabajo remoto o estadías temporales, ofrecemos una experiencia sencilla, segura y flexible.</p>
                    <p className="contacto">Contacto: info@birbnb.com</p>
                </div>
                
                <div className="footer-right">
                    <div className="footer-column">
                        <p className="mierdaparaElFooter">Explorar</p>
                        <a href="#navbar">Buscar alojamientos</a>
                        <a href="#publicar">Publicar propiedad</a>
                        <a href="#ciudades">Ciudades destacadas</a>
                    </div>

                    <div className="footer-column">
                        <p className="mierdaparaElFooter">Recursos</p>
                        <a href="#ayuda">Centro de ayuda</a>
                        <a href="#soporte">Soporte</a>
                        <a href="#privacidad">Política de privacidad</a>
                    </div>

                    <div className="footer-column">
                        <p className="mierdaparaElFooter">Nosotros</p>
                        <a href="#historia">Historia</a>
                        <a href="#equipo">Equipo</a>
                        <a href="#terminos">Términos y condiciones</a>
                    </div>
                </div>
            </div> 
                <div className="footer-bottom">
                    <p>© 2025 Birbnb. Todos los derechos reservados.</p>
                </div>
                    <div className="github">
                    <a href="https://github.com/ddso-utn/tp-cuatrimestral-jueves-manana-ju-ma-grupo-04" aria-label="Repositorio del proyecto en GitHub">
                        <FaGithub />
                    </a>
                </div>
        </footer>
        </div>    
    );
}

export default Footer;