const { Notificacion } = require('./Notificacion.js');
const {FactoryNotificacion} = require ("./FactoryNotificacion.js")

class NotificacionCheckIn extends FactoryNotificacion {

    crear(reserva, motivo) {
        const mensaje = `Recuerde ${reserva.huespedReservador.nombre} que su checkIn en '${reserva.alojamiento.nombreAlojamiento} es el '${reserva.alojamiento.horarioCheckIn}
        ". Motivo: ${motivo || 'No especificado'}.`;
        return new Notificacion({
             mensaje: mensaje,
             usuario: reserva.anfitrionDeAlojamiento(),
             fechaDeAlta: fechaHoy,
             leida: false,
             fechaLeida: null,
             idReserva: reserva
        });
    }
}

module.exports = { NotificacionCheckIn }