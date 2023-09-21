const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing product
router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Find all products 
router.get('/',async (req,res)=>{
    try {
        const products =await Product.find()
        if(! products){
            return  res.status(500).send({error:'Server Error'})
        }
        res.send(products)
    } catch (error) {
        res.status(500).send({error})
    }
})

module.exports = router;