const { default: mongoose } = require("mongoose");

class ReservaController {
    constructor(reservaService, usuarioService) {
        this.reservaService = reservaService;
        this.usuarioService = usuarioService;
    }


    // Aca podemos llamar a los metodos del service.

    // Para crear una reserva
    crearReserva = async (req, res, next) => {
        try {
            console.log("El usuario autentificado es:", req.usuario);
            const huespedReservador = req.usuario.sub;
            const {cantHuespedes, id_alojamiento, fechaInicio, fechaFin} = req.body;
            //console.log(huespedReservador + " " + cantHuespedes + " " + id_alojamiento + " " + fechaInicio + " " + fechaFin);
            const nuevaReserva = await this.reservaService.crearReserva({huespedReservador, cantHuespedes, id_alojamiento, fechaInicio, fechaFin});
            res.status(201).json(nuevaReserva);
        } catch (error) {
            console.log("Entre al error del controller de reserva:", error);
            next(error);
        }
    }

     obtenerReservaPorId = async (req, res, next) => {
        const id = req.params.idReserva;
        //console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "El ID proporcionado no es válido." });
        }
        try {
            const reserva = await this.reservaService.obtenerReservaPorId(id);
            if (!reserva) {
                return res.status(404).json({ error: "No se encontró reserva para el ID proporcionado." });
            }
            res.status(200).json(reserva);
        } catch (error) {
            next(error);
        }
    }

    async obtenerReservas(req, res, next) {
        const reservas = await this.reservaService.obtenerReservas();
        res.json(reservas);
    }

    async obtenerHistorialReservas(req, res, next) {
        console.log("Se entro al controller de historial de reservas", req.usuario);
        const id = req.usuario.sub;
        console.log("ID recibido del token:", id);
        try {
            const historial = await this.reservaService.obtenerHistorialPorId(id);
            console.log("Historial devuelto:", historial);
            return res.status(200).json(historial);
        } catch (error) {
            console.log("Rompi en en el historial por reservas");
            next(error);
        }
    }


    async cancelarReserva(req, res, next) {
        const id = req.params.id;
        const motivo = "No hay motivo"; //req.body.motivo?.trim() ||
        try {
            const reservaCancelada = await this.reservaService.cancelarReserva(id, motivo);
        
            res.status(200).json({
                message: "Reserva cancelada correctamente",
                reserva: reservaCancelada
            });
        } catch (error) {
            next(error);
        }
        
    }


    async modificarReserva(req, res, next) {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "El ID proporcionado no es válido." });
        }
    
        try {
            const reservaModificada = this.reservaService.modificarReserva(id, req.body);
            if(!reservaModificada){
                return res.status(404).json({ error: "No se encontró historial de reservas para el ID proporcionado." });
            }
            res.status(200).json(reservaModificada);
        } catch (error) {
            next(error);
        }
    }

    async confirmarReserva(req, res, next){
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "El ID proporcionado no es válido." });
        }
    
        try {
            const reservaConfirmada = await this.reservaService.confirmarReserva(id);
            if(!reservaConfirmada){
                return res.status(404).json({ error: "No se encontró historial de reservas para el ID proporcionado." });
            }
            res.status(200).json(reservaConfirmada);
        } catch (error) {
            next(error);
        }
    }

    async obtenerFechasOcupadasPorAlojamiento(req, res, next) {
        const idAlojamiento = req.params.idAlojamiento;
        //console.log(idAlojamiento);
        if (!mongoose.Types.ObjectId.isValid(idAlojamiento)) {
            return res.status(400).json({ error: "El ID de alojamiento proporcionado no es válido." });
        }
    
        try {
            const fechasOcupadas = await this.reservaService.obtenerFechasOcupadasPorAlojamiento(idAlojamiento);
            //console.log(fechasOcupadas)
            res.status(200).json(fechasOcupadas);
        } catch (error) {
            next(error);
        }
    }


}

module.exports = { ReservaController };