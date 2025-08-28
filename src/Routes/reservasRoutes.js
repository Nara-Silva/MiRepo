const { ReservaController } = require('../Controllers/ReservaController.js');
const express = require('express');
const authMiddleware = require('../Middlewares/authMiddleware.js');

function reservasRoutes(getController) {
    const router = express.Router();

    // 1) Obtener reservas
    /**
    * @swagger
    * /reservas:
    *   get:
    *     summary: Obtener todas las reservas
    *     tags: [Reservas]
    *     responses:
    *       200:
    *         description: Lista de reservas
    */
    router.get("/reservas", async (req, res, next) => {
        const controller = getController(ReservaController);
        controller.obtenerReservas(req, res, next);
    });

    router.get("/reservas/:idReserva", async (req, res, next) => {
        const controller = getController(ReservaController);
        controller.obtenerReservaPorId(req, res, next);
    });

    // 2) Crear una nueva reserva
    router.post("/reservas", authMiddleware, async (req, res, next) => {
        getController(ReservaController).crearReserva(req, res, next);
    });

    router.get("/reservas/:id", async (req, res, next) => {
        getController(ReservaController).obtenerReservaPorId(req, res, next);
    });

    // 3) Consultar/Obtener el historial de reservas de un usuario
    router.get("/reservasPrueba/usuarios", authMiddleware, async (req, res, next) => {
        console.log("Entre al la ruta de /reservasPrueba/usuarios")
        getController(ReservaController).obtenerHistorialReservas(req, res, next);
    });

    // 3) Cancelacion de reservas (antes de su fecha de inicio)
    router.put("/reservas/:id/cancelacion", async (req, res, next) => {
        const controller = getController(ReservaController);
        controller.cancelarReserva(req, res, next);
    });

    // 4) Modificación de una reserva dentro de las reglas establecidas por el Sistema 
    router.patch("/reservas/:id", async (req, res, next) => {
        const controller = getController(ReservaController);
        controller.modificarReserva(req, res, next);
    });

    // 5) Confirmar reserva
    router.put("/reservas/:id/confirmacion", async (req, res, next) => {
        const controller = getController(ReservaController);
        controller.confirmarReserva(req, res, next);
    });

    // 6) BuscarFechas Ocupadas por Alojamiento
    router.get("/reservas/fechasOcupadas/:idAlojamiento", async (req, res, next) => {
        const controller = getController(ReservaController);
        controller.obtenerFechasOcupadasPorAlojamiento(req, res, next);
    });

    //GENERALES
    // 1)
    router.get("/health", (req, res) => {
        res.send("OK");
    });

     router.get("/", (req, res) => {
        res.send("La api se conectó correctamente");
    });


    // Esto seria cuando va al next(err)
    // router.use(reservaExceptionMiddleware); // Middleware para manejar excepciones de reservas

    return router; // devuelvo el router para que pueda ser usado en el servidor
}

module.exports = { reservasRoutes };