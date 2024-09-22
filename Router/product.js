const express = require('express')
const Product = require('../model/Product')
const router = express()
const val = require('../tokenGen.js')
const {productValidation} = require('../validations/validation.js')

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
      Stock: req.body.Stock,
      Description: req.body.Description,
      Price: req.body.Price,
      Colours: req.body.Colours
    })
    try {
        const savedProduct = await newProduct.save()
        res.status(201).json({ message: 'Product added successfully', product: savedProduct })
      } catch (error) {
        res.status(500).json({ message: 'Error adding product', error })
      }
    })





    
module.exports = router

