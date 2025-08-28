class CambioEstadoReserva {

    constructor({fechaCambio, estadoACambiar, reserva, motivo, usuarioCambiador}) {
        this.fechaCambio = fechaCambio;
        this.estadoACambiar = estadoACambiar;
        this.reserva = reserva;
        this.motivo = motivo;
        this.usuarioCambiador = usuarioCambiador;
    }

    cambiarEstado(reserva, motivo) {
        reserva.setEstado(this.estadoACambiar)
    }
}

module.exports =  {CambioEstadoReserva}