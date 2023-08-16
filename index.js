const express = require('express')
const app = express()
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const mailingService = require('./services/mailingService')
app.use(express.json())
require('dotenv').config()
const connect = require('./config/DBconnection')


connect();



app.get('/',(req, res) =>{
    res.status(200).send({msj:"Welcome"})
});

app.use('/api/auth', authRoute);

app.use('/api/users', userRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`app is listening on ${process.env.PORT}`);
});