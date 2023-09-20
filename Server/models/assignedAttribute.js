const {Schema,model,ObjectId} = require('mongoose');

const productSchema = new Schema({
    AttributeValue: {
      type: ObjectId,
      ref: 'AttributeValue'
  }
},
{
  timestamps:true
});

module.exports = model('AssignedAttribute', productSchema);
