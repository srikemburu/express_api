const express = require('express');
const router = express.Router();
const Todos = require('../models/todos.js');

// find all documents
// executes, passing results to callback
router.get('/', (req, res)=>{
    Todos.find({}, (err, foundTodos)=>{
        res.json(foundTodos);
    });
});

router.get('/:id', (req, res)=>{
    Todos.findById(req.params.id, (err, foundTodo)=>{
        res.json(foundTodo);
    });
});

router.delete('/:id', (req, res)=>{
    Todos.findByIdAndRemove(req.params.id, (err, deletedTodo)=>{
        res.json(deletedTodo);
    });
});

//...farther down the page
router.post('/', (req, res)=>{
    Todos.create(req.body, (err, createdTodo)=>{
        res.json(createdTodo); //.json() will send proper headers in response so client knows it's json coming back
    });
});

router.put('/:id', (req, res)=>{
    Todos.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTodo)=>{
        res.json(updatedTodo);
    });
});

module.exports = router;