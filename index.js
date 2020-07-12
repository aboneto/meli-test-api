require('module-alias/register')
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes');
const { server } = require("config");

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression({ level: 6 }));

app.use(routes);

// Error 500
app.use(function(err, req, res, next) {
    console.log(err);

    res.send({
        status: 500,
        message: 'Internal Server Error'
    });
});

const serverApp = app.listen(server.port, () => console.log(`App listening at http://localhost:${server.port}`));
module.exports = serverApp;
module.exports.stop = serverApp.close;