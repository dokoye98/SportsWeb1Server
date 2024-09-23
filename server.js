const express = require('express')
const {restart} = require('nodemon')
const app = express()
const bodyParser = require('body-parser')
const userRouter = require('./Router/user')
const cartRouter = require('./Router/cart')
const orderRouter = require('./Router/order')
const productRouter = require('./Router/product')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')
app.use(cors())
app.use(bodyParser.json())
const PORT = process.env.PORT  || 5000
app.use('/account',userRouter)
app.use('/store',productRouter)
app.use('/store/order',orderRouter)
app.use('/account/cart',cartRouter)




mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('DB connected')
})


app.listen(PORT,()=>{
    console.log(`Sports is live ${PORT}`)
})