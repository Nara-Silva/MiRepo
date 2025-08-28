const { RangoFechas } = require('../Reservas/RangoFechas.js')
const { Reserva } = require('../Reservas/Reserva.js')
const { Usuario } = require('./Usuario.js')
const { EstadoReserva } = require('../Enums/Enums.js')
const { TipoUsuario } = require('../Enums/Enums.js')


class Huesped extends Usuario {
    constructor({nombre, email}) {
        super({ nombre, email, tipo: TipoUsuario.HUESPED });
    }

    realizarReserva(alojamiento, fechaInicio, fechaFinal, cantHuespedes) {
        // Toda la logica en este metodo creemos que conformará parte de una capa superior
        const rangoDeFechas1 = new RangoFechas({fechaInicio: fechaInicio, fechaFin: fechaFinal})
        // const fechaHoy = new Date()
        // const precioPorNoche = alojamiento.precioPorNoche

        // Validacion de si el alojamiento se encuentra disponible en el rango de fechas
        if(!alojamiento.estasDisponibleEn(rangoDeFechas1)) { throw new Error("El alojamiento no está disponible en esas fechas") }

        // Sino, crea la reserva..
        const nuevaReserva = new Reserva({
            fechaAlta: new Date(), 
            huespedReservador: this, 
            cantHuespedes: cantHuespedes, 
            alojamiento: alojamiento, 
            rangoDeFechas: rangoDeFechas1, 
            estado: EstadoReserva.PENDIENTE,
            precioPorNoche: alojamiento.precioPorNoche
        })
        // nuevaReserva.gestionarNotificaciones()
        alojamiento.agregarReserva(nuevaReserva) // aca estas agregando la reserva previamente en Huesped
        
    }


    cancelarReserva(reserva, motivo) {
        // Creemos que no es responsabilidad del Huesped actualizar el estado sino de una capa superior
       reserva.actualizarEstado(EstadoReserva.CANCELADA, this, motivo)
    
    }

    setid(value) {
        super.setid(value);
    }

    recibirNotificacion(notificacion) {
        super.recibirNotificacion(notificacion);
    }
}

module.exports = { Huesped }