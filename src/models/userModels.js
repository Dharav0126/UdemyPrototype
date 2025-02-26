const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: [true, "Please enter the name"]
    },

    email :{
        type: String,
        required: [true, "Please enter the email"],
        unique: true
    },

    password :{
        type: String,
        required: true
    },

    role:{
        type:String,
        enum: ['admin', 'tutor', 'student'],
        required: true,
        default: "student"
    },

    profilePhoto:{
        type: String
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;