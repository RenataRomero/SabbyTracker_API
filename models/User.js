const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const User = moongose.model('User', UserSchema);

module.exports = User;