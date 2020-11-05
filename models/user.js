const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    nome : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    }, 
    senha : {
        type: String,
        required: true
    }, 
    isactive : {
        type: Boolean,
        default: true
    },
    isadmin : {
        type: Boolean,
        default: false
    },
    data : {
        type : Date,
        default : Date.now

    }
})

module.exports =  mongoose.model('user', UserSchema)

