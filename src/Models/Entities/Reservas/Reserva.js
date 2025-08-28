const { CambioEstadoReserva } = require("./CambioEstadoReserva.js")
const { FactoryNotificacion } = require("../Notificacion/FactoryNotificacion.js");
const { EstadoReserva } = require("../Enums/Enums.js");
const { Alojamiento } = require("../Alojamiento/Alojamiento.js")

class Reserva {

    constructor({fechaAlta, huespedReservador, cantHuespedes, alojamiento, rangoDeFechas, estado, precioPorNoche}) {
        this.fechaAlta = fechaAlta;
        this.huespedReservador = huespedReservador;
        this.cantHuespedes = cantHuespedes;
        this.alojamiento = alojamiento;
        this.rangoDeFechas = rangoDeFechas;
        this.precioPorNoche = precioPorNoche;
        this.estado = estado;
    }
    
    setEstado(estado){
        this.estado = estado
    }

    actualizarEstado(estadoReserva, responsableDelCambio, motivo) {
        const fechaHoy = new Date();
        const cambioReserva = new CambioEstadoReserva({
            fechaCambio: fechaHoy, 
            estadoACambiar: estadoReserva, 
            reserva: this, 
            motivo: motivo, 
            usuarioCambiador: responsableDelCambio
        })
        // console.log(this.alojamiento);
        return cambioReserva.cambiarEstado(this, motivo);
    }



    gestionarNotificaciones(motivo) { // le puse un motivo para que se la mande en el caso de CANCELACION
        const factoryNotificacion = new FactoryNotificacion();
        const notificacionCambio = factoryNotificacion.crearSegunReserva(this, motivo);
        return notificacionCambio; // Devuelvo la notificacion creada
    }
    

    anfitrionDeAlojamiento() {
        return this.alojamiento.anfitrion;
    }
    
}

module.exports = { Reserva };
