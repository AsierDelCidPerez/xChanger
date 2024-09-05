require('express-async-errors')
const mongoose = require('mongoose')
const express = require('express')
const ofertasRouter = require('./controllers/ofertas')
const gruposRouter = require('./controllers/grupos')
const app = express()
const cors = require('cors')
require('dotenv').config()


app.use(cors())

app.use(express.static('build'))

app.use(express.json())
app.use("/api/ofertas", ofertasRouter)
app.use("/api/grupos", gruposRouter)


mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MONGODB"))

module.exports = app