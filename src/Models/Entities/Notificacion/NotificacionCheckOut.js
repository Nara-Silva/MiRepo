const { Notificacion } = require('./Notificacion.js');
const { FactoryNotificacion } = require ("./FactoryNotificacion.js")

class NotificacionCheckOut extends FactoryNotificacion {

    crear(reserva, motivo) {
        const mensaje = `Recuerde ${reserva.huespedReservador.nombre} que su checkIn en '${reserva.alojamiento.nombreAlojamiento} es el '${reserva.alojamiento.horarioCheckOut}
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

module.exports = { NotificacionCheckOut } 