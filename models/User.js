const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type:String,
        default: ''
    },
    profileUrl:{
        type:String,
        default: ''
    },
    roles: {
        User: {
            type: Number,
            default: 1000
        },
        Editor: Number,
        Admin: Number
    },
    refreshtoken: {
        type: String,
        default: ''
    },
    verified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);