const express = require('express')
const User = require('../model/User')
const Product = require('../model/Product')
const router = express()
const val = require('../tokenGen')

router.post('/add', val, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)  
        if (!user) return res.status(404).json({ message: 'User not found' })

        const product = await Product.findById(req.body.productId)
        if (!product) return res.status(404).json({ message: 'Product not found' })

        const cartItem = user.cart.find(item => item.productId.toString() === product._id.toString())

        if (cartItem) {
            cartItem.quantity += req.body.quantity || 1
        } else {
            user.cart.push({ productId: product._id, quantity: req.body.quantity || 1 })
        }

        await user.save()
        res.json(user.cart)
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error })
    }
})

router.get('/',val,async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).populate('cart.productId')
        if (!user) return res.status(404).json({ message: 'User not found' })

        res.json(user.cart)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error })
    }
})
module.exports = router