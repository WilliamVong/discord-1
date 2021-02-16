const mongoose = require('mongoose')
require('mongoose-long')(mongoose);
let Long =  mongoose.Schema.Types.Long
coinsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: Long,
    coins: Number,
    lastclaim: Long, 
});
module.exports = mongoose.model("Coins",coinsSchema)
