import express from 'express';
import mongoose from 'mongoose';
import {} from 'dotenv/config'
import bodyParser from 'body-parser';
import { contactRouter } from './routes/contact';
import { userRouter } from './routes/auth';

const app = express();

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


app.listen(3000, ()=> {
  console.log('app listening on port 3000!');
});
