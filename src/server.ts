import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());
app.use(express.static(__dirname + '/../client/build'))

mongoose.connect(process.env.MONGODB_URI as string, {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to mongo 🐔')
});
db.on('error', (err) => {
  console.log(`Database error:\n${err}`)
});

import authRouter from './routes/auth';
app.use('/auth', authRouter)

import apiRouter from './routes/api';
app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile('index.html')
})

app.listen(process.env.PORT || 3001);