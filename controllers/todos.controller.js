const Todo = require("../models/todo.model")

exports.getAllTodos = async (req, res, next) => {
    let todos;
    try {
        todos = await Todo.getAllTodos()
    }catch (error) {
        return next(error)
    }
    res.status(200).json({
        todos
    })

}

exports.addTodo = async (req, res, next) => {
    const text = req.body.text;

    const todo = new Todo(text)

    let insertedId;
    try {
        const result = await todo.save()
        insertedId = result.insertedId 
    } catch (error) {
        return next(error)
    }

    todo.id = insertedId

    res.status(200).json({
        message: "Todo added succesfully!",
        createdTodo: todo
    })
}

exports.updateTodo = async (req, res, next) => {
    const todoId = req.params.id
    const newText = req.body.newText

    const todo = new Todo(newText, todoId)
    try{    
        await todo.save()
    }catch (error) {
        return next(error)
    }

    res.status(200).json({
        message: "Updated todo successfully!",
        updatedTodo: todo
    })

}

exports.deleteTodo = async (req, res, next) => {
    const todoId = req.params.id

    const todo = new Todo(null, todoId)

    try {
        await todo.delete()
    } catch (error) {
        return next(error)
    }

    res.status(200).json({
        message: "todo successfully deleted!"
    })
}
