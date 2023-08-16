const Joi = require('joi')

const loginSchema = Joi.object({
    username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')).min(4).max(30).required(),
    password: Joi.string().min(8).max(30).required()
})

const signUpSchema = Joi.object({
    username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')).min(4).max(30).required(),
    password: Joi.string().min(8).max(30).required(),
    repeatPassword: Joi.ref('password')
}).with('password', 'repeatPassword')



//validator functions
this.validateLogin = (req,res,next)=>{
    try{
        const val = loginSchema.validate(req.body);
        if(!val.error){
            next()
        }
        else{
            res.status(400).send({msg:val.error.details[0].message})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({msg:"Internal server error"})
    }

}

this.validateSignup = (req,res,next) => {
    try{
        const val = signUpSchema.validate(req.body);
        if(!val.error){
            next()
        }
        else{
            res.status(400).send({msg:val.error.details[0].message})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({msg:"Internal server error"})
    }

}

module.exports = this