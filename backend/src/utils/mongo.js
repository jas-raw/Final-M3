const mongoose = require('mongoose')

function ToObjectId(id){
    return new mongoose.Types.ObjectId(id);
}

module.exports = {
    ToObjectId
}