import React, { useState } from 'react';
import './AdministradorPage.css';

function AdministradorPage({ formulario: setFormData, onEnviar, setSuccess, submitSuccess }) {
  const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);
  const [error, setError] = useState(null);
  const [fotoUrls, setFotoUrls] = useState([""]);

  const caracteristicasOptions = ["PISCINA", "MASCOTAS_PERMITIDAS", "WIFI", "ESTACIONAMIENTO"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setFormData(prev => {
      const nuevo = { ...prev };
      let ref = nuevo;

      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }

      ref[keys[keys.length - 1]] = value;
      return nuevo;
    });
  };

  const handleCaracteristicasChange = (e) => {
    const { value, checked } = e.target;
    const nuevas = checked
      ? [...caracteristicasSeleccionadas, value]
      : caracteristicasSeleccionadas.filter(c => c !== value);

    setCaracteristicasSeleccionadas(nuevas);
    setFormData(prev => ({ ...prev, caracteristicas: nuevas }));
  };

  const handleFotoUrlChange = (index, value) => {
    const nuevas = [...fotoUrls];
    nuevas[index] = value;
    setFotoUrls(nuevas);
    setFormData(prev => ({ ...prev, fotos: nuevas.filter(url => url.trim() !== "") }));
  };

  const agregarCampoUrl = () => {
    setFotoUrls([...fotoUrls, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    onEnviar();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="admin-container">
      {submitSuccess && (
        <div className="admin-toast">¡Alojamiento creado correctamente!</div>
      )}

      <h1>Crear Nuevo Alojamiento</h1>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <section className="admin-section">
          <h2>Información Básica</h2>
          <input name="nombreAlojamiento" placeholder="Nombre" onChange={handleChange} required />
          <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
        </section>

        <section className="admin-section">
          <h2>Precio y Horarios</h2>
          <div className="admin-row">
            <input name="precioPorNoche" type="number" placeholder="Precio por noche" onChange={handleChange} required />
            <select name="moneda" onChange={handleChange} required>
              <option value="">Moneda</option>
              <option value="PESO_ARG">Peso ARG</option>
              <option value="DOLAR_USA">USD</option>
              <option value="REALES">Reales</option>
            </select>
          </div>
          <div className="admin-row">
            <input name="horarioCheckIn" type="time" onChange={handleChange} required />
            <input name="horarioCheckOut" type="time" onChange={handleChange} required />
          </div>
        </section>

        <section className="admin-section">
          <h2>Ubicación</h2>
          <div className="admin-row">
            <input name="direccion.calle" placeholder="Calle" onChange={handleChange} required />
            <input name="direccion.altura" placeholder="Altura" onChange={handleChange} required />
          </div>
          <div className="admin-row">
            <input name="direccion.ciudad.nombre" placeholder="Ciudad" onChange={handleChange} required />
            <input name="direccion.ciudad.pais.nombre" placeholder="País" onChange={handleChange} required />
          </div>
          <div className="admin-row">
            <input name="direccion.latitud" placeholder="Latitud" onChange={handleChange} />
            <input name="direccion.longitud" placeholder="Longitud" onChange={handleChange} />
          </div>
        </section>

        <section className="admin-section">
          <h2>Capacidad</h2>
          <input name="cantHuespedesMax" type="number" placeholder="Máx. huéspedes" onChange={handleChange} required />
        </section>

        <section className="admin-section">
          <h2>Características</h2>
          <div className="admin-checkbox-grid">
            {caracteristicasOptions.map(c => (
              <label key={c} className="admin-checkbox-label">
                <input
                  type="checkbox"
                  value={c}
                  checked={caracteristicasSeleccionadas.includes(c)}
                  onChange={handleCaracteristicasChange}
                />
                {c.replace(/_/g, ' ').toLowerCase()}
              </label>
            ))}
          </div>
        </section>

        <section className="admin-section">
          <h2>Fotos (URLs)</h2>
          {fotoUrls.map((url, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Foto ${index + 1}`}
              value={url}
              onChange={(e) => handleFotoUrlChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={agregarCampoUrl} className="admin-submit-fotos">
            Agregar otra URL
          </button>

          <div className="admin-img-preview">
            {fotoUrls.filter(url => url.trim() !== "").map((url, i) => (
              <img key={i} src={url} alt={`preview-${i}`} />
            ))}
          </div>
        </section>

        <button type="submit" className="admin-submit">Crear Alojamiento</button>
      </form>
    </div>
  );
}

export default AdministradorPage;
