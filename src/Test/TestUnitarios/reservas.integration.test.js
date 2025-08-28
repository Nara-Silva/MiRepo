const request = require("supertest");
const { AlojamientoService } = require('../../Services/AlojamientoService.js');
const { NotificacionService } = require("../../Services/NotificacionService.js");
const { reservasRoutes } = require("../../Routes/reservasRoutes.js");
const { buildTestServer } = require("./utils/server.js");
const { ReservaService } = require("../../Services/ReservaService.js");

const server = buildTestServer()

server.addRoute(reservasRoutes)
server.configureRoutes()

const reservas = {
    "_id": "6928e462c44bd535ab17b6d3",
    "fechaAlta": "2025/05/20",
    "id_huespedReservador": "999a1234b5e123456789abcd",
    "cantHuespedes": 2,
    "id_alojamiento": "6828e462c44bd535ab17b6d3",
    "rangoDeFechas": {
        "fechaInicio": "2025/05/20",
        "fechaFin": "2025/05/25"
    },
    "estado": "PENDIENTE",
    "precioPorNoche": 100
}

const reservasConfirmada = {
    "_id": "6928e462c44bd535ab17b6d3",
    "fechaAlta": "2025/05/20",
    "id_huespedReservador": "999a1234b5e123456789abcd",
    "cantHuespedes": 2,
    "id_alojamiento": "6828e462c44bd535ab17b6d3",
    "rangoDeFechas": {
        "fechaInicio": "2025/05/20",
        "fechaFin": "2025/05/25"
    },
    "estado": "CONFIRMADA",
    "precioPorNoche": 100
}

const reservasCancelada = {
    "_id": "6928e462c44bd535ab17b6d3",
    "fechaAlta": "2025/05/20",
    "id_huespedReservador": "999a1234b5e123456789abcd",
    "cantHuespedes": 2,
    "id_alojamiento": "6828e462c44bd535ab17b6d3",
    "rangoDeFechas": {
        "fechaInicio": "2025/05/20",
        "fechaFin": "2025/05/25"
    },
    "estado": "CANCELADA",
    "precioPorNoche": 100,

    huespedReservador: {
        nombre: "El HUESPED"
    },
    alojamiento: {
        nombreAlojamiento: "Casa de los Simpsons"
    },

    anfitrionDeAlojamiento: () => "664a1234b5e123456789abcd"
}

const alojamiento = {        
    "_id": "6828e462c44bd535ab17b6d3",
    "anfitrion": "6828ee17e3c519f5603b8a60",
    "nombreAlojamiento": "Casa de los Simpsons",
    "descripcion": "Una cabaña con homero y marge",
    "precioPorNoche": 100,
    "moneda": "DOLAR_USA",
    "horarioCheckIn": "14:00",
    "horarioCheckOut": "11:00",
    "direccion": {
        "calle": "Avenida Siempreviva",
        "altura": 742,
        "ciudad": {
            "nombre": "Springfield",
            "pais": {
                "nombre": "USA",
            },  
        "latitud": "37.21533",
        "longitud": "-93.29824"
        },

    },
     "cantHuespedesMax": 4,
     "caracteristicas": [],
     "fotos": [],
}

const reservaEnviadas = {
    "id_huespedReservador": "6828e462c44bd535ab17b6d3",
    "cantHuespedes": 2,
    "id_alojamiento": "6828f600ee1391ba35148355",
    "fechaInicio": "2025/05/20",
    "fechaFin": "2025/05/25"
}


const notificacionPendiente = {
    "_id": "682b2ea24ddbe2e2fd3cfbfd",
    "mensaje": "Su reserva esta en pendiente",
    "usuario": "999a1234b5e123456789abcd",
    "fechaAlta": "2025/05/20",
    "leida": false,
    "fechaLeida": null,
    "reserva": "6928e462c44bd535ab17b6d3"
}

const NotificacionDeCancelacion = {
    "_id": "000b2ea24ddbe2e2fd3cfbfd",
    "mensaje": "Su reserva esta en CANCELADA",
    "usuario": "999a1234b5e123456789abcd",
    "fechaAlta": "2025/05/20",
    "leida": false,
    "fechaLeida": null,
    "reserva": "6928e462c44bd535ab17b6d3"
}

const usuarioHuesped = {
    "_id": "999a1234b5e123456789abcd",
    "nombre": "El HUESPED",
    "email": "anfitrion@gmail.com",
    "tipo": "HUESPED"
}

const usuarioAnfitrion = {        
    "_id":"664a1234b5e123456789abcd",
    "nombre": "El ANFITRION",
    "email": "anfitrion@gmail.com",
    "tipo": "ANFITRION",
}

test('POST /crear una reaseva', async () => {
    const mockUsuarioRepositoryReservas = {
        guardarReserva: jest.fn().mockResolvedValue(reservas),
        obtenerReservaPorId: jest.fn().mockResolvedValue({
            huespedReservador: { 
                nombre: "El HUESPED" 
            },
            alojamiento: { 
                nombreAlojamiento: "Casa de los Simpsons" 
            },
            rangoDeFechas: {
                fechaInicio: "2025/05/20",
                fechaFin: "2025/05/25"
            },
            anfitrionDeAlojamiento: () => "664a1234b5e123456789abcd" // Me trae el alojamiento 
        }),
        obtenerReservasPorAlojamientoYRango: jest.fn().mockResolvedValue([]), // para que me de true 
    }

    const mockAlojamientoAlojamientos = {
        obtenerAlojamientosPorId: jest.fn().mockResolvedValue(alojamiento)
    }

    const mockNotificacionRepository = {
        guardarNotificacion: jest.fn().mockResolvedValue(notificacionPendiente)
    }

    const notificacionService = new NotificacionService(mockNotificacionRepository);
    const alojamientoService = new AlojamientoService(mockAlojamientoAlojamientos);
    const reservaService = new ReservaService(mockUsuarioRepositoryReservas, alojamientoService, notificacionService);

    // Mock opcional si toDTO explota
    reservaService.toDTO = jest.fn().mockReturnValue(reservas);

    const reservaCreada = await reservaService.crearReserva(reservaEnviadas);

    expect(mockUsuarioRepositoryReservas.guardarReserva).toHaveBeenCalled();
    expect(reservaCreada).toEqual(reservas);
});


test('GET /reservas - Deberia devolver una lista de reservas', async () => {
    const mockReservaRepository = {
        obtenerReservas: jest.fn().mockResolvedValue([reservas]),
    };

    // vacias pero las necesito para el constructor
    const mockAlojamientoAlojamientos = { };
    const mockNotificacionRepository = { }; 

    const notificacionService = new NotificacionService(mockNotificacionRepository); // lo necesito para el constructor
    const alojamientoService = new AlojamientoService(mockAlojamientoAlojamientos); // lo necesito para el constructor
    const reservaService = new ReservaService(mockReservaRepository, alojamientoService, notificacionService);

    reservaService.toDTO = jest.fn().mockReturnValue(reservas); // Por las dudas

    const resultado = await reservaService.obtenerReservas();

    expect(mockReservaRepository.obtenerReservas).toHaveBeenCalled();
    expect(resultado).toEqual([reservas]);
});


test('GET /reservas/usuarios/:id - Debería devolver las reservas por id', async () => {
    const mockReservaRepository = {
        obtenerHistorial: jest.fn().mockResolvedValue([reservas]),
    };

    // vacias pero las necesito para el contructor
    const mockAlojamientoAlojamientos = { };
    const mockNotificacionRepository = { };

    const notificacionService = new NotificacionService(mockNotificacionRepository);
    const alojamientoService = new AlojamientoService(mockAlojamientoAlojamientos);
    const reservaService = new ReservaService(mockReservaRepository, alojamientoService, notificacionService);

    reservaService.toDTO = jest.fn().mockReturnValue(reservas); // Si necesitás el DTO

    const resultado = await reservaService.obtenerHistorialPorId("999a1234b5e123456789abcd");

    expect(mockReservaRepository.obtenerHistorial).toHaveBeenCalledWith("999a1234b5e123456789abcd");
    expect(resultado).toEqual([reservas]);
});

test("PATCH /reservas/:id - Deberia modificar una reserva (cambiando de estado PENDIENTE a CONFIRMADA)", async () => {
    const mockReservaRepository = {
        modificarReserva: jest.fn().mockResolvedValue(reservasConfirmada),
        obtenerReservaPorId: jest.fn().mockResolvedValue(reservas)
    }
    // vacias pero las necesito para el contructor
    const mockAlojamientoAlojamientos = { };
    const mockNotificacionRepository = { };

    const notificacionService = new NotificacionService(mockNotificacionRepository);
    const alojamientoService = new AlojamientoService(mockAlojamientoAlojamientos);
    const reservaService = new ReservaService(mockReservaRepository, alojamientoService, notificacionService);

    const resultado = await reservaService.modificarReserva("6928e462c44bd535ab17b6d3");

    expect(resultado.estado).toBe("CONFIRMADA");
    expect(resultado._id).toBe("6928e462c44bd535ab17b6d3");
})


test("PUT /reservas/:id - Deberia cancelar una reserva", async () => {
    const mockReservaRepository = {
        modificarReserva: jest.fn().mockResolvedValue(reservasCancelada),
        obtenerReservaPorId: jest.fn().mockResolvedValue(reservas)
    }
    // vacias pero las necesito para el contructor
    const mockAlojamientoAlojamientos = { };

    const mockNotificacionRepository = {
        guardarNotificacion: jest.fn().mockResolvedValue(NotificacionDeCancelacion),
        eliminarNotificacionesDeReserva: jest.fn().mockResolvedValue(NotificacionDeCancelacion)
    }

    const notificacionService = new NotificacionService(mockNotificacionRepository);
    const alojamientoService = new AlojamientoService(mockAlojamientoAlojamientos);
    const reservaService = new ReservaService(mockReservaRepository, alojamientoService, notificacionService);

    reservaService.toDTO = jest.fn().mockReturnValue(reservas); // Si necesitás el DTO
    const resultado = await reservaService.cancelarReserva("6928e462c44bd535ab17b6d3", "No me gusta el alojamiento");

    expect(mockReservaRepository.obtenerReservaPorId).toHaveBeenCalledWith("6928e462c44bd535ab17b6d3");
    expect(mockReservaRepository.modificarReserva).toHaveBeenCalledWith("6928e462c44bd535ab17b6d3", { estado: "CANCELADA" });
    expect(resultado).toEqual(reservas);
});