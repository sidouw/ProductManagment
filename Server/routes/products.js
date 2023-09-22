const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const AssignedAttribute = require('../models/assignedAttribute');

const createAssignedAttributes = async (attrValues)=>{
  const assignedAttributeIds = [];
      for (const att of attrValues) {
        const assignedAttribute = new AssignedAttribute({ AttributeValue: att });
        const result = await assignedAttribute.save();
        assignedAttributeIds.push(result._id);
      }
   return assignedAttributeIds
}
// Create a new product
router.post('/', async (req, res) => {
  try {
    const assignedAttributes = await createAssignedAttributes(req.body.AssignedAttributes)
    console.log(assignedAttributes);
    const product = new Product({Name:req.body.Name,
                                ProductType:req.body.ProductType,
                                AssignedAttributes:assignedAttributes
                              });
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
          const products = await Product.find()
                                        .populate('ProductType')
                                        .populate({
                                                    path: 'AssignedAttributes',
                                                    model: 'AssignedAttribute',
                                                      populate: [{
                                                          path: 'AttributeValue',
                                                          model: 'AttributeValue'
                                                      }]
                                                })
        if(! products){
            return  res.status(500).send({error:'Server Error'})
        }
        res.send(products)
    } catch (error) {
        res.status(500).send({error})
    }
})

// Find by id
router.get('/:id',async (req,res)=>{
    try {
        const products =await Product.findById(req.params.id)
        if(! products){
            return  res.status(500).send({error:'Server Error'})
        }
        res.send(products)
    } catch (error) {
        res.status(500).send({error})
    }
})

module.exports = router;