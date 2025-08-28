const { Notificacion } = require('./Notificacion.js');
const {FactoryNotificacion} = require ("./FactoryNotificacion.js")

class NotificacionDeCancelacion extends FactoryNotificacion {
    
    crear(reserva, motivo) {
        const mensaje = `El huésped ${reserva.huespedReservador.nombre} canceló su reserva en '${reserva.alojamiento.nombreAlojamiento}". Motivo: ${motivo || 'No especificado'}.`;
        return new Notificacion({
             mensaje: mensaje,
             usuario: reserva.anfitrionDeAlojamiento(),
             fechaDeAlta: new Date(),
             leida: false,
             fechaLeida: null,
             reserva: reserva
        });
    }
}
 
module.exports = { NotificacionDeCancelacion };
