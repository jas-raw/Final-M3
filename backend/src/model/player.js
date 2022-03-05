const mongoose = require('mongoose') //libria u orm para conectarnos con mongodb y hacer consultas,

//definición del esquema
const PlayerSchema = new mongoose.Schema
({
    name: { type: String, lowercase: true },
    team: mongoose.Types.ObjectId || null,
    position: { type: String, lowercase: true },
    shirt: Number,
    free: Boolean
})
//funcion pre que se ejecuta antes de que registre un usuario 

module.exports =  mongoose.model('player', PlayerSchema )