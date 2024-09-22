const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrls: [
        {
            type: String  
        }
    ],
    colours: [String],  
    sizes: [String], 
    averageRating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Product', ProductSchema)
