//import mongoose from "mongoose";
//import { Notificacion } from "../Entities/Notificacion/Notificacion.js";
// El de arriba seria usando type = "module"

const mongoose = require('mongoose');
const { Notificacion } = require("../Entities/Notificacion/Notificacion.js");
const {ReservaModel} = require("./ReservaSchema.js");

const notificacionSchema = new mongoose.Schema({

    mensaje: {
        type: String,
        required: true,
    },

    usuario: {
        type: String, // Referencia al usuario en keycloak
        required: true,
    },

    fechaAlta: {
        type: Date,
        default: Date.now,
        required: true,
    },

    leida: {
        type: Boolean,
        default: false, // OJO: Revisar
        required: true, 
    },

    fechaLeida: {
        type: Date,
        default: null,
        required: false,
    },
    reserva: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Reserva",
        required: true, 
    }
}, {
    timestamps: true,
});

// Vincular la clase Notificacion con el schema
notificacionSchema.loadClass(Notificacion);

// Exportar el modelo
//export const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);

const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);
module.exports = { NotificacionModel };