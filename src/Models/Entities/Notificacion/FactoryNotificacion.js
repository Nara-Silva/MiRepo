const { Notificacion } = require('./Notificacion.js');
const { EstadoReserva } = require('../Enums/Enums.js');

class FactoryNotificacion {

    crear(reserva, motivo){}
    
//     crearSegunReserva(reserva, motivo) {    // che que onda el paramtro de motivo??
//         const fechaHoy = new Date();

// // PASOS
// // 1) le mando el mensaje con las cosas correspondientes
// // 2) creo la reserva con sus atributos

// switch (reserva.estado) {
//     case EstadoReserva.PENDIENTE: {
//         const mensaje = `Nueva reserva de ${reserva.huespedReservador.nombre} para ${reserva.alojamiento.nombreAlojamiento} desde ${reserva.rangoDeFechas.fechaHoy} hasta ${reserva.rangoDeFechas.fechaFin}`;
//         const noti = new Notificacion({
//             mensaje: mensaje,
//             usuario: reserva.anfitrionDeAlojamiento(),
//             fechaDeAlta: fechaHoy,
//             leida: false,
//             fechaLeida: null
//         })
//         return noti;
//     }
//     case EstadoReserva.CONFIRMADA: {
//         const mensaje = `Tu reserva en "${reserva.alojamiento.nombreAlojamiento}" fue confirmada por el anfitrión.`;
//         return new Notificacion({
//             mensaje: mensaje,
//             usuario: reserva.huespedReservador,
//             fechaDeAlta: fechaHoy,
//             leida: false,
//             fechaLeida: null
//         });
//     }
//     case EstadoReserva.CANCELADA: {
//         const mensaje = `El huésped ${reserva.huespedReservador.nombre} canceló su reserva en '${reserva.alojamiento.nombreAlojamiento}". Motivo: ${motivo || 'No especificado'}.`;
//         return new Notificacion({
//             mensaje: mensaje,
//             usuario: reserva.anfitrionDeAlojamiento(),
//             fechaDeAlta: fechaHoy,
//             leida: false,
//             fechaLeida: null
//         });
//     }
// }
// }





}

module.exports = { FactoryNotificacion };
