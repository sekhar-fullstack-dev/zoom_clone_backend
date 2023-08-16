const findUserObject = (user)=>{
    
    const _u = {
        "email":user.username,
        "name":user.name,
        "profileUrl":user.profileUrl,
        "isFriend":user.isFriend,
        "isMessageExists":false
    }

    const res = {
        "status":200,
        "error_code":"",
        "error_message":"",
        "data":_u
    }

    return res;
}

module.exports = findUserObject;