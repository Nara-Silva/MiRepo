const express = require('express');
const cors = require('cors');
const { Server } = require('./server.js');
require('dotenv').config();
const { MongoDBClient } = require("./Config/database.js");

// Router (rutas)
const {routes} = require('./Routes/routes.js')

// Services
const { ReservaService } = require('./Services/ReservaService.js');
const { UsuarioService } = require('./Services/UsuarioService.js');
const { AlojamientoService } = require('./Services/AlojamientoService.js');
const { NotificacionService } = require('./Services/NotificacionService.js');

// Controllers
const { ReservaController } = require('./Controllers/ReservaController.js');
const { UsuarioController } = require('./Controllers/UsuarioController.js');
const { AlojamientoController } = require('./Controllers/AlojamientoController.js');
const { NotificacionController } = require('./Controllers/NotificacionController.js');

// Repositorios
const { ReservaRepository } = require('./Models/Repositories/ReservaRepository.js');
const { UsuarioRepository } = require('./Models/Repositories/UsuarioRepository.js');
const { AlojamientoRepository } = require('./Models/Repositories/AlojamientoRepository.js');
const { NotificacionRepository } = require('./Models/Repositories/NotificacionRepository.js');

// Modelos Mongoose
const { UsuarioModel } = require('./Models/Schemas/UsuarioSchema.js');
const { AlojamientoModel } = require('./Models/Schemas/AlojamientoSchema.js');
const { ReservaModel } = require('./Models/Schemas/ReservaSchema.js');
const { NotificacionModel } = require('./Models/Schemas/NotificacionSchema.js');
// Instanciar app y servidor


// Función principal
async function main() {
        const app = express();
        const port = process.env.PORT;
        const server = new Server(app, port);
        // app.use(cors());

        await MongoDBClient.connect(); // Esperar a conexión a DB

        // Inyección de dependencias
        const reservaRepo = new ReservaRepository();
        const alojamientoRepo = new AlojamientoRepository();
        const usuarioRepo = new UsuarioRepository();
        const notificacionRepo = new NotificacionRepository();

        const notificacionService = new NotificacionService(notificacionRepo);
        const usuarioService = new UsuarioService(usuarioRepo, process.env.JWT_SECRET);
        const alojamientoService = new AlojamientoService(alojamientoRepo, usuarioService);
        const reservaService = new ReservaService(reservaRepo, alojamientoService, notificacionService);
        
        const reservaController = new ReservaController(reservaService, usuarioService);
        const alojamientoController = new AlojamientoController(alojamientoService);
        const notificacionController = new NotificacionController(notificacionService);
        const usuarioController = new UsuarioController(usuarioService);

        // Cargar datos de prueba en la base
        //await cargarDatosDePrueba(usuarioRepo, alojamientoRepo);

        // Configuración del servidor
        server.setController(ReservaController, reservaController);
        server.setController(AlojamientoController, alojamientoController);
        server.setController(NotificacionController, notificacionController);
        server.setController(UsuarioController, usuarioController);

        routes.forEach(r => {
        server.addRoute(r);
        });

        server.configureRoutes();
        server.launch();

        return app;

}



if (require.main === module) {
        main().then(app => {
            const port = process.env.PORT ;
            app.listen(port, () => console.log(`Servidor escuchando en puerto ${port}`));
        });
}

module.exports = main;

