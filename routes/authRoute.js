const express = require('express')
const route = express.Router()
route.use(express.json())
const authValidator = require('../middleware/authRouteValidator')
const authController = require('../controllers/authController')


route.post('/login', authValidator.validateLogin, async (req,res) => {
    console.log(req.body);
    const result = await authController.login(req.body);
    res.status(result.code).send(result.res);
})

route.post('/signup', authValidator.validateSignup, async (req,res) => {
    const result = await authController.signup(req.body);
    res.status(result.code).send(result.res);
})

route.get('/verify/:uid', async (req,res) => {
    const result = await authController.verifyUser(req.params.uid);
    res.status(result.code).send(result.res);
})

module.exports = route