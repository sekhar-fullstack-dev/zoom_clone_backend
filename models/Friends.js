const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    friendEmail: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Friend', FriendSchema);