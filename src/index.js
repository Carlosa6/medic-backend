require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const {creacionRoles} = require('./libs/initialSetup');

const userRoutes = require('./routes/user-routes')


//db
require('./database')
//ejecutar la función que crea los roles
creacionRoles();

const port = process.env.PORT || 4000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//rutas
app.use('/api/users', userRoutes)

app.listen(port, () => console.log('Server on port',port))