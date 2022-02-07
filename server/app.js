import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/mainRouter.js";
import mongoose from "mongoose";
import swaggerDocs from './swagger.js'
import usersRouter from "./routes/usersRouter.js";
import articlesRouter from "./routes/articlesRouter.js";
import messagesRouter from "./routes/messagesRouter"
import commentsRouter from "./routes/commentsRouter.js";
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './routes/routes'



dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
let database = process.env.NODE_ENV === 'dev' ? process.env.DB_URI
                                              : process.env.DB_URI_TEST;

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//connect to database
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`);
  });


//Routes
app.use("/users", usersRouter)
app.use("/", mainRouter)
app.use("/articles", articlesRouter)
app.use("/messages", messagesRouter)
app.use("/api", router)
app.use("/comments", commentsRouter)

//start app
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  swaggerDocs(app, port)
});


export default app;