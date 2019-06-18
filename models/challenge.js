const mongoose = require("mongoose")
const Schema = mongoose.Schema

const challengeSchema = new Schema({

    name: String,
    description: String,
    points: Number,
    level: Number

})

const Challenge = mongoose.model('challenge', challengeSchema)

module.exports = Challenge