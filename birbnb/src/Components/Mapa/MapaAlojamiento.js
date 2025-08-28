import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapaAlojamiento = ({ latitud, longitud }) => {
  const position = [latitud, longitud];

  return (
    <MapContainer center={position} zoom={15} style={{ height: '350px', width: '100%' }}>
        <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
      <Marker position={position}>
        <Popup>
          Ubicación del alojamiento.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapaAlojamiento;
