const express = require('express')
const {restart} = require('nodemon')
const app = express()
const userRouter = require('./Route/user')
const mongoose = require('mongoose')
require('dotenv/config')
app.use('/account',userRouter)

app.get('/',async(req,res)=>{
    try{
        const response = await axios.get('http://localhost:5000/api/player-stats')
        res.json(response.data)
    }catch(err){
        res.status(500).json({message:'Flask service not running'})
    }
})


mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('DB connected')
})


app.listen(3000,()=>{
    console.log('Sports is live')
})