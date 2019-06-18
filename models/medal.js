const mongoose = require("mongoose")
const Schema = mongoose.Schema

const medalSchema = new Schema({

    name: String,
    description: String,
    picture: String

})

const Medal = mongoose.model('medal', medalSchema)

module.exports = Medal