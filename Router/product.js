const express = require('express')
const Product = require('../model/Product')
const router = express()
const val = require('../tokenGen.js')
const {productValidation} = require('../validations/validation.js')
const Review = require('../model/Review.js')
router.get('/',async(req,res)=>{
  try{  
  const products = await Product.find()
    res.json(products)
  }catch(err){
    return res.status(500).send({message:'Error fetching products',err})
  }
})

router.get('/:id', async (req, res) => {
  try {
      const product = await Product.findById(req.params.id)
      if (!product) {
          return res.status(404).json({ message: 'Product not found' })
      }
      res.json(product)
  } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error })
  }
})

router.put('/update/:id', async (req, res) => {
  try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
          $set: req.body
      }, { new: true })

      if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' })
      }

      res.json({ message: 'Product updated successfully', product: updatedProduct })
  } catch (error) {
      res.status(500).json({ message: 'Error updating product', error })
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id)

      if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' })
      }

      res.json({ message: 'Product deleted successfully' })
  } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error })
  }
})

router.post('/add', async (req, res) => {
  const { error } = productValidation(req.body)
  if (error) {
      return res.status(400).json({ message: error.details[0].message })
  }

  const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      images: req.body.images,
      colours: req.body.colours,
      sizes: req.body.sizes
  })

  try {
      const savedProduct = await newProduct.save()
      res.status(201).json({ message: 'Product added successfully', product: savedProduct })
  } catch (error) {
      res.status(500).json({ message: 'Error adding product', error })
  }
})



router.get('/:id/reviews', async (req, res) => {
  try {
      const reviews = await Review.find({ productId: req.params.id }).populate('userId', 'username')
      res.json(reviews)
  } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error })
  }
})

router.post('/:id/reviews', val, async (req, res) => {
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
          userId: req.user._id 
      })

      await newReview.save()
      res.status(201).json({ message: 'Review added successfully', review: newReview })
  } catch (error) {
      res.status(500).json({ message: 'Error adding review', error })
  }
})

    
module.exports = router

