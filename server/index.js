import express from 'express';
import 'dotenv/config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log(`Server started on PORT  = ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

start()