
const { UsuarioController } = require('../Controllers/UsuarioController.js');
const express = require('express');

function usuarioRoutes(getController) {
    const router = express.Router();

    router.post("/usuarios/register", (req,res,next) => {
        const controller = getController(UsuarioController);
        controller.crearUsuarioParaLogin(req, res, next);
    })

    router.post("/usuarios/login", (req,res,next) => {
        const controller = getController(UsuarioController);
        controller.gestionarLogin(req, res, next);
    })

    // 1) Para crear usuarios
    router.post("/usuarios", (req, res, next) => {
        const controller = getController(UsuarioController);
        controller.crearUsuario(req, res, next);
    });

    router.get("/usuarios", (req, res, next) => {
        const controller = getController(UsuarioController);
        controller.obtenerUsuarios(req, res, next);
    });

    // 2) Para eliminar usuarios
    router.delete("/usuarios/:id", (req, res, next) => {
        const controller = getController(UsuarioController);
        controller.eliminarUsuario(req, res, next);
    });

    router.post('/register-user', async (req, res) => {
        const controller = getController(UsuarioController);
        controller.crearUsuario(req ,res, next);
    });

    return router;
}

module.exports = { usuarioRoutes };