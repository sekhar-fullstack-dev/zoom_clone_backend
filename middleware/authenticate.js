const jsonwebtoken = require('jsonwebtoken');
const log = require('../utils/LogUtil');




const authenticate = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const user = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(user);
        next();
    }
    catch(e){
        return log(500,e);
    }
    
}

module.exports = authenticate;
