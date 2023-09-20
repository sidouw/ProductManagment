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



app.listen(process.env.PORT,()=>{
    console.log('Server Started at 127.0.0.1:'+process.env.PORT);
})

