const cors = require('cors');

const corsOptions = {
    get: cors({
        method: ['GET'],
        origin: '*'
    }),
    all: cors({
        method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        origin: '*'
    }),
    simplePost: cors({
        method: ['POST'],
        origin: '*'
    }),
    options: cors({
        method: ['OPTIONS'],
        origin: '*'
    })
};

module.exports = corsOptions;