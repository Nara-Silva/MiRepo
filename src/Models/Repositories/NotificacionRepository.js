const { Notificacion } = require('../Entities/Notificacion/Notificacion.js');
const { NotificacionModel } = require('../Schemas/NotificacionSchema');

class NotificacionRepository {

    constructor() {
           this.model = NotificacionModel;
    }

    async obtenerNotificacionesSinLeerPorUsuario(idUsuario) {
        const notificaciones = await this.model.find({ usuario: idUsuario, leida: false });
        return notificaciones;
    }

    async obtenerNotificacionesLeidasPorUsuario(idUsuario) {
        const notificaciones = await this.model.find({ usuario: idUsuario, leida: true });
        return notificaciones;
    }

    async marcarNotificacionComoLeida(idNotificacion) {
        const notificacion = await this.model.findByIdAndUpdate(idNotificacion, { leida: true, fechaLeida: new Date() }, { new: true });
        return notificacion;
    }

    // Cuando creamos una reserva...

    async guardarNotificacion(notificacion) {
        const nuevaNotificacion = new this.model(notificacion);
        const notificacionGuardada = await nuevaNotificacion.save(); // esto devuelve una instancia de la clase reserva con id seteado
        return notificacionGuardada;
    }

    eliminarNotificacionesDeReserva(reserva) {
        this.model.deleteMany({reserva: reserva});
    }

}

module.exports = { NotificacionRepository };