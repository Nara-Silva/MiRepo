const express = require('express');
const { NotificacionController } = require('../Controllers/NotificacionController.js');
const authMiddleware = require('../Middlewares/authMiddleware.js');

// Se espera:
// - Endpoint para obtener la lista de notificaciones sin leer de un usuario.
// - Endpoint para obtener la lista de notificaciones leídas de un usuario.
// - Endpoint para marcar una notificación como leída.

function notificacionRoutes(getController) {
    const router = express.Router()

    // 1) Endpoint para obtener la lista de notificaciones sin leer de un usuario.
    router.get("/usuarios/notificaciones/sin-leer", authMiddleware, async (req, res, next) => {
        const controller = getController(NotificacionController);
        controller.obtenerNotificacionesSinLeerPorUsuario(req, res, next);
    });

    // 2) Endpoint para obtener la lista de notificaciones leídas de un usuario.
    router.get("/usuarios/notificaciones/leidas", authMiddleware ,(req, res, next) => {
        const controller = getController(NotificacionController);
        controller.obtenerNotificacionesLeidasPorUsuario(req, res, next);
    });

    // 3) Endpoint para marcar una notificación como leída.
    router.put("/notificaciones/:id", (req, res, next) => {
        const controller = getController(NotificacionController);
        controller.marcarNotificacionComoLeida(req, res, next);
    });

    // Esto seria cuando va al next(err)
    // router.use(reservaExceptionMiddleware); // Middleware para manejar excepciones de reservas

    return router;
}

module.exports = { notificacionRoutes };