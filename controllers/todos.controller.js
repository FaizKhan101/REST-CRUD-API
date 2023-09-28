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

exports.UpdateTodo = (req, res, next) => {}

exports.deleteTodo = (req, res, next) => {}
