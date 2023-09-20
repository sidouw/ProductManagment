const {Schema,model,ObjectId} = require('mongoose');

const attributeSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    enum: ['text', 'boolean', 'date', 'select', 'multiselect']
  },
  AttributeValue: {
    type: ObjectId,
    ref: 'AttributeValue',
    required: true
  }
},
{
  timestamps:true
});

module.exports = model('Attribute', attributeSchema);
