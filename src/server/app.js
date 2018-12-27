import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const MongoStore = connectMongo(session);

const app = express();

app.use(express.static('public'));

app.use(
  session({
    secret: process.env.SECRET_COOKIE,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => app.listen(process.env.PORT || 8080))
  .catch(err => console.log(err));
