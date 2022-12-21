var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'
const { ObjectId } = require('bson')

async function getDB() {
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1002")
    return db
}

async function getAllCustomers() {
    let db = await getDB()
    let results = await db.collection("customers").find().toArray()
    return results
}

async function insertCustomer(newCustomer) {
    let db = await getDB()
    let id = await db.collection("customers").insertOne(newCustomer)
    return id
}


module.exports = {insertCustomer,getAllCustomers}
