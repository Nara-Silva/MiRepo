import React, { useState, useEffect } from 'react';
import './Calendario.css';
import { parseISO, isSameDay, isWithinInterval } from 'date-fns';
import useFechasOcupadas from '../../Hooks/useFechasOcupadas';

const generarDiasDelMes = (year, month) => {
  const fecha = new Date(year, month, 1);
  const dias = [];
  while (fecha.getMonth() === month) {
    dias.push(new Date(fecha));
    fecha.setDate(fecha.getDate() + 1);
  }
  return dias;
};

const aMedianoche = (fecha) => {
  const f = new Date(fecha);
  f.setHours(0, 0, 0, 0);
  return f;
};

const Calendario = ({ idAlojamiento, onSeleccionarRango }) => {
  const hoy = aMedianoche(new Date());
  const [mesActual, setMesActual] = useState(hoy.getMonth());
  const [anioActual, setAnioActual] = useState(hoy.getFullYear());

  const [fechaSeleccionadaInicio, setFechaSeleccionadaInicio] = useState(null);
  const [fechaSeleccionadaFin, setFechaSeleccionadaFin] = useState(null);

  const { fechasOcupadas, cargando } = useFechasOcupadas(idAlojamiento);



  useEffect(() => {
    const reservaGuardada = JSON.parse(localStorage.getItem('reservaAlojamiento'));
    if (reservaGuardada?.checkIn) {
      setFechaSeleccionadaInicio(aMedianoche(parseISO(reservaGuardada.checkIn)));
    }
    if (reservaGuardada?.checkOut) {
      setFechaSeleccionadaFin(aMedianoche(parseISO(reservaGuardada.checkOut)));
    }
  }, []);

  const diasSemana = ['lu', 'ma', 'mi', 'ju', 'vi', 'sá', 'do'];
  const diasMes = generarDiasDelMes(anioActual, mesActual);
  const primerDia = new Date(anioActual, mesActual, 1).getDay();
  const offset = primerDia === 0 ? 6 : primerDia - 1;
  const dias = Array(offset).fill(null).concat(diasMes);
  while (dias.length < 42) dias.push(null);

  const avanzarMes = () => {
    if (mesActual === 11) {
      setMesActual(0);
      setAnioActual(anioActual + 1);
    } else {
      setMesActual(mesActual + 1);
    }
  };

  const retrocederMes = () => {
    if (mesActual === 0) {
      setMesActual(11);
      setAnioActual(anioActual - 1);
    } else {
      setMesActual(mesActual - 1);
    }
  };

  const diaEstaOcupado = (dia) => {
    if (!dia) return false;
    const diaNormalizado = aMedianoche(dia);
  
    // Marcar como ocupado si es anterior a hoy
    if (diaNormalizado <= hoy) return true;
  
    return fechasOcupadas.some(rango => {
      const inicio = fechaDesdeISO(rango.fechaInicio);
      const fin = fechaDesdeISO(rango.fechaFin);
      return isSameDay(diaNormalizado, inicio) ||
             isSameDay(diaNormalizado, fin) ||
             isWithinInterval(diaNormalizado, { start: inicio, end: fin });
    });
  };
  const fechaDesdeISO = (iso) => {
    const [anio, mes, dia] = iso.substring(0, 10).split('-').map(Number);
    return aMedianoche(new Date(anio, mes - 1, dia)); // Año, mes-1, día
  };

  const manejarSeleccion = (dia) => {
    if (!dia) return;
    const diaNormalizado = aMedianoche(dia);
    if (diaEstaOcupado(diaNormalizado)) return;
    if (diaNormalizado < hoy) return;

    if (!fechaSeleccionadaInicio || (fechaSeleccionadaInicio && fechaSeleccionadaFin)) {
      setFechaSeleccionadaInicio(diaNormalizado);
      setFechaSeleccionadaFin(null);
    } else if (fechaSeleccionadaInicio && !fechaSeleccionadaFin) {
      if (diaNormalizado > fechaSeleccionadaInicio) {
        let todosLibres = true;
        let currentDate = new Date(fechaSeleccionadaInicio);

        while (currentDate <= diaNormalizado) {
          if (diaEstaOcupado(currentDate)) {
            todosLibres = false;
            break;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }

        if (todosLibres) {
          setFechaSeleccionadaFin(diaNormalizado);
          if (onSeleccionarRango) {
            onSeleccionarRango({
              inicio: fechaSeleccionadaInicio,
              fin: diaNormalizado,
            });
          }
        } else {
          setFechaSeleccionadaInicio(null);
          setFechaSeleccionadaFin(null);
          alert('El rango seleccionado contiene fechas no disponibles');
        }
      } else {
        setFechaSeleccionadaInicio(diaNormalizado);
      }
    }
  };

  const obtenerClaseDia = (dia) => {
    if (!dia) return 'dia-vacio';

    const diaNormalizado = aMedianoche(dia);
    const clases = ['dia'];

    if (diaEstaOcupado(diaNormalizado)) {
      clases.push('ocupado', 'no-seleccionable');
      return clases.join(' ');
    }

    if (
      fechaSeleccionadaInicio &&
      fechaSeleccionadaFin &&
      isWithinInterval(diaNormalizado, {
        start: fechaSeleccionadaInicio,
        end: fechaSeleccionadaFin
      })
    ) {
      clases.push('seleccionado');
    } else if (
      isSameDay(diaNormalizado, fechaSeleccionadaInicio) ||
      isSameDay(diaNormalizado, fechaSeleccionadaFin)
    ) {
      clases.push('seleccionado');
    } else {
      clases.push('libre');
    }

    return clases.join(' ');
  };

  if (cargando) return <p>Cargando calendario...</p>;

  return (
    <div className="calendario">
      <div className="calendario-header">
        <button type="button" onClick={retrocederMes}>{"<"}</button>
        <h3>{new Date(anioActual, mesActual).toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <button type="button" onClick={avanzarMes}>{">"}</button>
      </div>
      <div className="dias-grid">
        {diasSemana.map((d, i) => (
          <div key={`header-${i}`} className="nombre-dia">{d}</div>
        ))}

        {dias.map((dia, idx) => (
          <div
            key={idx}
            className={`dia ${obtenerClaseDia(dia)}`}
            title={dia?.toDateString?.()}
            onClick={() => manejarSeleccion(dia)}
          >
            {dia ? dia.getDate() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendario;
