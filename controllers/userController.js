const User = require('../models/User')
const Friends = require('../models/Friends');
const log = require('../utils/LogUtil')
const findUserObject = require('../pojo/findUserObject');


this.findUser = async(email,friendEmail)=>{
    try{
        const user = await User.findOne({"username":email});
        const _user = {...user};
        const friend = await Friends.findOne({"email":email,"friendEmail":friendEmail});
        if(!friend){
            const other = await Friends.findOne({"email":friendEmail,"friendEmail":email});
            if(other){
                _user._doc.isFriend = true;
            }
            else{
                _user._doc.isFriend = false;
            }
        }
        else{
            _user._doc.isFriend = true;
        }

        //const result = findUserObject(user);
        return findUserObject(_user._doc);
    }
    catch(e){
        return log(500,e);
    }

}

this.addFriend = async(user)=>{
    return {};
}

module.exports = this;