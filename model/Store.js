const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    Quantity:{
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


module.exports = mongoose.model('store',StoreSchema)