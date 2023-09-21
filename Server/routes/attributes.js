const express = require('express');
const router = express.Router();
const Attribute = require('../models/attribute');


// Create a new attribute
router.post('/', async (req, res) => {
  try {
    const attribute = new Attribute(req.body);
    await attribute.save();
    res.status(201).json(attribute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing attribute
router.patch('/:id', async (req, res) => {
  try {
    const updatedAttribute = await Attribute.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedAttribute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Find all attributes 
router.get('/',async (req,res)=>{
    try {
        const attributes =await Attribute.find()
        if(! attributes){
            return  res.status(500).send({error:'Server Error'})
        }
        res.send(attributes)
    } catch (error) {
        res.status(500).send({error})
    }
})

module.exports = router;