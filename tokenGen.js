const jsonwebtoken = require('jsonwebtoken')

function val(req,res,next){

    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({message:'Access Denied'})
    }
    try{
        const verified = jsonwebtoken.verify(token, process.env.TOKEN)
        req.user = verified
        next()
    }catch(err){
        return res.status(401).send({message:err})
    }
}
module.exports = val