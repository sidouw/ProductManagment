const express = require('express');
const router = express.Router();
const Attribute = require('../models/attribute');
const AttributeValue = require('../models/attributeValue');

// Create a new attribute
const createAttributeValue = async (attribute)=>{
  const field =   ['text','select', 'multiselect'].includes(attribute.Type) ? "Name" : 
                  attribute.Type === 'boolean' ? 'Boolean' : 'Date'

  const attributeValue = new AttributeValue({[field]:attribute.Value})
  await attributeValue.save()
  return attributeValue
}

router.post('/', async (req, res) => {
  try {
    console.log(req.body);

    const allowedTypes = ['text', 'boolean', 'date', 'select', 'multiselect']
    const valueType =req.body.Type.toLowerCase()
    const isValid = allowedTypes.includes(valueType)

    if (!(isValid)) 
        return res.status(400).send({error:'Invalid attribute value type '})

    const attributeValue = await createAttributeValue(req.body)
    const attribute = new Attribute({Name:req.body.Name,
                                    Type:req.body.Type,
                                    AttributeValue:attributeValue.id});
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
router.get('/populated',async (req,res)=>{
    try {
        const attributes =await Attribute.find().populate('AttributeValue')
        if(! attributes){
            return  res.status(500).send({error:'Server Error'})
        }
        res.send(attributes)
    } catch (error) {
        res.status(500).send({error})
    }
})

module.exports = router;