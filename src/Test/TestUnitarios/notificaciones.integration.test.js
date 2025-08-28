const request = require("supertest");
const { AlojamientoService } = require('../../Services/AlojamientoService.js');
const { NotificacionService } = require("../../Services/NotificacionService.js");
const { reservasRoutes } = require("../../Routes/reservasRoutes.js");
const { buildTestServer } = require("./utils/server.js");
const { ReservaService } = require("../../Services/ReservaService.js");

const server = buildTestServer()

server.addRoute(reservasRoutes)
server.configureRoutes()

const notificacionPendiente = {
    "_id": "682b2ea24ddbe2e2fd3cfbfd",
    "mensaje": "Su reserva esta en pendiente",
    "usuario": "999a1234b5e123456789abcd",
    "fechaAlta": "2025/05/20",
    "leida": false,
    "fechaLeida": null,
    "reserva": "6928e462c44bd535ab17b6d3"
}

const notificacionPendientLeida = {
    "_id": "682b2ea24ddbe2e2fd3cfbfd",
    "mensaje": "Su reserva esta en pendiente",
    "usuario": "999a1234b5e123456789abcd",
    "fechaAlta": "2025/05/20",
    "leida": true,
    "fechaLeida": null,
    "reserva": "6928e462c44bd535ab17b6d3"
}

const notificacionDeCancelacion = {
    "_id": "000b2ea24ddbe2e2fd3cfbfd",
    "mensaje": "Su reserva esta en CANCELADA",
    "usuario": "999a1234b5e123456789abcd",
    "fechaAlta": "2025/05/20",
    "leida": false,
    "fechaLeida": null,
    "reserva": "6928e462c44bd535ab17b6d3"
}

test('GET /notificaciones NO leidas', async() => {
    const mockNotificacionesRepository = {
        obtenerNotificacionesSinLeerPorUsuario: jest.fn().mockResolvedValue([notificacionPendiente, notificacionDeCancelacion]),
    };

    const notificacionService = new NotificacionService(mockNotificacionesRepository);

    jest.spyOn(notificacionService, 'toDTO').mockImplementation(x => x);

    const notificaciones = await notificacionService.obtenerNotificacionesSinLeerPorUsuario("999a1234b5e123456789abcd");

    expect(mockNotificacionesRepository.obtenerNotificacionesSinLeerPorUsuario).toHaveBeenCalledWith("999a1234b5e123456789abcd");
    expect(notificaciones).toEqual([notificacionPendiente, notificacionDeCancelacion]);
    
})

test('GET /notificaciones leidas', async() => {
    const mockNotificacionesRepository = {
        obtenerNotificacionesLeidasPorUsuario: jest.fn().mockResolvedValue([]),
    };

    const notificacionService = new NotificacionService(mockNotificacionesRepository);

    jest.spyOn(notificacionService, 'toDTO').mockImplementation(x => x);

    const notificaciones = await notificacionService.obtenerNotificacionesLeidasPorUsuario("999a1234b5e123456789abcd");

    expect(notificaciones).toEqual([]);
    
})

test('PUT /notificaciones/:id', async() => {
    const mockNotificacionesRepository = {
        marcarNotificacionComoLeida: jest.fn().mockResolvedValue(notificacionPendientLeida),
    };

    const notificacionService = new NotificacionService(mockNotificacionesRepository);

    jest.spyOn(notificacionService, 'toDTO').mockImplementation(x => x);

    const notificaciones = await notificacionService.marcarNotificacionComoLeida("682b2ea24ddbe2e2fd3cfbfd");

    expect(notificaciones).toEqual(notificacionPendientLeida);
})