class AlojamientoController {
    
    constructor(alojamientoService){
        this.alojamientoService = alojamientoService;
    }

    // Encontrar a todos los alojamientos segun criterios
    async buscarAlojamientos(req, res, next) {
        try {
            const filtros = {
                ciudad: req.query.ciudad,
                latitud: req.query.latitud,
                longitud: req.query.longitud,
                caracteristicas: req.query.caracteristicas ? req.query.caracteristicas.split(',') : [],
                precioMin: req.query.precioMin,
                precioMax: req.query.precioMax,
                huespedes: req.query.huespedes,
                pagina: parseInt(req.query.pagina) || 1,
                limite: parseInt(req.query.limite) || 20,
                moneda: req.query.moneda,
                horarioCheckIn: req.query.horarioCheckIn,
                horarioCheckOut: req.query.horarioCheckOut,
                pais: req.query.pais
            };
            const resultados = await this.alojamientoService.obtenerAlojamientosPorFiltros(filtros);
            res.json(resultados);
        } catch (error) {
            next(error);
        }
    }

    async obtenerAlojamientosPorId(req, res, next) {
        try {
            const id = req.params.id;
            const alojamiento = await this.alojamientoService.obtenerAlojamientosPorId(id);
            res.json(alojamiento);
        } catch (error) {
            next(error);
        }
    }

    crearAlojamiento = async (req, res, next) => {
        try{
            const anfitrion = req.usuario.sub;
            const{ nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax} = req.body
            const nuevoAlojamiento = await this.alojamientoService.crearAlojamiento({anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax})
            res.status(201).json(nuevoAlojamiento);
        }
        catch (error){
            next(error);
        }
    }

    async obtenerPaisesYCiudades(req, res, next) {
        try {
            const paisesYCiudades = await this.alojamientoService.obtenerPaisesYCiudades();
            res.json(paisesYCiudades);
        } catch (error) {
            next(error);
        }
    }

    async obtenerAlojamientosPorUsuario(req, res, next) {
        try {
            const idUsuario = req.usuario.sub;
            //console.log(idUsuario)
            const alojamientos = await this.alojamientoService.obtenerAlojamientosPorUsuario(idUsuario);
            res.json(alojamientos);
        } catch (error) {
            next(error);
        }
    }

    async eliminarAlojamiento(req, res, next) {
        try {
            const id = req.params.id;
            await this.alojamientoService.eliminarAlojamiento(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
    async modificarAlojamiento(req, res, next) {
        try {
            const id = req.params.id;
            const datosActualizados = req.body;
            const alojamientoModificado = await this.alojamientoService.modificarAlojamiento(id, datosActualizados);
            res.json(alojamientoModificado);
        } catch (error) {
            next(error);
        }
    }
    
}


module.exports = { AlojamientoController };

