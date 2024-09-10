const express = require('express')
const {restart} = require('nodemon')
const app = express()


app.listen(5000,()=>{
    console.log('Sports is live')
})