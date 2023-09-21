require('dotenv').config()
require('../db/mongoose')

const express = require("express");

const cors = require('cors')
const app = express()
const morgan = require('morgan')


app.use(cors())

app.use(express.json());
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));

const productRoutes = require('../routes/products');
const productTypeRoutes = require('../routes/productType');
const attributeRoutes = require('../routes/attributes');
const attributeValuesRoutes = require('../routes/attributeValues');


app.use('/api/products', productRoutes);
app.use('/api/productType', productTypeRoutes);
app.use('/api/attributes', attributeRoutes);
app.use('/api/attributeValues', attributeValuesRoutes);




app.listen(process.env.PORT,()=>{
    console.log('Server Started at 127.0.0.1:'+process.env.PORT);
})

