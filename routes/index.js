const app = require('express');
const cors = require('middleware/cors');
const catalog = require('controllers/catalog');

const api = app.Router();

// controllers
api.get('/api/items', cors.get, catalog.search);
api.get('/api/items/:id', cors.get, catalog.detail);

// Enable OPTIONS method for all requests
api.use('/', cors.options);

// Error 404
api.use('*', (req, res) => {
    res.send({
        status: 404,
        message: 'Endpoint Not Found'
    });
});

module.exports = api;