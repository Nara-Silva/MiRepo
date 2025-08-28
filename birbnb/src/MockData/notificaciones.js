const mockNotificaciones = [
  {
    mensaje: "Tu reserva fue confirmada",
    usuario: "Undefined",
    fechaAlta: "2025-06-10T10:00:00Z",
    leida: false,
    fechaLeida: null,
    reserva: {
      _id: "res_001",
      fechaAlta: "2025-06-09T18:00:00Z",
      huespedReservador: "carlitos@gmail.com",
      cantHuespedes: 2,
      alojamiento: {
        _id: "684dfa88309f43146abeb8be", // Casa del Lago Azul
        nombre: "Casa del Lago Azul"
      },
      rangoDeFechas: {
        fechaInicio: "2025-09-23",
        fechaFin: "2025-09-25"
      },
      precioPorNoche: 2000,
      estado: "CONFIRMADA"
    }
  },
  {
    mensaje: "Tu reserva fue cancelada",
    usuario: "Undefined",
    fechaAlta: "2025-06-11T14:30:00Z",
    leida: true,
    fechaLeida: "2025-06-11T15:00:00Z",
    reserva: {
      _id: "res_002",
      fechaAlta: "2025-06-10T11:00:00Z",
      huespedReservador: "carlitos@gmail.com",
      cantHuespedes: 1,
      alojamiento: {
        _id: "684dfa88309f43146abeb8bf", // Loft Urbano Central
        nombre: "Loft Urbano Central"
      },
      rangoDeFechas: {
        fechaInicio: "2025-09-27",
        fechaFin: "2025-09-30"
      },
      precioPorNoche: 150,
      estado: "CANCELADA"
    }
  },
  {
    mensaje: "Nueva solicitud de reserva",
    usuario: "Undefined",
    fechaAlta: "2025-06-12T08:45:00Z",
    leida: false,
    fechaLeida: null,
    reserva: {
      _id: "res_003",
      fechaAlta: "2025-06-12T08:00:00Z",
      huespedReservador: "carlitos@gmail.com",
      cantHuespedes: 3,
      alojamiento: {
        _id: "684dfa88309f43146abeb8c0", // Cabaña de Montaña
        nombre: "Cabaña de Montaña"
      },
      rangoDeFechas: {
        fechaInicio: "2025-10-01",
        fechaFin: "2025-10-05"
      },
      precioPorNoche: 300,
      estado: "PENDIENTE"
    }
  },
  {
    mensaje: "Nueva reseña recibida",
    usuario: "Undefined",
    fechaAlta: "2025-06-14T11:30:00Z",
    leida: false,
    fechaLeida: null,
    reserva: {
      _id: "res_004",
      fechaAlta: "2025-06-09T18:00:00Z",
      huespedReservador: "carlitos@gmail.com",
      cantHuespedes: 2,
      alojamiento: {
        _id: "684dfa88309f43146abeb8c2", // Villa Toscana
        nombre: "Villa Toscana"
      },
      rangoDeFechas: {
        fechaInicio: "2025-09-23",
        fechaFin: "2025-09-25"
      },
      precioPorNoche: 500,
      estado: "CONFIRMADA"
    }
  },
  {
    mensaje: "Tu reserva fue confirmada",
    usuario: "Undefined",
    fechaAlta: "2025-06-15T12:00:00Z",
    leida: false,
    fechaLeida: null,
    reserva: {
      _id: "res_005",
      fechaAlta: "2025-06-14T19:00:00Z",
      huespedReservador: "carlitos@gmail.com",
      cantHuespedes: 2,
      alojamiento: {
        _id: "684dfa88309f43146abeb8c3", // Apartamento Moderno
        nombre: "Apartamento Moderno"
      },
      rangoDeFechas: {
        fechaInicio: "2025-11-10",
        fechaFin: "2025-11-12"
      },
      precioPorNoche: 80,
      estado: "CONFIRMADA"
    }
  }
];

export { mockNotificaciones };
