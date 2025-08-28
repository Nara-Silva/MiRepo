class RangoFechas {
    constructor({fechaInicio, fechaFin}) {
        this.fechaInicio = new Date(fechaInicio);
        this.fechaFin = new Date(fechaFin);
    }

    superponeCon(otroRango) {
        return this.fechaInicio <= otroRango.fechaFin && this.fechaFin >= otroRango.fechaInicio
    }

    esAnteriorAInicio(fecha) {
        return fecha < this.fechaInicio;
    }

}

module.exports = { RangoFechas }