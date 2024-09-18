const express = require('express')
const {restart} = require('nodemon')
const app = express()
const userRouter = require('./Router/user')
const statRouter = require('./Router/stats')
const mongoose = require('mongoose')
require('dotenv/config')
app.use('/account',userRouter)
app.use('/stats',statRouter)



mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('DB connected')
})


app.listen(3000,()=>{
    console.log('Sports is live')
})