const express = require('express')
const {restart} = require('nodemon')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')


mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('DB connected')
})


app.listen(5000,()=>{
    console.log('Sports is live')
})