const mongoose = require('mongoose') //libria u orm para conectarnos con mongodb y hacer consultas,

//definición del esquema
const TeamSchema = new mongoose.Schema
({
    name: { type: String, lowercase: true },
    players: [
        mongoose.Types.ObjectId
    ],
    locale_uniform: { type: String, lowercase: true },
    visitor_uniform: { type: String, lowercase: true },
    formation: String
})
//funcion pre que se ejecuta antes de que registre un usuario 

module.exports =  mongoose.model('team', TeamSchema )