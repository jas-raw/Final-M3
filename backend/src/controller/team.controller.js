const ctrlTeam = {},
    Team = require('../model/team')
    Player = require('../model/player')

ctrlTeam.list = async(req, res) =>{
    const teams = await Team.find({})//.select("-password")
    const players = await Player.find({})
    const result = teams.map((it) => {
        const item = {...it._doc}
        const iv = it.players.map(it => {
            const p = players.filter(p => String(p._id) === String(it))
            return p[0].name
        })
        item.players = iv
        return item
    })
    res.json(result)
}

ctrlTeam.findByName = async(req, res) =>{
    const { search } = req.params
    let s = search.replace("&"," ")
    const team = await Team.find({name: { $regex: `^.*${s}.*$`, $options: 'i' } })
    res.json(team)
}

ctrlTeam.findById = async(req, res) =>{
    const { _id } = req.params
    const team = await Team.findOne({_id: _id})
    const players = await Player.find({})
    const result = {...team._doc}
    result.players = team.players.map(it => {
        const p = players.filter(p => String(p._id) === String(it))
        return p[0].name
    })
    res.json(result)
}


ctrlTeam.create = async(req, res) =>{
    const { name, locale_uniform, visitor_uniform, formation } = req.body
    console.log("create with data: ", req.body)
    const newTeam = new Team({
        name, players: [], locale_uniform, visitor_uniform, formation
    })
    await newTeam.save()
    res.json({ status: true })
}

ctrlTeam.update = async(req, res) =>{
    const { _id, name, players, locale_uniform, visitor_uniform, formation } = req.body
    console.log("update with data: ", req.body)
    Team.findOne({ _id: _id }, (err, response)=>{
        response.name = name
        response.locale_uniform = locale_uniform
        response.visitor_uniform = visitor_uniform
        response.formation = formation
        response.save()
    })
    res.json({ status: true })
}

ctrlTeam.addPlayer = async(req, res) =>{
    const { _id, player } = req.body
    console.log("update with data: ", req.body)
    Team.findOne({ _id: _id }, (err, response)=>{
        const p = [...response.players]
        p.push(player)
        response.players = p
        response.save()
    })
    res.json({ status: true })
}

ctrlTeam.removePlayer = async(req, res) =>{
    const { _id, player } = req.body
    console.log("update with data: ", req.body)
    Team.findOne({ _id: _id }, (err, response)=>{
        const p = [...response.players]
        p.splice(p.indexOf(player), 1)
        response.players = p
        response.save()
    })
    res.json({ status: true })
}

ctrlTeam.delete = async (req, res) =>{
    const { _id } = req.params
    console.log("delete with id: ", _id)
    await Team.findOneAndDelete({ _id: _id})
    res.json({ status: true })
}

module.exports = ctrlTeam