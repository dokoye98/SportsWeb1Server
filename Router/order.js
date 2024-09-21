const express = require('express')
const Order = require('../model/Order')
const User = require('../model/User')
const router = express()


router.post('/order/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId).populate('cart.productId')
    if (!user) return res.status(404).json({ message: 'User not found' })

    const totalAmount = user.cart.reduce((total, item) => total + item.productId.price * item.quantity, 0)

    const order = new Order({
        userId: user._id,
        products: user.cart.map(item => ({ productId: item.productId._id, quantity: item.quantity })),
        totalAmount
    })

    await order.save()
    user.cart = [] 
    await user.save()

    res.status(201).json({ message: 'Order placed successfully', order })
})

module.exports = router