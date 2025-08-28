const { EstadoReserva } = require("../Entities/Enums/Enums.js");
const { ReservaModel } = require("../Schemas/ReservaSchema.js");
const { reserva } = require("../../Models/Entities/Reservas/Reserva.js")


class ReservaRepository { // BASE DE DATOS SIMULADA EN MEMORIA
    
    //static reservasPath = path.join("data", "reservas.json")
    
    constructor() {
        this.model = ReservaModel;
    }

    async guardarReserva(reserva) {
        if (reserva.id) {
            const reservaActualizada = await this.model.findByIdAndUpdate(reserva.id, reserva, { new: true });
            return reservaActualizada;
        } else {
            const nuevaReserva = new this.model(reserva);
            const reservaGuardada = await nuevaReserva.save();
             return reservaGuardada;
        }
    }
    async obtenerReservas() {
        const reservas = await this.model.find();
        return reservas;
    }
    
    async obtenerReservaPorId(id) {
        const reserva = await this.model.findById(id)
        .populate({
          path: 'alojamiento',
          select: 'anfitrion nombreAlojamiento descripcion precioPorNoche moneda horarioCheckIn horarioCheckOut direccion cantHuespedesMax caracteristicas fotos',
        });
        return reserva;
    }

    async obtenerHistorial(id) {
        console.log("ID recibido en repositorio:", id);
        
        //const objectId = Types.ObjectId(id); // <- conversión segura
        const historial = await this.model.find({ huespedReservador: id });

        console.log("Historial recuperado:", historial);
        return historial;
    }
    
    async eliminarReservaPorId(idReserva){
        const resultado = await this.model.findByIdAndDelete(idReserva).populate('huespedReservador')
        .populate({
            path: 'alojamiento',
            populate: { path: 'anfitrion' }});
        return resultado;
    }

    //async eliminarReserva()

    async modificarReserva(reservaId, datosAModificar){
        const reservaModificada = await this.model.findByIdAndUpdate(
            reservaId,
            { $set: datosAModificar },
            { new: true }
        ).populate({
            path: 'alojamiento',
            populate: { path: 'anfitrion' }});
        return reservaModificada;
    }

    async obtenerReservasPorAlojamientoYRango(idAlojamiento, rango) {
        return await this.model.find({
            alojamiento: idAlojamiento,
            "rangoDeFechas.fechaInicio": { $lte: rango.fechaFin },
            "rangoDeFechas.fechaFin": { $gte: rango.fechaInicio },
            estado: { $ne: "CANCELADA" },
        });
    }

    async obtenerFechasOcupadasPorAlojamiento(idAlojamiento) {
        const reservas = await this.model.find({ alojamiento: idAlojamiento, estado: { $ne: EstadoReserva.CANCELADA } });
        const fechasOcupadas = reservas.map(reserva => ({
            fechaInicio: reserva.rangoDeFechas.fechaInicio,
            fechaFin: reserva.rangoDeFechas.fechaFin
        }));
        return fechasOcupadas;
    }


}

module.exports = { ReservaRepository };