const { Notificacion } = require('./Notificacion.js');
const {FactoryNotificacion} = require ("./FactoryNotificacion.js")

class NotificacionDeConfirmacion extends FactoryNotificacion {
    
    crear(reserva, motivo) {
        const mensaje = `Tu reserva en "${reserva.alojamiento.nombreAlojamiento}" fue confirmada por el anfitrión.`;
        return new Notificacion({
            mensaje: mensaje,
            usuario: reserva.huespedReservador,
            fechaDeAlta: new Date(),
            leida: false,
            fechaLeida: null,
            reserva: reserva
        });
    }
}

module.exports = { NotificacionDeConfirmacion }