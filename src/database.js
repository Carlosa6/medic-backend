const mongoose = require('mongoose')

const MONGODB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@bwl9ydlhmxufsmx-mongodb.services.clever-cloud.com:27017/${process.env.DB_NAME}`

mongoose.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(() => console.log('DB is connected'))
.catch(err => console.log('error',err))