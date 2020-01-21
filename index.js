require("dotenv-safe").config();
const servicos = require('./api/servicos');
const server = require("./server/server");
const repository = require("./repository/repository");

 
server.start(servicos, repository, (err, app) => { 
    // verbose logging when we are starting the server
    console.log('--- Services Service Connected ---')
});

