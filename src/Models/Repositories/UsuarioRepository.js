const {UsuarioModel} = require("../Schemas/UsuarioSchema.js")

 class UsuarioRepository {
   
    constructor() {
        this.model = UsuarioModel;
    }

    async crearUsuario(usuario) {
        if(usuario.id){
            const huespedActualizado = await this.model.findByIdAndUpdate(usuario.id, usuario);
            return huespedActualizado;
        }
        else{
            const nuevoHuesped = new this.model(usuario);
            const huespedGuardado = await nuevoHuesped.save(); 
            return huespedGuardado;
        }
    }

    async crearUsuarioPorLogin(nuevoUsuario) {
        const usuarioCreado = new this.model(nuevoUsuario)
        const usuarioGuardado = await usuarioCreado.save();
        return usuarioGuardado;
    }

    async buscarPorEmail(emailRecibido) {
        console.log("El email recibido es:", emailRecibido)
        const usuarioEncontrado = await this.model.findOne({ email: emailRecibido });
        console.log("El usuario enconntrado es:", usuarioEncontrado);
        return usuarioEncontrado;
    }

    // Cambiar
    

    async buscarPorId(id) {
        const usuario = await this.model.findById(id);
        return usuario;
    }

    async eliminarUsuario(id) {
        const usuario = await this.model.findByIdAndDelete(id);
        return usuario;
    }

    async obtenerUsuarios() {
        const usuarios = await this.model.find();
        return usuarios;
    }
}

module.exports = { UsuarioRepository };