const mongoose = require('mongoose') //libria u orm para conectarnos con mongodb y hacer consultas,

//definición del esquema
const UserSchema = new mongoose.Schema
({
    username: {type: String, lowercase: true},
    name: {type: String, lowercase: true},
    password: String,
    rol: {type: String, lowercase: true},
})
//funcion pre que se ejecuta antes de que registre un usuario 

module.exports =  mongoose.model('user', UserSchema )