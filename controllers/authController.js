const User = require('../models/User');
const bcrypt = require('bcrypt');
const log = require('../utils/LogUtil')
const mailingService = require('../services/mailingService');
const ShortUniqueID = require('short-unique-id');
const uid = new ShortUniqueID({length:15});
const jsonwebtoken = require('jsonwebtoken');


const verifyUsers = {};

const getRefreshToken = async (data) => {
    return jsonwebtoken.sign(data, process.env.REFRESH_TOKEN_SECRET);
}

const getAccessToken = async (data) => {
    return jsonwebtoken.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60*60*60})
}


this.signup = async(body) => {
    const {username, password} = body;
    const duplicate = await User.findOne({username : username}).exec();;
    if(duplicate && duplicate.verified) return {code:409,res:{"msg":"user already exists"}};

    try{
        const hashedPw = await bcrypt.hash(password, 10);
        var result;
        if(duplicate && !duplicate.verified){
            result = await User.updateOne({"username":username},{"password":hashedPw})
        }
        else{
            result = await User.create({
                "username": username,
                "password":hashedPw
            });
        }
        const u_id = uid();
        verifyUsers[u_id] = username; 
        const mail = "please verify you email by clicking the link below\n"+ "http://192.168.0.102:3000/api/auth/verify/"+u_id;
        mailingService.sendEmail(username, mail);
        console.log(result);
        return {code:201,res:{'msg':`New user ${username} created`}};
    }catch(err){
        return log(500,err);
    }
}

this.verifyUser = async(u_id) => {
    const username = verifyUsers[u_id];
    if(username){
        try{
            const result = await User.updateOne({"username":username},{"verified":true});
            console.log(result);
            return {code:200,res:{'msg':`user verified successfully. Please go back to login`}};
        }
        catch(err){
            return log(500,err);
        }finally{
            delete verifyUsers[u_id];
        }
    }
    else{
        return {code:400,res:{'msg':`signup request has been expired. Please try to signup again`}};
    }
}

this.login = async (body) => {
    const user = await User.findOne({"username":body.username});
    if(user){
        if (!user.verified) return {code: 401, res:{"msg":"user not verified. Please check your emails and verify user"}};
        const verified = await bcrypt.compare(body.password,user.password);
        if(verified){
            const data = {
                "username":body.username,
                "access":Object.values(user.roles)
            }
            const refresh_token = await getRefreshToken(data);
            const access_token = await getAccessToken(data);
            user.refreshtoken = refresh_token
            user.save();
            return {code:200, res: {"code":200,"error_code":"","error_msg":"","data":{"access_token":access_token, "refresh_token":refresh_token}}};
        }
        else{
            return {code:401, res: {}};
        }
    }
    else
        return {code:1001, res: {"msg":"user not found"}};
    
}

this.accessToken = async(refreshtoken)=>{
    try{
        const data = jsonwebtoken.decode(refreshtoken, process.env.REFRESH_TOKEN_SECRET);
        const user = await user.findOne({"username":data.username});
        if(user && user.refreshtoken === data.refreshtoken){
            delete data['iat'];
            const accessToken = await getAccessToken(data);
            return {code: 200, res: {"access_token": accessToken}}
        }
        else{
            return {code: 404, res:{"msg":"Invalid refresh token"}}
        }
    }
    catch(err){
        return log(500, err);
    }
}


module.exports = this