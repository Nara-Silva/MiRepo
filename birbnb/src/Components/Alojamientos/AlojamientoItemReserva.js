import './AlojamientoItemReserva.css';
import { obtenerSimbolo, CaracteristicaItem } from './AlojamientoItem';

function diferenciaEnDias(fecha1, fecha2) {
    const diffEnMilisegundos = fecha2.getTime() - fecha1.getTime();
    const diffEnDias = diffEnMilisegundos / (1000 * 60 * 60 * 24);
    return diffEnDias;
  }

function AlojamientoItemReserva ({aAlojamiento, fechaInicio, fechaFin, cantidadViajeros}) {
    return (

        <div className="alojamiento-item-reserva-container">
            <div className='titulo-img'>
                
                <img className='detalle-img-item' src={aAlojamiento.fotos[0]} alt='Alojamiento'></img>
                <h3>{aAlojamiento.nombreAlojamiento}</h3>
            </div>

                <div className="priceAndCaracteristics"> 
                    <p><strong>Precio por noche:</strong> {obtenerSimbolo(aAlojamiento.moneda)}{aAlojamiento.precioPorNoche}</p>
                    <p><strong>Capacidad:</strong> { cantidadViajeros } {cantidadViajeros > 1 ? 'personas' : 'persona'}</p>     
                </div>


                <div className='Precio-total'>
                    {!fechaInicio || !fechaFin  ?(
                        <p>Precio Total: - </p>
                    ) : (
                            <p>Precio Total: ${diferenciaEnDias(new Date(fechaInicio), new Date(fechaFin)) * aAlojamiento.precioPorNoche} </p>           
                    )}
                </div> 
        </div>
    )
}

export default AlojamientoItemReserva;