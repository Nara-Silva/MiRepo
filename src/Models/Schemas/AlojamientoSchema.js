//import mongoose from "mongoose";
const mongoose = require('mongoose');
const { Moneda } = require("../Entities/Enums/Enums.js");
const { Caracteristica } = require("../Entities/Enums/Enums.js");
const { Alojamiento } = require("../Entities/Alojamiento/Alojamiento.js");
const { UsuarioModel } = require("../Schemas/UsuarioSchema.js");

const alojamientoSchema = new mongoose.Schema({
    anfitrion: {
        type: String, 
        required: true,
    },
    nombreAlojamiento: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String
    },
    precioPorNoche: {
        type: Number,
        min: 0
    },
    moneda: {
        type: String,
        enum: Object.values(Moneda), 
        required: true
    },
    horarioCheckIn: {
        type: String,
        required: true
    },
    horarioCheckOut: {
        type: String,
        required: true
    },
    direccion: {
        calle: String,
        altura: Number,
        ciudad:{
            nombre: String,
            pais:{
                nombre: String,
            }
        },
        latitud: Number,
        longitud: Number,
    },
    cantHuespedesMax: {
        type: Number,
        required: true
    },
    caracteristicas: {
        type: [String],
        enum: Object.values(Caracteristica), 
        required: true
    },
    fotos: [String]
})

alojamientoSchema.loadClass(Alojamiento);

//export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema)

const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);
module.exports = { AlojamientoModel };

