const app = require('./app')
require('dotenv').config()


/*
console.log(valorEnc)
const valorDec = decrypt(valorEnc)
console.log(valorDec)
*/

app.listen(process.env.PORT, () => {
    console.log(`URL Backend: http://localhost:${process.env.PORT}`)
})

