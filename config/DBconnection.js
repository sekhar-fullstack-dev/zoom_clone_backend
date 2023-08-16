const mongoose = require('mongoose');
require('dotenv').config();


const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
        });
        console.log('Connection to Mongo DB has been established');
    }
    catch(e){
        console.error(e);
    }
}

module.exports = connect;