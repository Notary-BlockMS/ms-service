const test = require('tape');
const repository = require('./repository');

 
function runTests(){
 
    var id = null;
 
    test('Repository GetAllServices', (t) => {
        repository.getAllServices((err, services) => {
            if(services && services.length > 0){
                id = services[0]._id;   
                console.log(id);
            }                       
            t.assert(!err && services && services.length > 0, "All Services returned!");
            t.end();
            process.exit(0);
        })
        
    })
    
    /*test('Repository GetServicesById', (t) => {
        if(!id){
            t.assert(true, "Servico by Id Returned");
            t.end();
            return;
        }
    })*/

}

module.exports = { runTests }