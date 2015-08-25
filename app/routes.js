// Model for the todo
var Todo = require('./models/todo.js');

module.exports = function (app) {
    
    // GET all todos
    app.get('/api/todos', function (req, res) {
        Todo.find(function (err, todos) {
            // Return all todos
            res.json(todos); 
        });
    });
    
    // POST to create a new todo 
    app.post('/api/todos', function (req, res) {
        Todo.create({
            text: req.body.text,
            completed: false
        }, function (err, todo) {
            
            //Return the new document
            res.json(todo._doc);

        });
    });
    
    // DELETE to remove a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            
            res.send(true);

        });
    });
    
    // PUT to update an existing document
    app.put('/api/todos', function (req, res) {
        
        var todo = req.body;
        
        Todo.update({ _id: todo._id }, { $set: { text: todo.text, completed: todo.completed } }, function (err, todo) {
            console.log('Updated');
            res.send(true);
        });

    });
    
    // Catch all other routes and return the app's homepage
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

};