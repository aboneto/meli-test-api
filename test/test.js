'use strict'
const fs = require('fs');
const nock = require('nock');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const {
    apiMile
} = require('../config');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Unit Test mile-test-api', () =>  {

    beforeEach(() => {

        nock(apiMile)
            .get(`/sites/MLA/search?q=Macbook%20Pro`)
            .reply(200, function (uri, requestBody, cb) {
                fs.readFile(__dirname + '/search.json', cb);
            }, {
                'Content-Type': 'application/json',
            });

        nock(apiMile)
            .get(`/items/MLA825587109`)
            .reply(200, function (uri, requestBody, cb) {
                fs.readFile(__dirname + '/item.json', cb);
            }, {
                'Content-Type': 'application/json',
            });

        nock(apiMile)
            .get(`/items/MLA825587109/description`)
            .reply(200, function (uri, requestBody, cb) {
                fs.readFile(__dirname + '/item-description.json', cb);
            }, {
                'Content-Type': 'application/json',
            });

    });

    it("Search", (done) => {
        chai.request(app)
            .get('/api/items?q=Macbook%20Pro')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                chai.expect(res.body).to.not.have.property('status');
                done();
            });
    });

    it("Product Detail", (done) => {
        chai.request(app)
            .get('/api/items/MLA825587109')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                chai.expect(res.body).to.not.have.property('status');
                done();
            });
    });

});

