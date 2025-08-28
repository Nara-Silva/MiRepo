
class Notificacion {

    constructor({mensaje, usuario, fechaAlta, leida, fechaLeida, reserva}) {
        this.mensaje = mensaje;
        this.usuario = usuario;
        this.fechaAlta = fechaAlta;
        this.leida = leida;
        this.fechaLeida = fechaLeida;
        this.reserva = reserva;
    }

    marcarComoLeida() {
        this.leida = true
        this.fechaLeida = new Date()
    }

    enviarA(persona) {
        persona.recibirNotificacion(this)
    }
}

module.exports =  { Notificacion };