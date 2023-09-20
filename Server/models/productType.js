const {Schema,model,ObjectId} = require('mongoose');


const productTypeSchema = new Schema({
    Name: {
      type: String,
      required: true
    },
    Attributes: [
      {
        type: ObjectId,
        ref: 'Attribute',
      }
    ]
  },
  {
    timestamps:true
  });


  module.exports = model('ProductType', productTypeSchema);

