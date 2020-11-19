require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
//importando las rutas
const userRoutes = require('./routes/user-routes')
const authRoutes = require('./routes/auth-routes')
const fichaMedicaRouter = require('./routes/medica-routes')
const tipoSangreRouter = require('./routes/tipo-sangre-routes')

//db
require('./database')

const port = process.env.PORT || 4000
const corOptions = {
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
}

app.use(morgan('dev'))
app.use(cors(corOptions))
app.use(express.json())

//rutas
app.use('/api/users', cors(corOptions), userRoutes)
app.use('/api/auth', cors(corOptions), authRoutes)
app.use('/api/medic', cors(corOptions), fichaMedicaRouter)
app.use('/api/tipo-sangre', cors(corOptions), tipoSangreRouter)

app.listen(port, () => console.log('Server on port', port))