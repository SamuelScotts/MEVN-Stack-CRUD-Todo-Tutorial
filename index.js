const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// UTILISE CORS:
app.use(cors());

// UTILISE BODY-PARSER:
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CONNECT TO MONGODB:
mongoose.connect("mongodb://localhost:27017/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on('open', () => {
    console.log('Connected to mongoDB');
});

db.on('error', (error) => {
    console.log(error);
});

// IMPORT SCHEMA AS MODEL
const todoModel = require('./todo_schema');

// CREATE A TODO:
app.post('/todo/add', (req, res, next) => {
    let newTodo = new todoModel;

    newTodo.title = req.body.todo;
    newTodo.complete = false;
    newTodo.save((err) => {
        if (err) {
            res.send("Error while adding todo");
        } else {
            res.send("Todo added!");
        };
    });
});

// FETCH THE COMPLETED TODOS:
app.get('/todo/completed', (req, res, next) => {
    todoModel.find({completed: true}, (err, todos) => {
        if (err) {
            res.send("Error while fetching completed todos.");
        } else {
            res.json(todos);
        };
    });
});

// FETCH THE UNCOMPLETED TODOS:
app.get('/todo/uncompleted', (req, res, next) => {
    todoModel.find({completed:false},(err, todos) => {
        if (err) {
        res.send("Error while fetching uncompleted todos.");
        } else {
        res.json(todos)
        };
    });
});

// UPDATE A TODO:
app.post('/todo/complete/:id', (req, res, next) => {
    todoModel.findById(req.params.id, {complete: true}, (err, todo) => {
        if (!err) {
            res.send("Todo updated!");
        };
    });
});

// DELETE A TODO:
app.delete('/todo/:id', (req, res, next) => {
    let query = { _id: req.params.id };
    todoModel.deleteOne(query, (err) => {
        if (err) {
            res.send("Error when deleting todo!");
        } else {
            res.send("Todo was deleted!");
        };
    });
});

// START SERVER USING EXPRESS:
app.listen(3000, () => {
    console.log("Server started on port 3000");
   });