import express from 'express'
import router from './routes/index.js'
import swaggerDocs from './swagger.js'
import mongoose from 'mongoose';
import {} from 'dotenv/config'
import bodyParser from 'body-parser';
import { contactRouter } from './routes/contact.routes';
import { userRouter } from './routes/auth';

const app = express()
const port = 4000

app.use(express.json())
app.use(router)


//Middlewares
app.use(bodyParser.json())

//Routes middleware
app.use('/api/contact', contactRouter);
app.use('/api/user', userRouter)

app.get('/', function (req, res) {
  res.status(200).json({message:'Hello World!'});
});


//Connect to database
mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>console.log("connected to Db"))
    .catch(e=>console.log(e))


app.listen(port, () => {
  console.log(`app listening at port: ${port}`)
  swaggerDocs(app, port)
})

