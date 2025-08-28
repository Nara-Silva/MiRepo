import React, { useState } from 'react';
import './PasoInfoPersonal.css';

const PasoInfoPersonal = ({ onNext, onBack, formData, setFormData }) => {
  const [sugerencias, setSugerencias] = useState({
    paises: [],
    direcciones: [],
    codigosPostales: []
  });

  const [mostrarSugerencias, setMostrarSugerencias] = useState({
    pais: false,
    direccion: false,
    codigoPostal: false
  });

  // Buscar países mientras se escribe
  const buscarPaises = async (texto) => {
    if (texto.length < 2) {
      setSugerencias(prev => ({ ...prev, paises: [] }));
      return;
    }

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${texto}`);
      const data = await response.json();
      const paisesEncontrados = data.map(pais => ({
        nombre: pais.translations?.spa?.common || pais.name.common,
        codigo: pais.cca2
      }));
      setSugerencias(prev => ({ ...prev, paises: paisesEncontrados }));
    } catch (error) {
      console.error("Error buscando países:", error);
      setSugerencias(prev => ({ ...prev, paises: [] }));
    }
  };

  // Buscar direcciones mientras se escribe
  const buscarDirecciones = async (texto) => {
    if (!texto || texto.length < 3 || !formData.pais) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${texto},${formData.pais}&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSugerencias(prev => ({ ...prev, direcciones: data }));
    } catch (error) {
      console.error("Error buscando direcciones:", error);
      setSugerencias(prev => ({ ...prev, direcciones: [] }));
    }
  };

  // Buscar código postal cuando se selecciona una ciudad
  const buscarCodigoPostal = async (ciudad) => {
    if (!ciudad || !formData.pais) return;

    try {
      const paisCodigo = sugerencias.paises.find(p => p.nombre === formData.pais)?.codigo;
      if (!paisCodigo) return;

      const response = await fetch(`https://api.zippopotam.us/${paisCodigo}/${ciudad}`);
      const data = await response.json();
      setSugerencias(prev => ({ ...prev, codigosPostales: data.places || [] }));
    } catch (error) {
      console.error("Error buscando código postal:", error);
      setSugerencias(prev => ({ ...prev, codigosPostales: [] }));
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Búsquedas según el campo editado
    if (name === 'pais') {
      buscarPaises(value);
      setMostrarSugerencias(prev => ({ ...prev, pais: true }));
    } else if (name === 'direccion') {
      buscarDirecciones(value);
      setMostrarSugerencias(prev => ({ ...prev, direccion: true }));
    } else if (name === 'ciudad') {
      buscarCodigoPostal(value);
    }
  };

  const seleccionarSugerencia = (tipo, valor) => {
    if (tipo === 'pais') {
      setFormData(prev => ({
        ...prev,
        pais: valor.nombre,
        ciudad: '',
        codigoPostal: ''
      }));
    } else if (tipo === 'direccion') {
      setFormData(prev => ({
        ...prev,
        direccion: valor.display_name,
        ciudad: valor.address.city || valor.address.town || '',
        codigoPostal: valor.address.postcode || ''
      }));
    } else if (tipo === 'codigoPostal') {
      setFormData(prev => ({
        ...prev,
        codigoPostal: valor['post code'] || valor.codigoPostal || ''
      }));
    }

    setMostrarSugerencias(prev => ({ ...prev, [tipo]: false }));
  };

  const manejarEnvio = (e) => {

    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.email) {
      alert('Por favor complete los campos obligatorios');
      return;
    }
    
    onNext();
  };

  return (
    <div className="contenedor-formulario">
      <div className="cabecera-formulario">
        <h1 className="titulo-principal">Información Personal</h1>
        <p className="subtitulo">Por favor ingresa tus datos para continuar con la reserva.</p>
      </div>

      <div className="formulario-datos">
        <div className="contenedor-campos">

          {/* Nombre y Apellido */}
          <div className="grupo-campos">
            <div className="campo">
              <label htmlFor="nombre">Nombre*</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={manejarCambio}
                required
                className="entrada"
              />
            </div>

            <div className="campo">
              <label htmlFor="apellido">Apellido*</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={manejarCambio}
                required
                className="entrada"
              />
            </div>
          </div>

          {/* Email y Teléfono */}
          <div className="grupo-campos">
            <div className="campo">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={manejarCambio}
                required
                className="entrada"
              />
            </div>

            <div className="campo">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={manejarCambio}
                className="entrada"
              />
            </div>
          </div>

          {/* Documento */}
          <div className="grupo-campos">
            <div className="campo">
              <label htmlFor="documento">DNI/LIBRETA</label>
              <input
                type="text"
                id="documento"
                name="documento"
                value={formData.documento}
                onChange={manejarCambio}
                className="entrada"
              />
            </div>
          </div>

          {/* País y Ciudad */}
          <div className="grupo-campos">
            <div className="campo">
              <label htmlFor="pais">País</label>
              <input
                type="text"
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={manejarCambio}
                className="entrada"
                placeholder="Escribe un país..."
                autoComplete="off"
              />
              {mostrarSugerencias.pais && sugerencias.paises.length > 0 && (
                <div className="lista-sugerencias">
                  {sugerencias.paises.map((pais, index) => (
                    <div
                      key={index}
                      className="item-sugerencia"
                      onClick={() => seleccionarSugerencia('pais', pais)}
                    >
                      {pais.nombre}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="campo">
              <label htmlFor="ciudad">Ciudad</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={manejarCambio}
                className="entrada"
                placeholder="Ciudad"
                disabled={!formData.pais}
              />
            </div>
          </div>

          {/* Dirección y Código Postal */}
          <div className="grupo-campos">
            <div className="campo">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={manejarCambio}
                className="entrada"
                placeholder="Escribe tu dirección..."
                autoComplete="off"
                disabled={!formData.pais}
              />
              {mostrarSugerencias.direccion && sugerencias.direcciones.length > 0 && (
                <div className="lista-sugerencias">
                  {sugerencias.direcciones.map((dir, index) => (
                    <div
                      key={index}
                      className="item-sugerencia"
                      onClick={() => seleccionarSugerencia('direccion', dir)}
                    >
                      {dir.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="campo">
              <label htmlFor="codigoPostal">Código Postal</label>
              <input
                type="text"
                id="codigoPostal"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={manejarCambio}
                className="entrada"
                placeholder="Código Postal"
                list="lista-codigos-postales"
              />
              <datalist id="lista-codigos-postales">
                {sugerencias.codigosPostales.map((cp, index) => (
                  <option key={index} value={cp['post code'] || cp.codigoPostal} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        <div className="controles-navegacion">
          <button type="button" onClick={onBack} className="boton-secundario">
            Anterior
          </button>
          <button type="submit" className="boton-principal" onClick={manejarEnvio}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasoInfoPersonal;
