const mongoose = require('mongoose')

const StatSchema = mongoose.Schema({

    season:{
        type:String,
        required:true
    },
    points: { 
        type: Number, 
        required: true 
    },
    assists: { 
        type: Number, 
        required: true 
    },
    rebounds: { 
        type: Number, 
        required: true 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model('stats',StatSchema)