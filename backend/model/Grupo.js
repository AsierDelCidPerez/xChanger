const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const grupoSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        ref: 'Grupo'
    }
})

grupoSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Grupo', grupoSchema)