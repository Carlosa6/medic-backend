require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const {creacionRoles,creacionTipoSangre} = require('./libs/initialSetup');

const userRoutes = require('./routes/user-routes')
const authRoutes = require('./routes/auth-routes')


//db
require('./database')
//ejecutar la función que crea los roles
creacionRoles();
creacionTipoSangre();

const port = process.env.PORT || 4000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//rutas
app.use('/api/users', userRoutes)
app.use('/api/auth',authRoutes)

app.listen(port, () => console.log('Server on port',port))