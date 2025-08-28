const express = require('express');
const { swaggerUi, swaggerSpec } = require('./Config/swagger.js');
const session = require('express-session');
const cors = require('cors');

class Server {
  #controllers = {};
  #routes = []
  #app;

  constructor(app, port) {
    this.#app = app;
    this.port = port;
    this.#app.use(express.json());

    const memoryStore = new session.MemoryStore();
    this.#app.use(
      session({
        secret: 'clave-secreta', // Cambia esto por una clave segura
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
      })
    );
    // Cors se usa como mecanismo de seguridad para pasar cosas del front al back o solicitudes entre != dominios
    const corsOptions = {
      origin: 'https://birbnbgrupo4.netlify.app',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: false,
    };
    this.#app.use(cors(corsOptions));
  
    // Middleware para parsear JSON
    this.#app.use(express.json());
  }

  get app(){
    return this.#app;
  }

  setController(controllerClass, controller) {
    this.#controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Controller missing for the given route.");
    }
    return controller;
  }

  configureRoutes() {
    this.#routes.forEach(routeFactory => {
      const router = routeFactory(this.getController.bind(this));
      this.#app.use('/', router);
    });
  }
  
  addRoute(route) {
    this.#routes.push(route)
}


  launch() {
    this.#app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }
}

module.exports = { Server };