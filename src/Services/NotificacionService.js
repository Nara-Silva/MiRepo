const { NotFoundError } = require("../Errors/appErrors");

class NotificacionService {

    constructor(notificacionRepository) {
        this.notificacionRepository = notificacionRepository;
    }

    async obtenerNotificacionesSinLeerPorUsuario(idUsuario) {
        const notificaciones = await this.notificacionRepository.obtenerNotificacionesSinLeerPorUsuario(idUsuario);
        if(!notificaciones) {
            // Se puede hacer una excepcion personalizada
            throw new NotFoundError(`No se encontraron notificaciones para el usuario de id: ${idUsuario}`);
        }
        // Se podria hacer una funcion para transformar el objeto a DTO
        return notificaciones.map(notificacion => this.toDTO(notificacion));
    }

    async obtenerNotificacionesLeidasPorUsuario(idUsuario) {
        const notificaciones = await this.notificacionRepository.obtenerNotificacionesLeidasPorUsuario(idUsuario);
        if(!notificaciones) {
            // Se puede hacer una excepcion personalizada
            throw new NotFoundError(`No se encontraron notificaciones para el usuario de id: ${idUsuario}`);
        }
        // Se podria hacer una funcion para transformar el objeto a DTO
        return notificaciones.map(notificacion => this.toDTO(notificacion));
    }

    async marcarNotificacionComoLeida(idNotificacion) {
        const notificacion = await this.notificacionRepository.marcarNotificacionComoLeida(idNotificacion);
        if(!notificacion) {
            // Se puede hacer una excepcion personalizada
            throw new NotFoundError(`No se encontro la notificacion de id: ${idNotificacion}`);
        }
        // Se podria hacer una funcion para transformar el objeto a DTO
        return this.toDTO(notificacion);
    }

    async guardarNotificacion(notificacion) {
        const notificacionGuardada = await this.notificacionRepository.guardarNotificacion(notificacion);
        if(!notificacionGuardada) {
            // Se puede hacer una excepcion personalizada
            throw new Error("No se pudo guardar la notificacion");
        }
        // Se podria hacer una funcion para transformar el objeto a DTO
        return this.toDTO(notificacionGuardada);
    }

    async eliminarNotificacionesDeReserva(reserva){
        return await this.notificacionRepository.eliminarNotificacionesDeReserva(reserva);

    }

    toDTO(notificacion) {
    return {
      id: notificacion.id,
      mensaje: notificacion.mensaje,
      usuario: notificacion.usuario,
      fechaAlta: notificacion.fechaAlta,
      leida: notificacion.leida,
      fechaLeida: notificacion.fechaLeida,
      reserva: notificacion.reserva // el ?. es para evitar errores si no existe la categoria
    };}
}

module.exports = { NotificacionService };