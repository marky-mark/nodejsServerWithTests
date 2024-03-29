require('../model/test');

var Test = mongoose.model('Test');

//GET all of the objects in test db
exports.index = function(request, response) {
    Test.find(function (err, test) {
	if (err) {
            console.log('Error storing test: ', err);
            response.send(err);
        } else {
            response.send(test);
        }
        
    });	        
}

//GET for a given id (/test/:test)
exports.show = function(request, response) {
    var query = {
    //because this is the test context (/test) the variable is test NOT id 
        '_id': request.params.test
    }
    
    Test.findOne(query, function (err, test) {
        if (err) {
            console.log('Error storing test: ', err);
            response.send(err);
        } else {
            response.send(test);
        }

    });
}

//POST
exports.create = function(request, response) {
    console.log('posting ' + request.body.name);

    var test = {
        name: request.body.name
    }

    Test.create(test, function (err) {
        if (err) {
            console.log('Error storing test: ', err);
            response.send(err);
        } else {
            response.send(test);
        }
    });
}

//DELETE /test/:test
exports.destroy = function(request, response) {
    console.log('deleting ' + request.params.test);
    
    var query = {
        '_id': request.params.test
    }       

    Test.remove(query, function(err) {
         if (err) {
             console.log('Error finding test: ', err);
             response.send(err);
         } else {
	     response.writeHead(204, {"Content-Type": "application/json"});
	     response.end();
         }
    });    
}

//PUT /
exports.update = function(request, response) {
    console.log('updating ' + request.params.test);
        
    var query = {
        '_id': request.params.test
    }
            
    Test.update(query, {'name': request.body.name}, function(err) {
         if (err) {
             console.log('Error storing test: ', err);
             response.send(err);
         } else {
	     //add the new id 
	     Test.findOne(query, function (err, tests) {
                 if (err)
    	             console.log(tests); 
                 else
	             response.send(tests);
             });   
         }
    });   
}

