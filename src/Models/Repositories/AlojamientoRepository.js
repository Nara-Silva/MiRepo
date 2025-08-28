const { Alojamiento } = require("../Entities/Alojamiento/Alojamiento.js");
const { AlojamientoModel } = require("../Schemas/AlojamientoSchema.js");

class AlojamientoRepository {

    //static alojamientosPath = path.join("data", "alojamiento.json")

    constructor() {
       this.model = AlojamientoModel;
    }

    async obtenerAlojamientos() {
        const alojamientos = await this.model.find();
        return alojamientos;
    }
 
    async obtenerAlojamientosPorQuery(query){
        const alojamientosFiltrados = this.model.find(query)
        return alojamientosFiltrados;
    }
    
    toDTO(alojamiento) {
        return {
            anfitrion: alojamiento.anfitrion,
            nombreAlojamiento: alojamiento.nombre,
            descripcion: alojamiento.descripcion,
            precioPorNoche: alojamiento.precioPorNoche,
            moneda: alojamiento.moneda,
            horarioCheckIn: alojamiento.horarioCheckIn,
            horarioCheckOut: alojamiento.horarioCheckOut,
            direccion: alojamiento.direccion,
            cantHuespedesMax: alojamiento.cantHuespedesMax,
        }
    }

    // ===================================================== //

    async crearAlojamiento(alojamiento) {
        if (alojamiento.id) {
            // Si estás actualizando, devolvés el alojamiento actualizado con el anfitrión populado
            const alojamientoActualizado = await this.model
                .findByIdAndUpdate(alojamiento.id, alojamiento, { new: true })
                .populate('anfitrion'); // <-- Agregás el populate acá
            return alojamientoActualizado;
        } else {
            // Si es nuevo, lo guardás
            const nuevoAlojamiento = new this.model(alojamiento);
            const alojamientoGuardado = await nuevoAlojamiento.save();
    
            return alojamientoGuardado;
        }
    }

    async obtenerAlojamientosPorId(id) {
        const alojamiento = await this.model.findById(id);
        return alojamiento;
    }

    
    // Caso Especifico que lo vamos a usar solo en Reservas. (comentario: no lo modifique porque no me acuerdo para que servia)
    obtenerAlojamientosPorIdEnObjeto(id) {
        const alojamiento =  this.alojamientos.find(alojamiento => alojamiento.id === id);
        return alojamiento ? mapToAlojamiento(alojamiento) : null
    }

    async obtenerAlojamientosPorNombre(nombre) {
        const regex = new RegExp(nombre, 'i'); // 'i' hace que no distinga mayúsculas/minúsculas
        const alojamientos = await this.model.find({ nombreAlojamiento: regex });
        return alojamientos;
    }

    async 

    async buscarConFiltros(query, pagina = 1, limite = 10) {
        const skip = (pagina - 1) * limite;
        const resultados = await this.model.find(query)
            .skip(skip)
            .limit(limite);
        const total = await this.model.countDocuments(query);
        
        return {
            total,
            pagina,
            limite,
            resultados
        };
    }
    
    async obtenerAlojamientosPorUsuario(idUsuario) {
        const alojamientos = await this.model.find({ anfitrion: idUsuario });
        return alojamientos;
    }

    async eliminarAlojamiento(id) {
        const alojamiento = await this.model.findByIdAndDelete(id);
        return alojamiento;
    }

    async modificarAlojamiento(id, alojamientoData) {
        const alojamientoActualizado = await this.model.findByIdAndUpdate(id, alojamientoData, { new: true });
        return alojamientoActualizado;
    }

}


function mapToAlojamientos(alojamientoDatas){
    return alojamientoDatas.map(mapToAlojamiento);
}

function mapToAlojamiento(alojamientoData){
    const alojamiento = new Alojamiento(alojamientoData);
    return alojamiento;
}


module.exports = { AlojamientoRepository }