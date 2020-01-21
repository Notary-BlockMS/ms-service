(function () {
    require("dotenv-safe").load;
    require("./config/mongodb.test").runTests();
    //require("./server/server.test").runTests();
    //require("./repository/repository.test").runTests();
    require("./api/servicos.test").runTests();
})();
