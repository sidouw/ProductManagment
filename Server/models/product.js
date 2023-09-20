const {Schema,model,ObjectId} = require('mongoose');

const productSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  ProductType: {
    type: ObjectId,
    ref: 'ProductType',
    required: true
  },
  AssignedAttributes: [
    {
      type: ObjectId,
      ref: 'AssignedAttribute',
    }
  ]
},
{
  timestamps:true
});

module.exports = model('Product', productSchema);
