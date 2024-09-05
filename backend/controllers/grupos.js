const Grupo = require('../model/Grupo')

const gruposRouter = require('express').Router()

gruposRouter.post("/addGroup", async(req, res) => {
    try{
        const {name} = req.body
        if(name.length > 0){
            const miGrupo = new Grupo({name: name})
            await miGrupo.save()
            res.status(200).send({msg: "Se ha agregado el grupo con éxito."})
        }
    }catch(e){
        res.status(400).send({msg: "Es posible que el nombre del grupo ya esté en uso."})
    }
})


gruposRouter.get("/verGrupos", async(req, res) => {
    const result = await Grupo.find({})
    res.status(200).send(result)
})

module.exports = gruposRouter