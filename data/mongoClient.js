const {MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config();
var client = new MongoClient(process.env.MONGO_URL)

const main = async () => {
    await client.connect();
}

const insertData = async(collection,data)=>{
    let db = client.db("test");
    let users = db.collection("users");
    let res = await users.insertOne(data);
    console.log(res);
}

main().finally(module.exports = this);






// module.exports = this