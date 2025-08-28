const { NotFoundError, ValidationError } = require("../Errors/appErrors.js");
const {TipoUsuario} = require("../Models/Entities/Enums/Enums.js")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

class UsuarioService {

    constructor(usuarioRepository, jwtSecret){ // Cuando manejemos la base de datos, pasaremos el repositorio
        this.usuarioRepository = usuarioRepository; 
        this.JWT_SECRET = jwtSecret;
    }

    async crearUsuarioParaLogin({nombre, email, tipo, password}) {
        if(!email || !nombre || !password || !tipo){
            console.log("Entre a la verificacion de campos");
            throw new ValidationError("Campos faltantes o invalidos para la creacion");
        }
        const usuarioExistente = await this.usuarioRepository.buscarPorEmail(email);
        // console.log("EL USUARIO EXISTENTE ES:", usuarioExistente.email);
        if(usuarioExistente){
          console.log("Entre a la verificacion de usuarioExistente");
          throw new ValidationError("Ya existe un email asociado")
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const nuevoUsuario = {nombre, email, tipo, passwordHash};
        const usuarioCreado = await this.usuarioRepository.crearUsuarioPorLogin(nuevoUsuario);
        console.log("El usuario creado es ", usuarioCreado);
        return {
            id: usuarioCreado.id,
            email: usuarioCreado.email,
            nombre: usuarioCreado.nombre,
          };
    }

    async gestionarLogin({ email, password }) {
        const usuario = await this.usuarioRepository.buscarPorEmail(email);
        console.log("El usuario al ggestionar es", usuario);
        if (!usuario) {
          throw new Error("Credenciales inválidas");
        }
        
        const esPasswordValida = await bcrypt.compare(password, usuario.passwordHash);
        if (!esPasswordValida) {
          throw new Error("Credenciales inválidas");
        }

        const token = jwt.sign(
          {
            sub: usuario._id.toString(),
            nombre: usuario.nombre,
            email: usuario.email,
            tipo: usuario.tipo
          },
          this.JWT_SECRET,
          { expiresIn: "1h" }
        );
    
        return {
          token,
          usuario: {
            nombre: usuario.nombre,
            email: usuario.email,
            tipo: usuario.tipo
          }
        };
    }

    obtenerUsuario(id) {
        const usuario = this.usuarioRepository.buscarPorId(id);
        if (!usuario) {
            throw new NotFoundError(`No se encontró el usuario de id: ${id}`);
        }
        return usuario;
    }

    async crearUsuario(usuario){
        const {nombre, email, tipo} = usuario;
        const tipoUsuarioValido = Object.values(TipoUsuario).includes(tipo);
        if(!nombre || !email || !tipoUsuarioValido){
            throw new ValidationError("Campos faltantes o invalidos para la creacion")
        }
        const usuarioGuardado = await this.usuarioRepository.crearUsuario(usuario); // Guardamos la reserva en la base de datos
        return this.toDTO(usuarioGuardado);
    }

    async eliminarUsuario(id) {
        const usuario = await this.usuarioRepository.buscarPorId(id);
        if (!usuario) {
            throw new NotFoundError(`No se encontró el usuario de id: ${id}`);
        }
        await this.usuarioRepository.eliminarUsuario(id);
    }

    async obtenerUsuarios() {
        const usuarios = await this.usuarioRepository.obtenerUsuarios()
        return usuarios.map(usuario => this.toDTO(usuario));
    }

    

    toDTO(usuarioGuardado) {
    return {
      nombre: usuarioGuardado.nombre,
      email: usuarioGuardado.email,
      tipo: usuarioGuardado.tipo,
    };}

}

module.exports = { UsuarioService };