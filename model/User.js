const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    firstname:{
        type:String,
        required:true,
        min:6,
        max:256
    },
    lastname:{
        type:String,
        required:true,
        min:6,
        max:256
    },
    username:{
        type:String,
        required:true,
        min:6,
        max:256
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:256
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1056
    },
    cart:[
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ]
}
)

module.exports = mongoose.model('users',UserSchema)