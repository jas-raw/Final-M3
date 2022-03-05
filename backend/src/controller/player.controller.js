const ctrlPlayer = {},
    Player = require('../model/player')
    Team = require('../model/team')

ctrlPlayer.list = async(req, res) =>{
    const players = await Player.find({})//.select("-password")
    const teams = await Team.find({})
    const result = players.map((it) => {
        const result = {...it._doc}
        let t
        teams.forEach(el => {
            if(String(el._id) === String(it.team)){
                t = el.name
            }
        });
        result.team = t
        return result
    })
    res.json(result)
}

ctrlPlayer.findByName = async(req, res) =>{
    const { search } = req.params
    let s = search.replace("&"," ")
    const player = await Player.find({name: { $regex: `^.*${s}.*$`, $options: 'i' } })
    res.json(player)
}

ctrlPlayer.findById = async(req, res) =>{
    const { _id } = req.params
    const player = await Player.findOne({_id: _id})
    const teams = await Team.find({})
    const result = {...player._doc}
    let t
    teams.forEach(el => {
        if(String(el._id) === String(player.team)){
            t = el.name
        }
    });
    result.team = t
    res.json(result)
}


ctrlPlayer.create = async(req, res) =>{
    const { name, position, shirt } = req.body
    console.log("create with data: ", req.body)
    const newPlayer = new Player({
        name, team: null, position, shirt, free: true
    })
    await newPlayer.save()
    res.json({ status: true })
}

ctrlPlayer.update = async(req, res) =>{
    const { _id, name, position, shirt, free } = req.body
    console.log("update with data: ", req.body)
    Player.findOne({ _id: _id }, (err, response)=>{
        response.name = name
        response.position = position
        response.shirt = shirt
        response.save()
    })
    res.json({ status: true })
}
    
ctrlPlayer.addTeam = async(req, res) =>{
    const { _id, team } = req.body
    console.log("update with data: ", req.body)
    Player.findOne({ _id: _id }, (err, response)=>{
        response.team = team
        response.free = false
        response.save()
    })
    res.json({ status: true })
}

ctrlPlayer.delete = async (req, res) =>{
    const { _id } = req.params
    console.log("delete with id: ", _id)
    await Player.findOneAndDelete({ _id: _id})
    res.json({ status: true })
    }

module.exports = ctrlPlayer