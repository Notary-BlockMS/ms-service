const test = require('tape');
const supertest = require('supertest');
const servicos = require('./servicos');
const server = require("../server/server");
const repository = require("../repository/repository");


function runTests() {
    var app = null;
    server.start(servicos, repository, (err,app) => {
        var id = null;
        test('GET /servicos', (t) => {
            supertest(app)
            .get('/servicos')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(res.body && res.body.servicos.length > 0) id = res.body.servicos[0]._id;
                t.error(err, 'No errors')
                t.assert(res.body && res.body.servicos.length > 0, "All Services returned!")
                t.end()
            })
        })

        test('GET /servicos/:id', (t) => {

            if(!id) {
                t.assert(false, "Servico by Id Returned");
                t.end();
                return;
            }
 
            supertest(app)
                .get('/servicos/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Servicos By Id returned")
                    t.end()  
                })
        })

        test('DELETE /servicos/:id', (t) => {

            if(!id) {
                t.assert(false, "Client deleted By Id");
                t.end();
                return;
            }
 
            supertest(app)
                .delete('/servicos/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Client deleted By Id")
                    t.end()  
                })
        })

        test('PUT /servicos/:id', (t) => {

            if(!id) {
                t.assert(false, "Client updated By Id");
                t.end();
                return;
            }
 
            supertest(app)
                .put('/servicos/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Client updated By Id")
                    t.end()  
                    process.exit(0);
                })
        })



    })
}

module.exports = {runTests}