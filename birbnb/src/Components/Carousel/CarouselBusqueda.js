import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAlojamientos from '../../Hooks/useAlojamientos.js';
import AlojamientoItem from '../Alojamientos/AlojamientoItem.js';
import './CarouselBusqueda.css';
import MapaAlojamientos from '../MapaAlojamientos/MapaAlojamientos.js';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";

function CarouselBusqueda({ criterios }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const [limitePorPagina] = useState(6);
  const [favoritos, setFavoritos] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  const { alojamientos, cargando, totalPaginas } = useAlojamientos(criterios, paginaActual, limitePorPagina);


  const toggleMapView = () => setShowMap(!showMap);

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!alojamientos || alojamientos.length === 0) {
    return (
      <div className="no-results">
        <h3>No se encontraron alojamientos</h3>
        <button onClick={() => navigate('/')} className="primary-btn">
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className={`search-container ${showMap ? 'map-active' : ''}`}>
      <div className="results-section">
        <div className="results-header">
          <h2>
            Alojamientos encontrados
            {criterios.ubicacion && ` en ${criterios.ubicacion}`}
          </h2>
          <button onClick={toggleMapView} className="btn-map">
            {showMap ? <FaListUl /> : <FaMapMarkerAlt />}
          </button>
        </div>

        <div className="alojamientos-grid">
          {alojamientos.map((alojamiento) => (
            <AlojamientoItem
              key={alojamiento._id}
              aAlojamiento={alojamiento}
            />
          ))}
        </div>

        {totalPaginas > 1 && (
          <div className="pagination">
            <button 
              onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
            >
              Anterior
            </button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button
              onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {showMap && (
        <div className="map-section">
          <MapaAlojamientos alojamientos={alojamientos} />
        </div>
      )}
    </div>
  );
}

export default CarouselBusqueda;