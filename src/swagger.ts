import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'API documentation for my Express app',
    },
    servers: [
      {
        url: 'https://expandify.up.railway.app/', // Update with your server URL
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to your API docs (update as needed)
};

const swaggerSpec = swaggerJSDoc(options);

export {
  swaggerSpec
}
