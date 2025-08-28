// const express = require('express');
// const swaggerUiExpress = require('swagger-ui-express');
// const readFile = require('fs/promises');

// const swaggerDocument = JSON.parse(
//   await readFile(
//     new URL('./docs/api-docs.json', import.meta.url)
//   )
// );

// function swaggerRoutes() {
//     const router = express.Router()
//     router.use('/api-docs', swaggerUiExpress.serve)
//     router.get('/api-docs', swaggerUiExpress.setup(swaggerDocument))
//     return router
// }

// module.exports = swaggerRoutes;

const express = require('express');
const swaggerUiExpress = require('swagger-ui-express');
const swaggerDocument = require('../docs/api-docs.json'); 

function swaggerRoutes() {
    const router = express.Router();
    router.use('/api-docs', swaggerUiExpress.serve);
    router.get('/api-docs', swaggerUiExpress.setup(swaggerDocument));
    return router;
}

module.exports = {swaggerRoutes};