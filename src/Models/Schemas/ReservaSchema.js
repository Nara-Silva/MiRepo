//import mongoose from "mongoose";
const mongoose = require('mongoose');
const { EstadoReserva } = require("../Entities/Enums/Enums.js");
const { Reserva } = require("../Entities/Reservas/Reserva.js");

const reservaSchema = new mongoose.Schema({
    fechaAlta: {
        type: Date,
        required: true,
        trim: true, //elimina espacios en blanco
    },
    huespedReservador: {
        type: String, 
        required: true
    },
    cantHuespedes: {
        type: Number, 
        required: true,
        min: 1
    },
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Alojamiento', // referís al esquema de Alojamiento
        required: true
    },
    rangoDeFechas: {
        fechaInicio:{
            type: Date,
            required: true,
            trim: true, 
        },
        fechaFin:{
            type: Date,
            required: true,
            trim: true, 
        },
    },
    precioPorNoche: {
        type: Number, 
        required: true,
        min: 0
    },
    estado:{
        type: String,
        enum: Object.values(EstadoReserva),
        default: EstadoReserva.PENDIENTE
    }
},  {
        timestamps: true,
        collection: 'reservas' //nombre de la coleccion en mongo
});

reservaSchema.loadClass(Reserva);

//export const ReservaModel = mongoose.model('Reserva', reservaSchema)
// Esto seria con type = "module"

const ReservaModel = mongoose.model('Reserva', reservaSchema);
module.exports = { ReservaModel };
