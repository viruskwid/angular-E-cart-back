const mongoose = require('mongoose')
const connectionString = process.env.DB_CONNECTION
mongoose.connect(connectionString).then(
    (res)=>{
        console.log('SERVER CONNECTED WITH MONGO DB ATLAS');
    }
).catch((error)=>{
    console.log(error);
})