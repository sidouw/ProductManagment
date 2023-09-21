const express = require('express');
const router = express.Router();
const AttributeValue = require('../models/attributeValue');



// Create a new attributeValue
router.post('/', async (req, res) => {
  try {
    const attributeValue = new AttributeValue(req.body);
    await attributeValue.save();
    res.status(201).json(attributeValue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing attributeValue
router.patch('/:id', async (req, res) => {
  try {
    const updatedAttribute = await AttributeValue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedAttribute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Find all attributeValues 
router.get('/',async (req,res)=>{
    try {
        const attributeValues =await AttributeValue.find()
        if(! attributeValues){
            return  res.status(500).send({error:'Server Error'})
        }
        res.send(attributeValues)
    } catch (error) {
        res.status(500).send({error})
    }
})

// Find attributeValues of type
router.get('/:type',async (req,res)=>{

    const allowedTypes = ['text', 'boolean', 'date', 'select', 'multiselect']
    const valueType =req.params.type.toLowerCase()
    const isValid = allowedTypes.includes(valueType)

    if (!(isValid)) 
        return res.status(400).send({error:'Invalid attribute value type '})

    console.log(valueType+ "************");
    const field =   ['text','select', 'multiselect'].includes(valueType) ? "Name" : 
                    valueType === 'boolean' ? 'Boolean' : 'Date'

    try {
        const attributeValues =await AttributeValue.find({[field]:{$exists:true}})
        if(! attributeValues){
            return  res.status(500).send({error:'Server Error'})
        }
        res.send(attributeValues)
    } catch (error) {
        res.status(500).send({error})
    }
})

module.exports = router;