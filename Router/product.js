const express = require('express')
const Product = require('../model/Product')
const router = express()
const {productValidation} = require('../validations/validation.js')

router.get('/',async(req,res)=>{
    const products = await Product.find()
    res.json(products)
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

