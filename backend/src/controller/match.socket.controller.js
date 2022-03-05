const ctrlMatchSocket = {},
    Match = require('../model/match'),
    Team = require('../model/team'),
    Player = require('../model/player')

ctrlMatchSocket.start = (io) => {
    io.on("connection", async (socket) => {
        
        socket.on("disconnect", () => {
            console.log("Usuario desconectado " + socket.id);
        });

        socket.on('get',async (data)=>{
            const { _id } = data
            console.log("search match with id: ", data)
            const match = await Match.findOne({_id: _id})
            const teams = await Team.find({})
            const players = await Player.find({})
            const result = {...match._doc}
            const iv = teams.filter(t => String(t._id)===String(match.visitor))
            const il = teams.filter(t => String(t._id)===String(match.locale))
            result["visitor"] = iv[0].name
            result["locale"] = il[0].name
            if(result.best_player !== null){
                const mvp = players.filter(t => String(t._id)===String(result.best_player))
                result["best_player"] = mvp[0].name
            }
            const plays = result.plays.map(it => {
                const item = {...it._doc}
                if(it.team !== null){
                    const tm = teams.filter(t => String(t._id)===String(it.team))
                    item["team"] = tm[0].name
                }
                if(it.player !== null){
                    const pl = players.filter(t => String(t._id)===String(it.player))
                    item["player"] = pl[0].name
                }
                return item
            })
            result["plays"]=plays
            io.emit('match',result)
        })

        socket.on("events", async (data) => {
            const {_id, type, observation, team, v_a_r, v_a_r_result, player, card} = data
            const match = await Match.findOne({_id: _id})
            const plays = [...match.plays]
            switch(type.toLowerCase()){
                case "goal":
                    if(team === String(match.locale)){
                        match.goal_locale += 1
                    }else{
                        match.goal_visitor += 1
                    }
                    break
                case "extra":
                    match.extra = true
                    break
                case "penalties":
                    match.penalties = true
                    break
                case "penal_goal":
                    console.log("llego")
                    if(String(team) === String(match.locale)){
                        console.log("local")
                        match.penal_locale += 1
                    }else{
                        match.penal_visitors += 1
                    }
                    break
                default:
                    break
            }
            plays.push({ type, observation, team, v_a_r, v_a_r_result, player, card })
            match.plays = plays
            await match.save()
            io.emit('match',match)
        })

        console.log("Usuario conectado " + socket.id);

    });
}

module.exports = ctrlMatchSocket