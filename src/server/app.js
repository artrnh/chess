import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import socketIO from 'socket.io';

import socketSetup from './socket';
import gamesRoutes from './routes/games';
import userRoutes from './routes/user';

const publicPath = path.resolve(__dirname, '..', '..', 'public');

dotenv.config();

const MongoStore = connectMongo(session);

const app = express();

app.use(express.static(publicPath));

app.use(bodyParser.json());

app.use(
    session({
        secret: process.env.SECRET_COOKIE,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    })
);

app.use('/api/games', gamesRoutes);
app.use('/api/user', userRoutes);

app.use('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 8080;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        const server = app.listen(port);
        const io = socketIO(server);
        socketSetup(io);

        console.log(process.env.NODE_ENV, `server started on port ${port}.`);
    })
    .catch(err => console.log(err));
