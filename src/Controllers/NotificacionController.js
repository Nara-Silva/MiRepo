class NotificacionController {
    
    constructor(notificacionService) {
        this.notificacionService = notificacionService;
    }

    async obtenerNotificacionesSinLeerPorUsuario(req, res, next) {
        try {
            const id = req.usuario.sub;
            const notificaciones = await this.notificacionService.obtenerNotificacionesSinLeerPorUsuario(id);
            res.status(200).json(notificaciones);
        } catch (error) {
            next(error);
        }
    }

    async obtenerNotificacionesLeidasPorUsuario(req, res, next) {
        try {
            const id = req.usuario.sub;
            const notificaciones = await this.notificacionService.obtenerNotificacionesLeidasPorUsuario(id);
            res.status(200).json(notificaciones);
        } catch (error) {
            next(error);
        }
    }

    async marcarNotificacionComoLeida(req, res, next) { 
        try {
            const notificacion = await this.notificacionService.marcarNotificacionComoLeida(req.params.id);

            if (!notificacion) {
                return res.status(404).json({ error: "Notificación no encontrada" });
            }

            res.status(200).json(notificacion);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { NotificacionController };
