const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'Shows Api',
        description: 'Shows Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/shows.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
