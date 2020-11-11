require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

//db
require('./database')

const port = process.env.PORT || 4000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/', (req,res) => res.send('hello world'));

app.listen(port, () => console.log('Server on port',port))