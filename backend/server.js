// server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/AuthRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

import connectDB from './config/db.js';


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();

app.use('/api/auth',authRoutes);
app.use('/api/auth/tasks',taskRoutes);
const port=5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


