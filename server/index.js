import express from 'express'
import app from './server'
import router from './routes/index.js'
import swaggerDocs from './swagger.js'
import mongoose from 'mongoose';
import {} from 'dotenv/config'
import bodyParser from 'body-parser';
import { contactRouter } from './routes/contact.routes';
import { articleRouter } from './routes/article.routes';
import { userRouter } from './routes/auth';

// const app = express()
const port = 5000

app.use(express.json())
app.use(router)


//Middlewares
app.use(bodyParser.json())

//Routes middleware
app.use('/api/contact', contactRouter);
app.use('/api/user', userRouter)
app.use('/api/article', articleRouter)

app.get('/', function (req, res) {
  res.status(200).json({message:'Hello World!'});
});

// app.get("/test", async (req, res) => {
//   res.json({ message: "pass!" });
// });


//Connect to database
mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>console.log("connected to Db"))
    .catch(e=>console.log(e))


export default app.listen(port, () => {
  console.log(`app listening at port: ${port}`)
  swaggerDocs(app, port)
})

