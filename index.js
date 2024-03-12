require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./connection/db')
const router = require('./Routes/router')
const cartServer = express()
cartServer.use(cors())
cartServer.use(express.json())
cartServer.use(router)
const PORT =3000 || process.env.PORT

cartServer.listen(PORT,()=>{
    console.log(`CART SERVER STARTED AT ${PORT}`);
})
cartServer.get('/',(req,res)=>{
    res.send(`<h1>CART SERVER started....waiting for request......</h1>`)
})