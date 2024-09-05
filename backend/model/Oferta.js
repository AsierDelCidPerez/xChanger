
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ofertaSchema = new mongoose.Schema({
    origen: {
        type: String,
        required: true,
        ref: 'Grupo'
    },
    destino: {
        type: String,
        required: true,
        ref: 'Grupo'
    },
    fecha: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    correoCreador: {
        type: String,
        required: true
    }
})

ofertaSchema.set('toJSON', {
    transform: (_, reqObj) => {
        reqObj.id = reqObj._id
        delete reqObj._id
        delete reqObj.__v
    }
})

module.exports = mongoose.model('Oferta', ofertaSchema)
