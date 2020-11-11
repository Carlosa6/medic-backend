const mongoose = require('mongoose')

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@dicweb.ihkbp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log('DB is connected'))
.catch(err => console.log('error',err))