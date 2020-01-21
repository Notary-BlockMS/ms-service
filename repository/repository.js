const mongodb = require("../config/mongodb")

function getAllServices(callback){
    mongodb.connect((err, db) => {
        db.collection("services").find().toArray(callback);
    })
}

function getServicesById(id, callback){
    mongodb.connect((err, db) => {
        db.collection("services").findOne({
            _id: require("mongodb").ObjectId(id)}, callback);
    });
}

function insertServico(servico, callback){
    mongodb.connect((err, db) => {
        db.collection("services").insertOne(servico, callback)
    });
}

function deleteServico(id, callback){
    mongodb.connect((err, db) => {
        db.collection("services").deleteOne({
            _id: require("mongodb").ObjectId(id)}, callback)
    });
}

function updateServico(id, servico, callback){
    mongodb.connect((err, db) => {
        db.collection("services").updateOne({
            _id: require("mongodb").ObjectId(id)}, servico, callback)
    });
}

function patchServico(id, updates, callback){
    mongodb.connect((err, db) => {
        db.collection("services").updateOne({
            _id: require("mongodb").ObjectId(id)}, {$set: updates}, callback)
    });
}

function disconnect() {
    return mongodb.disconnect();
}

module.exports = {getAllServices, getServicesById, disconnect, insertServico, deleteServico, patchServico, updateServico}