const express = require('express');
const router = express.Router();
const ProductType = require('../models/ProductType');

// Create a new product type
router.post('/', async (req, res) => {
  try {
    const productType = new ProductType(req.body);
    await productType.save();
    res.status(201).json(productType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing product type
router.patch('/', async (req, res) => {
  console.log(req.body);
  try {
    const updatedProductType = await ProductType.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.json(updatedProductType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Find all product types 
router.get('/',async (req,res)=>{
    try {
        const productTypes = await ProductType.find().populate('Attributes')
        if(! productTypes){
            return  res.status(500).send({error:'Server Error'})
        }
        res.send(productTypes)
    } catch (error) {
        res.status(500).send({error})
    }
})
module.exports = router;
