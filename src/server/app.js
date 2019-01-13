import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { socketInit } from './socket';
import gameRoutes from './routes/game';
import { initBoard } from './utils/board';

dotenv.config();

const MongoStore = connectMongo(session);

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET_COOKIE,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use('/api/game', gameRoutes);

// TODO: как-то по-другому запоминать текущую игру
/* eslint-disable-next-line */
export let currentGame;

const port =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_PORT
    : process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(
    initBoard((err, game) => {
      currentGame = game._id;
    })
  )
  .then(() => {
    const server = app.listen(port);
    const io = socketInit(server, { secure: true });

    console.log(process.env.NODE_ENV, `Server started on port ${port}.`);

    io.on('connection', () => console.log('Client connected!'));
  })
  .catch(err => console.log(err));
