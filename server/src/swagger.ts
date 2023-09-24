import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TicTacToe API',
      version: '1.0.0',
      description:
        'Documentation made with <b>swagger-jsdoc, swagger-ui-express</b> modules.'
    },
    host: 'localhost:3000',
    basePath: '/'
  },
  apis: ['./src/routes/**/*.ts']
};

export default swaggerJsdoc(options);
