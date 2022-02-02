const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser')

//Import routes
const contactRoute = require('./routes/contact');
const authRoute = require('./routes/auth')

//Middlewares
app.use(bodyParser.json())

//Router Middlewares
app.use('/api/contact', contactRoute);
app.use('/api/user', authRoute)


// Routes
app.get('/', (req,res)=>{
    res.send('Home')
})


//Connect to database
mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>console.log("connected to Db"))
    .catch(e=>console.log(e))

//connect to server
app.listen(3000);