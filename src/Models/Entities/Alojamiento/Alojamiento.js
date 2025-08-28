const { RangoFechas } = require('../Reservas/RangoFechas.js');
const { EstadoReserva } = require('../Enums/Enums.js');


class Alojamiento {

    constructor({ id, anfitrion, nombreAlojamiento, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas = [], fotos = [] }) {
        this.id = id;
        this.anfitrion = anfitrion;
        this.nombreAlojamiento = nombreAlojamiento;
        this.descripcion = descripcion;
        this.precioPorNoche = precioPorNoche;
        this.moneda = moneda;
        this.horarioCheckIn = horarioCheckIn;
        this.horarioCheckOut = horarioCheckOut;
        this.direccion = direccion;
        this.cantHuespedesMax = cantHuespedesMax;
        this.caracteristicas = caracteristicas;
        this.fotos = fotos;
      }

    // NOVEDAD: Envio de notificaciones al anfitrion
    enviarNotificacionAAnfitrion(notificacion) {
        //console.log(this.anfitrion)
        this.anfitrion.recibirNotificacion(notificacion)
        //console.log("termine")
    }


}


module.exports = { Alojamiento };