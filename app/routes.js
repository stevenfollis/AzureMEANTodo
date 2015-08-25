//Model Configuration for our ToDo's
var Todo = require('./models/todo.js');

module.exports = function (app) {
    
    //Route Definitions for the API to process Requests sent and received
    //get all TODOs
    app.get('/api/todos', function (req, res) {
        Todo.find(function (err, todos) {
            //if we get an error send the error
            if (err)
                res.send(err);
            
            res.json(todos); //Return the list of our todos
        });
    });
    
    //Create a new todo and then send back the list of all todos
    app.post('/api/todos', function (req, res) {
        Todo.create({
            text: req.body.text,
            completed: false
        }, function (err, todo) {
            //If create fails send error to client
            if (err)
                res.send(err);
            
            //Return the new document
            res.json(todo._doc);

        });
    });
    
    // Remove a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);
            
            // Get and return all todos after delete is finished
            Todo.find(function (err, todos) {
                
                // If we get an error send the error
                if (err)
                    res.send(err);
                
                res.json(todos); //Return the list of our todos

            });

        });
    });
    
    // Update an existing document
    app.put('/api/todos', function (req, res) {
        
        var todo = req.body;
        
        Todo.update({ _id: todo._id }, { $set: { text: todo.text, completed: todo.completed } }, function (err, todo) {
            console.log('Updated');
            res.send(true);
        });

    });
    
    // Catch all other routes and return the homepage
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

};