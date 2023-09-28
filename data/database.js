const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient

let _db;
async function initDb() {
    const client = await MongoClient.connect("mongodb://localhost:27017")
    _db = client.db('rest-todos-api')
}

function getDb() {
    if (!_db) {
        throw new Error("Database not connected!")
    }
    return _db
}

module.exports = {
    initDb: initDb,
    getDb: getDb
}