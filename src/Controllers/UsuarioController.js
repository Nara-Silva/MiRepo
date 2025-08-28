class UsuarioController{
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }

    crearUsuario = async (req, res, next) => {
        try {
            const usuario = req.body;
            const nuevoUsuario = await this.usuarioService.crearUsuario(usuario);
            res.status(201).json(nuevoUsuario);
        }
        catch (error){
            next(error);
        }
    }

    crearUsuarioParaLogin = async (req, res, next) => {
        try{
            const usuario = req.body;
            const nuevoUsuario = await this.usuarioService.crearUsuarioParaLogin(usuario);
            res.status(201).json(nuevoUsuario);
        }catch(error){
            if (error) {
            return res.status(400).json({ message: error.message });
            }
            console.error("Error al registrar usuario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    gestionarLogin = async (req, res, next) => {
        try{
            const usuario = req.body;
            const nuevoUsuario = await this.usuarioService.gestionarLogin(usuario);
            res.status(201).json(nuevoUsuario);
        }catch(error){
            next(error);
        }
    }

    eliminarUsuario = async (req, res, next) => {
        try {
            const id = req.params.id;
            await this.usuarioService.eliminarUsuario(id);
            res.status(204).json(id);
        } catch (error) {
            next(error);
        }
    }

    obtenerUsuarios = async (req, res, next) => {
        try{
            const usuarios = await this.usuarioService.obtenerUsuarios();
            res.status(200).json(usuarios);
        } catch(error){
            next(error);
        }
    }

}

module.exports = { UsuarioController };