
const ofertasRouter = require('express').Router()
const Oferta = require('../model/Oferta')
const Grupo = require('../model/Grupo')
const { enviarMensaje } = require('./email')


const inscribirmeEnOferta = async (id, email, req, res) => { // El origen y destino son de interés
    try{
        console.log(id)
        const ofert = await Oferta.findById(id)
        console.log(ofert)
        enviarMensaje(email, ofert.correoCreador, ofert.origen, ofert.destino)
        await Oferta.findByIdAndDelete(id)
        res.status(200).send({msg: "Te has inscrito a una oferta satisfactoriamente."})
    }catch(e) {
        console.log(e)
        res.status(400).send({msg: "Ha ocurrido un error inesperado en el servidor."})
    }
}

const validador = async (email, origen, destino) => {
    const res1 = await Grupo.find({name: origen})
    console.log(res1)
    const res2 = await Grupo.find({name: destino})
    console.log(res1)

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return regex.test(email) & res1.length > 0 & res2.length > 0
}

ofertasRouter.post("/addOferta", async(req, res) => { // En la BBDD se almacenan las ofertas según el interés de las personas
    const {email, origen, destino} = req.body
    const resultados = await Oferta.find({origen: destino, destino: origen})
    if(!(await validador(email, origen, destino))) {
        res.status(400).send({msg: "Los datos son incorrectos o no se ajustan al formato exigido"})
    }
    const results = await Oferta.find({origen, destino, correoCreador: email})
    if(results.length > 0){
        res.status(400).send({msg: "Ya tiene creada una oferta así"})
        return
    }

    if(resultados.length > 0){
        const valor = resultados[0]
        console.log(valor)
        inscribirmeEnOferta(valor.id, email, req, res)
    }else{
        const myOferta = new Oferta({
            correoCreador: email,
            destino,
            origen,
            fecha: new Date()
        })
        await myOferta.save()

        const resu = await Oferta.findOne({origen, destino, correoCreador: email})

        res.status(200).send({msg: "La oferta ha sido creada satisfactoriamente", oferta: {origen, destino, id: resu.id}})
        }
})

ofertasRouter.post("/inscribirse", async(req, res) => {
    const {id, email} = req.body
    inscribirmeEnOferta(id, email, req, res)
       
})

ofertasRouter.get("/verOfertas", async(req, res) => {
    const result = await Oferta.find({}).sort("-fecha")
    let resultados = []
    result.forEach(row => {
        let obj = row
        obj.correoCreador = undefined
        resultados.push(obj)
    })
    res.status(200).send(resultados)
})

module.exports = ofertasRouter