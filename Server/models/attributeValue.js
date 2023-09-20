const {Schema,model} = require('mongoose');

const AttributeValueSchema = new Schema({
  Name: {
    type: String,
  },
  Boolean: {
    type: Boolean,
  },
  Date: {
    type: Date,
  }
},
{
  timestamps:true
});

module.exports = model('AttributeValue', AttributeValueSchema);
