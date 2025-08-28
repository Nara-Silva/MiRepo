const { Usuario } = require('./Usuario.js');
const { TipoUsuario } = require('../Enums/Enums.js');
const { EstadoReserva } = require('../Enums/Enums.js');
const { Reserva } = require('../Reservas/Reserva.js');

class Anfitrion extends Usuario {
    constructor({nombre, email}) {
        super(nombre, email, TipoUsuario.ANFITRION)
    }
  
    confirmarReserva(reserva) {
        reserva.actualizarEstado(EstadoReserva.CONFIRMADA, this, `La reserva fue confirmada por el anfitrión`);

    }

    recibirNotificacion(notificacion) {
        //console.log("Estoye en administrador")
        //console.log("termine")
        super.recibirNotificacion(notificacion);
    }
}

module.exports =  { Anfitrion }