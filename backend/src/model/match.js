const mongoose = require('mongoose') //libria u orm para conectarnos con mongodb y hacer consultas,

//definición del esquema
const MatchSchema = new mongoose.Schema
({
    visitor: mongoose.Types.ObjectId,
    locale: mongoose.Types.ObjectId,
    date: Date || String,
    goal_visitor: Number,
    goal_locale: Number,
    extra: Boolean,
    penalties: Boolean,
    penal_visitors: Number,
    penal_locale: Number,
    speaker: { type: String, lowercase: true },
    best_player: mongoose.Types.ObjectId || null,
    referee: { type: String, lowercase: true },
    left_side_referee: { type: String, lowercase: true },
    right_side_referee: { type: String, lowercase: true },
    extra_referee: { type: String, lowercase: true },
    fans: Number,
    plays: [
        {
            type: { type: String, lowercase: true },
            observation: String,
            team: mongoose.Types.ObjectId || null,
            v_a_r: Boolean,
            v_a_r_result: String || null,
            player: mongoose.Types.ObjectId || null,
            card: String || null,
        }
    ]
})
//funcion pre que se ejecuta antes de que registre un usuario 

module.exports =  mongoose.model('match', MatchSchema )