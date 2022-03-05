const ctrlMatch = {},
    Match = require('../model/match'),
    Team = require('../model/team')

const { ToObjectId } = require("../utils/mongo")

ctrlMatch.list = async(req, res) =>{
    const matches = await Match.find({})//.select("-password")
    const teams = await Team.find({})
    const result = matches.map((it) => {
        const item = {...it._doc}
        const iv = teams.filter(t => String(t._id)===String(it.visitor))
        const il = teams.filter(t => String(t._id)===String(it.locale))
        item["visitor"] = iv[0].name
        item["locale"] = il[0].name
        return item
    })
    res.json(result)
}

ctrlMatch.findByName = async(req, res) =>{
    const { search } = req.params
    let s = search.replace("&"," ")
    const match = await Match.find({name: { $regex: `^.*${s}.*$`, $options: 'i' } })
    res.json(match)
}

ctrlMatch.findById = async(req, res) =>{
    const { _id } = req.params
    const match = await Match.find({_id: _id})
    res.json(match)
}


ctrlMatch.create = async(req, res) =>{
    const { visitor, locale, date, speaker, referee, left_side_referee, right_side_referee, extra_referee } = req.body
    console.log("create with data: ", req.body)
    const newMatch = new Match({
        visitor,
        locale,
        date,
        goal_visitor: 0,
        goal_locale: 0,
        extra: false,
        penalties: false,
        penal_visitors: 0,
        penal_locale: 0,
        speaker,
        best_player: null,
        referee,
        left_side_referee,
        right_side_referee,
        extra_referee,
        fans: 0,
        plays: []
    })
    await newMatch.save()
    res.json({ status: true })
}

ctrlMatch.update = async(req, res) =>{
    const { _id, date, speaker, best_player, referee, left_side_referee, right_side_referee, extra_referee, fans } = req.body
    console.log("update with data: ", req.body)
    Match.findOne({ _id: _id }, (err, response)=>{
        response.date = date
        response.speaker = speaker
        response.best_player = best_player
        response.referee = referee
        response.left_side_referee = left_side_referee
        response.right_side_referee = right_side_referee
        response.extra_referee = extra_referee
        response.fans = fans
        response.save()
    })
    res.json({ status: true })
}

ctrlMatch.best = async(req, res) =>{
    const { _id, best_player } = req.body
    console.log("update with data: ", req.body)
    Match.findOne({ _id: _id }, (err, response)=>{
        response.best_player = best_player
        response.save()
    })
    res.json({ status: true })
}

ctrlMatch.fans = async(req, res) =>{
    const { _id, fans } = req.body
    console.log("update with data: ", req.body)
    Match.findOne({ _id: _id }, (err, response)=>{
        response.fans = fans
        response.save()
    })
    res.json({ status: true })
}

ctrlMatch.delete = async (req, res) =>{
    const { _id } = req.params
    console.log("delete with id: ", _id)
    await Match.findOneAndDelete({ _id: _id})
    res.json({ status: true })
    }

module.exports = ctrlMatch