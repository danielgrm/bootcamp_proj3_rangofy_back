const mongoose = require("mongoose")

const RestoSchema = new mongoose.Schema({
    nome : {
        type: String,
        required: true,
    },
    cozinha : {
        type: String,
    }, 
    endereco : {
        type: String,
        required: true
    }, 
    like : {
        type: Number,
      
    },
    dislike : {
        type: Number,
    },
    userlike: {
        type: [String],
        required: true
    },
    userdislike: {
        type: [String],
        required: true
    },
    
})

module.exports =  mongoose.model('Resto', RestoSchema)
