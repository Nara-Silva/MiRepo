const swaggerjsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Birbnb',
    version: '1.0.0',
    description: 'Documentación de la API para el proyecto Birbnb',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./Routes/**/*.js'],
};

const swaggerSpec = swaggerjsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};