const express = require('express');
const router = express.Router()
const addTodo=require('../controller/addTodo')
const allTodo=require('../controller/allTodo')
const deleteTodo=require('../controller/deleteTodo')
const editTodo=require('../controller/editTodo')
const completedTodo=require('../controller/completeTodo')

router.post('/addtodo',addTodo)

router.get('/alltodo',allTodo)

router.delete('/deletetodo/:id',deleteTodo)

router.put('/edittodo',editTodo)

router.put('/completetodo',completedTodo)

module.exports=router