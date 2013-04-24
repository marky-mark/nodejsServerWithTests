var express = require('express'),
    resource = require('express-resource'),
    app = module.exports = express();
    
require('./db/db-connection.js');    

app.configure(function() {
    app.use(express.bodyParser());
});

var tests = app.resource('test', require('./controller/testController'));

app.listen(3000);
console.log("server started!");