const ctrlUser = {},
      User = require('../model/user')

ctrlUser.list = async(req, res) =>{
    const users = await User.find({})//.select("-password")
    res.json(users)
}

ctrlUser.findByName = async(req, res) =>{
    const { search } = req.params
    let s = search.replace("&"," ")
    const user = await User.find({name: { $regex: `^.*${s}.*$`, $options: 'i' } })
    res.json(user)
}

ctrlUser.findById = async(req, res) =>{
    const { _id } = req.params
    const user = await User.find({_id: _id})
    res.json(user)
}


ctrlUser.create = async(req, res) =>{
    const { name, username, password, rol } = req.body
    console.log("create with data: ", req.body)
    const newUser = new User({
        name,
        username, 
        password, 
        rol
    })
    await newUser.save()
    res.json({ status: true })
}

ctrlUser.update = async(req, res) =>{
    const { _id, name, username, password, rol } = req.body
    console.log("update with data: ", req.body)
    User.findOne({ _id: _id }, (err, response)=>{
      response.name = name
      response.username = username
      response.password = password
      response.rol = rol
      response.save()
    })
    res.json({ status: true })
}

ctrlUser.delete = async (req, res) =>{
  const { _id } = req.params
  console.log("delete with id: ", _id)
  await User.findOneAndDelete({ _id: _id})
  res.json({ status: true })
}

module.exports = ctrlUser
      