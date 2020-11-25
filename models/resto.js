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
    userlike: [
        {
            email: {
            unique: true,
           type: String,
        //    required: true
          },
        }
        ],
    userdislike: [
        {
          email: {
            type: String,
            unique: true
            // required: true
          }
        }
        ],
    instagram : {
        type: String,
    }, 
})

module.exports =  mongoose.model('Resto', RestoSchema)
