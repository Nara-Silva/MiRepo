const express = require('express'); 
const { AlojamientoController } = require('../Controllers/AlojamientoController');
const authMiddleware = require('../Middlewares/authMiddleware.js');

function alojamientoRoutes(getController){
    const router = express.Router()

// 1) Para ver alojamientos 
// Listar alojamientos disponibles, con la posibilidad de aplicar filtros

    router.get("/alojamientos/lugares", (req, res, next) =>{
        getController(AlojamientoController).obtenerPaisesYCiudades(req, res, next);
    });

    router.get("/alojamientosPrueba/usuarios", authMiddleware , async (req, res, next) => {
        getController(AlojamientoController).obtenerAlojamientosPorUsuario(req, res, next);
    });
    
    router.get("/alojamientos/:id", (req, res, next) => {
        getController(AlojamientoController).obtenerAlojamientosPorId(req, res, next);
    });     

    router.get("/alojamientos", (req, res, next) => {
        getController(AlojamientoController).buscarAlojamientos(req, res, next);
    });   


    router.delete("/alojamientos/:id", (req, res, next) => {
        const controller = getController(AlojamientoController);
        controller.eliminarAlojamiento(req, res, next);
    });

    router.patch("/alojamientos/:id", (req, res, next) => {
        const controller = getController(AlojamientoController);
        controller.modificarAlojamiento(req, res, next);
    });

// 1.1) Para ver un alojamiento en especifico
    
// 2) Para crear alojamientos

    router.post("/alojamientos", authMiddleware , async (req, res, next) => {
        const controller = getController(AlojamientoController);
        controller.crearAlojamiento(req, res, next);
    });

    
    return router;
}

module.exports = { alojamientoRoutes };