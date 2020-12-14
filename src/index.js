require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const app = express()
//importando las rutas
const userRoutes = require('./routes/user-routes')
const authRoutes = require('./routes/auth-routes')
const fichaMedicaRouter = require('./routes/medica-routes')
const tipoSangreRouter = require('./routes/tipo-sangre-routes')
const estadisticasRouter = require('./routes/dashboard-routes')
const rolRoutes = require('./routes/rol-routes')
const discapacidadRoutes = require('./routes/discapacidad-routes')

//db
require('./database')

const port = process.env.PORT || 4000
const corOptions = {
    credentials: true,
    origin: "*",
    optionsSuccessStatus: 200
}

app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))

app.use(morgan('dev'))
app.use(cors(corOptions))
app.use(express.json())

app.all('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    next()

})

//rutas
app.use('/api/users', cors(corOptions), userRoutes)
app.use('/api/auth', cors(corOptions), authRoutes)
app.use('/api/medic', cors(corOptions), fichaMedicaRouter)
app.use('/api/tipo-sangre', cors(corOptions), tipoSangreRouter)
app.use('/api/charts',cors(corOptions), estadisticasRouter)

app.use('/api/rol', cors(corOptions), rolRoutes)
app.use('/api/discapacidad', cors(corOptions), discapacidadRoutes)

app.listen(port, () => console.log('Server on port', port))