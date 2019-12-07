const moongose = require('mongoose');

const TempSchema = new moongose.Schema({
    variable:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    }
});

const User = moongose.model('Pulse', TempSchema);

module.exports = User;