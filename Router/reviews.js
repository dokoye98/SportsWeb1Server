const express = require('express')
const router = express.Router()
const Review = require('../model/Review')
const Product = require('../model/Product')
const val = require('../tokenGen')


router.post('/products/:id/reviews', val, async (req, res) => {
    const { text, rating } = req.body

    if (!text || !rating) {
        return res.status(400).json({ message: 'Text and rating are required' })
    }

    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const newReview = new Review({
            text,
            rating,
            productId: req.params.id,
            userId: req.user._id // Get the user ID from the token
        })

        await newReview.save()
        res.status(201).json({ message: 'Review added', review: newReview })
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error })
    }
})

module.exports = router