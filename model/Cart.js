const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product' 
            },
            quantity: { 
                type: Number, 
                default: 1 
            }
        }
    ],
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Cart', CartSchema)
