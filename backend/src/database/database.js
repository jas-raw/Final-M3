const mongoose = require('mongoose'),
      config = require('../config/config')
      
//conectarnos a la base de datos
mongoose.connect(config.Urldb)
 .then(db => console.log("Connect to DB"))
 .catch(err => console.log(err))

module.exports = mongoose

