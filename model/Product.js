const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    Stock:{
        type:Number,
        Required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        Required:true
    },
    Colours:{
        type:[String],
        required:true
    }
},
{
    versionKey:false
})


module.exports = mongoose.model('Product',ProductSchema)