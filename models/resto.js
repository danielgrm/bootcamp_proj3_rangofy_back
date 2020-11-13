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
    userlike: [
        {
           email: {
            type: String,
            required: true
          } 
        }
        
        ],
    userdislike: [
        {
          nome: {
            type: String,
            required: true
          },
          email: {
            type: String,
            required: true
          }
        }
        ],
    instagram : {
        type: String,
    }, 
})

module.exports =  mongoose.model('Resto', RestoSchema)
