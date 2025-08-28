const mongoose = require('mongoose');
const { Usuario } = require('../Entities/Personas/Usuario.js');
const { TipoUsuario } = require('../Entities/Enums/Enums.js');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        enum: Object.values(TipoUsuario), 
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'usuarios' //nombre de la coleccion en mongo
});

usuarioSchema.loadClass(Usuario);

//export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema)

const UsuarioModel = mongoose.model('Usuario', usuarioSchema);
module.exports = { UsuarioModel };