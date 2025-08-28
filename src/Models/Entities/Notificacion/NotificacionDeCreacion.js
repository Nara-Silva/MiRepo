const { Notificacion } = require('./Notificacion.js');
const { FactoryNotificacion } = require ("./FactoryNotificacion.js")
const {Reserva} = require("../Reservas/Reserva.js")

class NotificacionDeCreacion extends FactoryNotificacion {
    
    crear(reserva, motivo) {
        const mensaje = `Nueva reserva para ${reserva.alojamiento.nombreAlojamiento} 
                                desde ${reserva.rangoDeFechas.fechaInicio} 
                                hasta ${reserva.rangoDeFechas.fechaFin}`;
        const notificacion = new Notificacion({
            mensaje: mensaje,
            usuario: reserva.anfitrionDeAlojamiento(),
            fechaDeAlta: new Date(),
            leida: false,
            fechaLeida: null,
            reserva: reserva
        })
        return notificacion;
    }
}

module.exports =  { NotificacionDeCreacion }