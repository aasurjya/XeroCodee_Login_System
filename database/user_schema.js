const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Please Provide an Email"],
        unique: [true, "Email Exist"]
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('User',  UserSchema);