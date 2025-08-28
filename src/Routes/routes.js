const { reservasRoutes } = require('./reservasRoutes.js');
const { alojamientoRoutes } = require('./alojamientoRoutes.js');
const { notificacionRoutes } = require('./notificacionRoutes.js');
const { usuarioRoutes } = require('./usuarioRoutes.js');
const { swaggerRoutes } = require("./swaggerRoutes.js")

const routes = [
    reservasRoutes,
    alojamientoRoutes,
    notificacionRoutes,
    usuarioRoutes,
    swaggerRoutes
]

module.exports = { routes };
//export default routes;