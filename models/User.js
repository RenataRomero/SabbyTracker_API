const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
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