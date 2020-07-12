const node_env = process.env.NODE_ENV || 'development';

const server = {
    test: {
        port: 3001
    },
    development: {
        port: 3000
    },
    production: {
        port: 80
    }
};

const apiMile = 'https://api.mercadolibre.com';

module.exports = {
    server: server[node_env],
    apiMile
};