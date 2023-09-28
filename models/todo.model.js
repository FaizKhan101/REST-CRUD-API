const { ObjectId } = require("mongodb");
const db = require("../data/database")

class Todo {
    constructor(text, id) {
        this.text = text;
        this.id = id
    }

    static async getAllTodos() {
        const todoDocuments = db.getDb().collection("todos").find().toArray()
        return todoDocuments.map(todoDocument => {
            return new Todo(todoDocument.text, todoDocument._id)
        })
    }

    save() {
        if (this.id) {
            return db.getDb().collection("todos").updateOne({_id: new ObjectId(this.id)}, { $set: { text: this.text } })
        } else {
            return db.getDb().collection("todos").insertOne({ text: this.text })
        }
    }

    delete() {
        if (!this.id) {
            throw new Error("Trying to delete todo without id!")
        }
        return db.getDb().collection("todos").deleteOne({ _id: new ObjectId(this.id) })
    }
}

module.exports = Todo