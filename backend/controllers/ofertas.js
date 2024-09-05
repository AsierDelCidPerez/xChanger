
const ofertasRouter = require('express').Router()
const Oferta = require('../model/Oferta')
const Grupo = require('../model/Grupo')

const validador = async (email, origen, destino){
    const res1 = await Grupo.findOne({name: origen})
    const res2 = await Grupo.findOne({name: destino})
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return regex.test(email) & res1.length > 0 & res2.length > 0
}

ofertasRouter.post("/addOferta", async(req, res) => { // En la BBDD se almacenan las ofertas según el interés de las personas
    const {email, origen, destino} = req.body
    
    Oferta.
})

export default ofertasRouter