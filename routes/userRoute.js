const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
route.use(express.json());


route.post('/findUser', async (req, res) =>{
    try{
        const result = await userController.findUser(req.body.email, req.body.friendEmail);
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send();
    }
});

route.post('/addFriend', authenticate, async (req, res) =>{
    try{
        const result = await userController.addFriend(req.body);
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send();
    }
});

module.exports = route;