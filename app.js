import express from "express";
import mongoose, { Schema, model } from "mongoose";
import config from 'config';
import path from 'path';
import authRoutes from './routes/auth.routes.js';

const __dirname = path.resolve();
const app = express();

mongoose.set('strictQuery', false);

app.use(express.json({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use(authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'));
  } catch (error) {
    console.log('Server error', error.message);
    process.exit(1);
  }
}

start();

const PORT = process.env.PORT || config.get('port');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
