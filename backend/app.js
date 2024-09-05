require('express-async-errors')
const express = require('express')
const { default: ofertasRouter } = require('./controllers/ofertas')
const app = express()

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MONGODB"))
app.listen(process.env.PORT, () => {
    console.log(`URL Backend: http://localhost:${process.env.PORT}`)
})

app.use('/api/ofertas', ofertasRouter)
