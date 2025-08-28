const { NotFoundError } = require("../Errors/appErrors");
const { Alojamiento } = require("../Models/Entities/Alojamiento/Alojamiento.js");
const { AlojamientoModel } = require("../Models/Schemas/AlojamientoSchema.js");

class AlojamientoService {
    
    constructor(alojamientoRepository, usuarioService){
        this.alojamientoRepository = alojamientoRepository;
        this.usuarioService = usuarioService;
    }

    async obtenerAlojamientosPorFiltros(criterios = {}) {
        const query = {};

        if (criterios.precioMin || criterios.precioMax) {
            query.precioPorNoche = {};
            if (criterios.precioMin) query.precioPorNoche.$gte = Number(criterios.precioMin);
            if (criterios.precioMax) query.precioPorNoche.$lte = Number(criterios.precioMax);
        }

        if (criterios.huespedes) {
            query.cantHuespedesMax = { $gte: Number(criterios.huespedes) };
        }

        if (criterios.ciudad) {
            query["direccion.ciudad.nombre"] = { $regex: new RegExp(criterios.ciudad, 'i') };
        }

        if(criterios.pais) {
            query["direccion.ciudad.pais.nombre"] = { $regex: new RegExp(criterios.pais, 'i') };
        }

        if (criterios.caracteristicas && criterios.caracteristicas.length > 0) {
            query.caracteristicas = { $all: criterios.caracteristicas };
        }
        
        if(criterios.moneda){
            query.moneda = {$regex: new RegExp(criterios.moneda, 'i')};
        }

        if(criterios.horarioCheckIn){
            query.horarioCheckIn = criterios.horarioCheckIn
        }

        if(criterios.horarioCheckOut){
            query.horarioCheckIn = criterios.horarioCheckOut
        }

        // coordenadas (opcional, por ejemplo, un radio con geonear)

        return await this.alojamientoRepository.buscarConFiltros(query, criterios.pagina, criterios.limite);
    }

    pasarAMayusculaRespetandoGuiones(palabra) {
        return palabra.split('_').map(s => s.toUpperCase()).join('_');
    }


        // Crear los finders para las reservas y que estos se comunicen con los controlers
    async obtenerAlojamientosPorId(id) {
            const alojamientos = await this.alojamientoRepository.obtenerAlojamientosPorId(id)
            if(!alojamientos){
                throw new NotFoundError(`no se encontro alojamiento con id: ${id}`);
            }
            return alojamientos
        }

    async crearAlojamiento(alojamiento) {
        
        const nuevoAlojamiento = await this.alojamientoRepository.crearAlojamiento(alojamiento);
        return nuevoAlojamiento;
    }

    async obtenerPaisesYCiudades(){
        const alojamientos = await this.alojamientoRepository.obtenerAlojamientos();
        const listaPaisesCiudades = await this.crearListaPaisesCiudades(alojamientos)
        return listaPaisesCiudades;
    }

    crearListaPaisesCiudades(alojamientos){
        const listaFormateada = alojamientos.map(a => {
            const ciudad = a.direccion?.ciudad?.nombre;
            const pais = a.direccion?.ciudad?.pais?.nombre;
            return `${ciudad}, ${pais}`;
          });;
          const listaSinDuplicados = [...new Set(listaFormateada)];
          return listaSinDuplicados;
    }

    async obtenerAlojamientosPorUsuario(idUsuario) {
        return await this.alojamientoRepository.obtenerAlojamientosPorUsuario(idUsuario);
    }

    async eliminarAlojamiento(id) {
        const alojamiento = await this.alojamientoRepository.obtenerAlojamientosPorId(id);
        if (!alojamiento) {
            throw new NotFoundError(`No se encontró el alojamiento con id: ${id}`);
        }
        return await this.alojamientoRepository.eliminarAlojamiento(id);
    }

    async modificarAlojamiento(id, alojamientoModificado) {
        const alojamiento = await this.alojamientoRepository.obtenerAlojamientosPorId(id);
        if (!alojamiento) {
            throw new NotFoundError(`No se encontró el alojamiento con id: ${id}`);
        }
        return await this.alojamientoRepository.modificarAlojamiento(id, alojamientoModificado);
    }
}


module.exports = { AlojamientoService };