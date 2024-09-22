const express = require('express')
const router = express()
const User = require('../model/User.js')
const {signUpValidaiton,loginValidation} = require('../validations/validation.js')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')


router.post('/signup',async(req,res)=>{
    const {error} = signUpValidaiton(req.body)
    if(error){
        console.log({message:error})
        return res.status(400).send({message:error['details'][0]['message']})
    }
    const emailCheck = await User.findOne({email:req.body.email})
    const userCheck = await User.findOne({username:req.body.username})
    if(emailCheck || userCheck){
        return res.status(400).send({message:'Email or Username is already in use'})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashfirstname = await bcryptjs.hash(req.body.firstname,salt)
    const hashlastname = await bcryptjs.hash(req.body.lastname,salt)
    const hashpassword = await bcryptjs.hash(req.body.password,salt)
   
    const dataFormat = new User({
        firstname:hashfirstname,
        lastname:hashlastname,
        username:req.body.username,
        email:req.body.email,
        password:hashpassword
    })
    try{
        const newUser = await dataFormat.save()
        console.log('new user added')
        return res.status(200).send({message:'SignUp complete',newUser})
    }catch(err){
        return res.status(400).send({message:err})
    }
   
})


router.post('/login',async(req,res)=>{
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send({message:error})
    }

    const userNameCheck = await User.findOne({username:req.body.username})
    if(!userNameCheck){
        return res.status(400).send({message:'Account does not exist'})
    }

    const passwordCheck  = await bcryptjs.compare(req.body.password,userNameCheck.password)
    if(!passwordCheck){
        return res.status(400).send({message:'Incorrect password'})
    }
    const accessToken = jsonwebtoken.sign({ _id: userNameCheck._id }, process.env.TOKEN, { expiresIn: '1h' })
    const refreshToken = jsonwebtoken.sign({_id:userNameCheck._id}, process.env.REFRESH_TOKEN,{expiresIn: '7h'})

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })

    res.header('auth-token', accessToken).send({ 'auth-token': accessToken })

})


router.post('/refresh-token',(req,res)=>{
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        return res.status(401).send('Access Denied')
    }
    try{
        const verified = jsonwebtoken.verify(refreshToken,process.env.REFRESH_TOKEN)
    

    const newAccessToken = jsonwebtoken.sign({_id:verified._id},process.env.TOKEN,{expiresIn:'1h'})
    res.header('auth-token',newAccessToken).send({'auth-token':newAccessToken})

}catch(err){
        return res.status(400).send({message:'Invalid refresh token'})
    }

})
module.exports = router