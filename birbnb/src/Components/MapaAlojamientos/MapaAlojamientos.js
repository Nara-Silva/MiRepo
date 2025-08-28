import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapaAlojamientos.css';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaStar, 
  FaBed, 
  FaRulerCombined,
  FaCarSide,
  FaSwimmingPool
} from 'react-icons/fa';
import {
  IoIosWifi
} from 'react-icons/io';
import {
  MdOutlinePets
} from 'react-icons/md';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function obtenerSimbolo(moneda) {
  switch (moneda) {
    case "DOLAR_USA": return "U$D ";
    case "PESO_ARG": return "AR$ ";
    case "REALES": return "R$ ";
    default: return "$";
  }
}

const createCustomIcon = (precio, moneda) => {
  const symbol = obtenerSimbolo(moneda);
  
  return L.divIcon({
    html: `
      <div class="price-marker-ellipse">
        <div class="price-content">
          ${symbol}${precio}
        </div>
        <div class="marker-point"></div>
      </div>
    `,
    className: 'custom-marker-ellipse',
    iconSize: [60, 40],
    iconAnchor: [30, 40],
    popupAnchor: [0, -40]
  });
};

const getDireccionCompleta = (direccion) => {
  if (!direccion) return "Dirección no disponible";
  
  const parts = [
    direccion.calle,
    direccion.altura,
    direccion.ciudad?.nombre || direccion.ciudad,
    direccion.ciudad?.pais?.nombre || direccion.pais
  ].filter(Boolean);
  
  return parts.join(', ');
};

const renderAmenityIcon = (amenity) => {
  switch(amenity) {
    case 'WIFI': return <IoIosWifi />;
    case 'PISCINA': return <FaSwimmingPool />;
    case 'MASCOTAS_PERMITIDAS': return <MdOutlinePets />;
    case 'ESTACIONAMIENTO': return <FaCarSide />;
    default: return null;
  }
};

const MapaAlojamientos = ({ alojamientos }) => {
  const center = alojamientos.length > 0 
    ? [alojamientos[0].direccion.latitud, alojamientos[0].direccion.longitud] 
    : [-34.6037, -58.3816];

  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      className="mapa-alojamientos"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      
      {alojamientos.map((alo) => (
        <Marker 
          key={alo._id} 
          position={[alo.direccion.latitud, alo.direccion.longitud]}
          icon={createCustomIcon(alo.precioPorNoche, alo.moneda)}
          eventHandlers={{
            click: () => {
              document.getElementById(`alojamiento-${alo._id}`)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }
          }}
        >
          <Popup className="custom-popup">
            <div className="map-popup">
              <Link to={`/alojamientos/${alo._id}`}>
                <div className="popup-image-container">
                  <img src={alo.fotos[0] || 'https://via.placeholder.com/300x200'} alt={alo.nombreAlojamiento} />
                  <div className="price-tag">
                    {obtenerSimbolo(alo.moneda)}{alo.precioPorNoche}<span>/noche</span>
                  </div>
                </div>
                
                <div className="popup-content">
                  <div className="popup-header">
                    <h4>{alo.nombreAlojamiento}</h4>
                    {alo.calificacion && (
                      <div className="rating">
                        <FaStar className="star-icon" />
                        <span>{alo.calificacion}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="location">
                    <FaMapMarkerAlt />
                    <span>{getDireccionCompleta(alo.direccion)}</span>
                  </div>
                  
                  <div className="property-details">
                    {alo.habitaciones && (
                      <div className="detail">
                        <FaBed />
                        <span>{alo.habitaciones} hab.</span>
                      </div>
                    )}
                    {alo.metrosCuadrados && (
                      <div className="detail">
                        <FaRulerCombined />
                        <span>{alo.metrosCuadrados} m²</span>
                      </div>
                    )}
                  </div>
                  
                  {alo.caracteristicas?.length > 0 && (
                    <div className="amenities-container">
                      <h5>caracteristicas destacados</h5>
                      <div className="amenities">
                        {alo.caracteristicas.slice(0, 5).map(servicio => (
                          <span className="amenity-tag" key={servicio}>
                            {renderAmenityIcon(servicio)} {servicio.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaAlojamientos;