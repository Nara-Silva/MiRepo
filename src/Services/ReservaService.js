const { EstadoReserva } = require("../Models/Entities/Enums/Enums.js");
const { Huesped } =  require("../Models/Entities/Personas/Huesped.js");
const { Reserva } = require("../Models/Entities/Reservas/Reserva.js");
const { Alojamiento } = require("../Models/Entities/Alojamiento/Alojamiento.js");
const { NotificacionDeCreacion } = require("../Models/Entities/Notificacion/NotificacionDeCreacion.js");
const { NotificacionDeCancelacion } = require("../Models/Entities/Notificacion/NotificacionDeCancelacion.js");
const { NotificacionDeConfirmacion } = require("../Models/Entities/Notificacion/NotificacionDeConfirmacion.js");
const { FactoryNotificacion } = require("../Models/Entities/Notificacion/FactoryNotificacion.js");
const { Anfitrion } = require("../Models/Entities/Personas/Anfitrion.js");
const { Usuario } = require("../Models/Entities/Personas/Usuario.js");
const { RangoFechas } = require("../Models/Entities/Reservas/RangoFechas.js");
const { ConflictError, NotFoundError, ValidationError } = require("../Errors/appErrors.js");


class ReservaService {

    constructor(reservaRepository, alojamientoService, notificacionService){
        this.reservaRepository = reservaRepository;
        this.alojamientoService = alojamientoService;
        this.notificacionService = notificacionService;
    }

    async crearReserva(reserva) {
        const { huespedReservador, cantHuespedes, id_alojamiento, fechaInicio, fechaFin } = reserva;
            const alojamientoDoc = await this.alojamientoService.obtenerAlojamientosPorId(id_alojamiento);
            if (!alojamientoDoc){
                throw new NotFoundError(`No se encontro un alojamiento con id: ${id_alojamiento}`);
            }
            const fechaInicioDate = new Date(fechaInicio); // Porque viene como STRING
            const fechaFinDate = new Date(fechaFin);
            const rangoFechas = new RangoFechas({ fechaInicio: fechaInicioDate, fechaFin: fechaFinDate });
            
            const estaDisponible = await this.alojamientoDisponibleEn(this.reservaRepository, id_alojamiento, rangoFechas, cantHuespedes); 
            
             if (!estaDisponible || cantHuespedes > alojamientoDoc.cantHuespedesMax) {
                 throw new ConflictError(`El alojamiento no cumple las caracteriticas requeridas`);
            }
        
            // Creamos la reserva y la guardamos 
            const nuevaReserva = new Reserva({
                fechaAlta: new Date(),
                huespedReservador,
                cantHuespedes,
                alojamiento: id_alojamiento,
                rangoDeFechas: rangoFechas, 
                estado: EstadoReserva.PENDIENTE,
                precioPorNoche: alojamientoDoc.precioPorNoche,
            });
            if (!rangoFechas.esAnteriorAInicio(new Date())) {
                throw new ConflictError("VIAJERO EN EL TIEMPO: No se puede reservar en fechas pasadas");
            }
            const reservaGuardada = await this.reservaRepository.guardarReserva(nuevaReserva); 
            const resv = await this.reservaRepository.obtenerReservaPorId(reservaGuardada.id) 
            const factoryNotificacion = new NotificacionDeCreacion();
            const notificacion = factoryNotificacion.crear(resv, "Se creo una reserva"); 
           
            const notificacionHecha = await this.notificacionService.guardarNotificacion(notificacion); 
            return this.toDTO(reservaGuardada); 
    }

    async alojamientoDisponibleEn(reservaRepository, idAlojamiento, rangoFechas) {
        const reservasSuperpuestas = await reservaRepository.obtenerReservasPorAlojamientoYRango(idAlojamiento, rangoFechas);
        return reservasSuperpuestas.length === 0;
    }

    async obtenerReservaPorId(id) {
        if (!id) {
            throw new ValidationError("El id de la reserva es requerido");
        }
        const reserva = await this.reservaRepository.obtenerReservaPorId(id);
        if (!reserva) {
            throw new NotFoundError(`Reserva con id: ${id} no encontrada`);
        }
        // Si la reserva tiene un alojamiento, lo transformo a DTO
        // if (reserva.alojamiento) {
        //     const anfitrion = reserva.alojamiento.anfitrion ? new Anfitrion(reserva.alojamiento.anfitrion) : null;
        //     const alojamientoDTO = this.toDTOAlojamiento(anfitrion, reserva.alojamiento);
        //     console.log(alojamientoDTO);
        //     reserva.alojamiento = alojamientoDTO; // Reemplazo el alojamiento por el DTO
        // }
        // Si la reserva tiene un huesped, lo transformo a DTO
        // if (reserva.huespedReservador) {
        //     const huespedDTO = new Huesped(reserva.huespedReservador);
        //     reserva.huespedReservador = huespedDTO; // Reemplazo el huesped por el DTO
        // }
        return this.toDTO(reserva); // Devuelvo el DTO de la reserva
    }

    // Get Reservas
    async obtenerReservas() {
        return this.reservaRepository.obtenerReservas();
    }

    async obtenerFechasOcupadasPorAlojamiento(idAlojamiento) {
        const reservas =  await this.reservaRepository.obtenerFechasOcupadasPorAlojamiento(idAlojamiento);
        const fechasObtenidas = reservas.map(reserva => ({
            fechaInicio: reserva.fechaInicio.toISOString(),
            fechaFin: reserva.fechaFin.toISOString(),
        }));
        return fechasObtenidas
    }

    // Get Historial de Reservas
    async obtenerHistorialPorId(id){
        const historial = this.reservaRepository.obtenerHistorial(id);
        if(!historial){
            throw new NotFoundError(`No es encontro el historial para el usuario con id: ${id}`)
        }        
        return historial;
    }


    async cancelarReserva(reservaId, motivo){
        
        const reserva = await this.reservaRepository.obtenerReservaPorId(reservaId); 
        if (!reserva) {
            throw new NotFoundError(`Reserva con id: ${reservaId} no encontrada`);
        }

        if (!reserva.rangoDeFechas || !reserva.rangoDeFechas.fechaInicio || !reserva.rangoDeFechas.fechaFin) {
            throw new ValidationError("Rango de fechas faltante o invalido")
        }
        // if(reserva.estado == EstadoReserva.CANCELADA){
        //     throw new Error("La reserva ya está cancelada papi");
        // }

        // Se debe hacer si o si ya que sino no viene bien de la base de datos porque no es un objeto INDEPENDIENTE
        const rango = new RangoFechas({
            fechaInicio: reserva.rangoDeFechas.fechaInicio,
            fechaFin: reserva.rangoDeFechas.fechaFin
        });

        if (!rango.esAnteriorAInicio(new Date())) {
            throw new ConflictError("La reserva ya comenzó o está en curso");
        }

        // Modifico el estado de la reserva a cancelada
        const reservaCancelada = await this.modificarReserva(reservaId, 
            {
                estado: EstadoReserva.CANCELADA
            }
        );
      
        // Notificacion de eliminacion
        const factoryNotificacion = new NotificacionDeCancelacion();
        const notificacion = factoryNotificacion.crear(reservaCancelada, motivo);  // Genero la notificacion por eliminacion
        const notificacionHecha = await this.notificacionService.guardarNotificacion(notificacion);
        this.notificacionService.eliminarNotificacionesDeReserva(reserva); // Guardamos la notificacion en la base de datos

        return reserva;
    }

    // Modificar Reserva 
    async modificarReserva(reservaId, datosAModificar){
        return await this.reservaRepository.modificarReserva(reservaId, datosAModificar);
    }

    async confirmarReserva(id) {
        const reserva = await this.reservaRepository.obtenerReservaPorId(id);
        if (!reserva) {
            throw new NotFoundError(`Reserva de id: ${id} no encontrada`);
        }
        
        if (reserva.estado != EstadoReserva.PENDIENTE) {
            throw new ConflictError("Solo se pueden confirmar reservas pendientes o confirmadas");
        }
        
        const reservaConfirmada = await this.modificarReserva(id, 
            {
                estado: EstadoReserva.CONFIRMADA
            }
        );
        
        // Notificacion de confirmacion
        const factoryNotificacion = new NotificacionDeConfirmacion();
        const notificacion = factoryNotificacion.crear(reservaConfirmada, "Se confirmo exitosamente");  // Genero la notificacion por confirmacion
        const notificacionHecha = await this.notificacionService.guardarNotificacion(notificacion); // Guardamos la notificacion en la base de datos
    
        return reservaConfirmada;
}

    // Porque los atributos son privados, entonces necesito un DTO para representarlos simplemente de forma publica
    // DTO = Data Transfer Object
    // El DTO es un objeto que solo tiene los atributos que quiero exponer al exterior
    
    toDTO(reserva) {
        return {
            fechaAlta: reserva.fechaAlta,
            huespedReservador: reserva.huespedReservador,
            cantHuespedes: reserva.cantHuespedes,
            alojamiento: reserva.alojamiento,
            rangoDeFechas: reserva.rangoDeFechas,
            estado: reserva.estado,
            precioPorNoche: reserva.precioPorNoche,
        };
    }

    toDTOAlojamiento(anfitrion, alojamientoDoc){
        return new Alojamiento({
            id: alojamientoDoc._id,
            anfitrion: anfitrion,
            nombreAlojamiento: alojamientoDoc.nombreAlojamiento,
            descripcion: alojamientoDoc.descripcion,
            precioPorNoche: alojamientoDoc.precioPorNoche,
            moneda: alojamientoDoc.moneda,
            horarioCheckIn: alojamientoDoc.horarioCheckIn,
            horarioCheckOut: alojamientoDoc.horarioCheckOut,
            direccion: alojamientoDoc.direccion,
            cantHuespedesMax: alojamientoDoc.cantHuespedesMax,
            caracterisitcas : alojamientoDoc.caracteristicas || [], 
            fotos: alojamientoDoc.fotos || []
          });
    }



}




module.exports = { ReservaService };