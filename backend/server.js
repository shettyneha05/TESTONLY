// server.js
const express = require('express');
const dotenv=require('dotenv');
const port=process.env.PORT || 5000;
const cors=require('cors');
const connectDB=require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/AuthRoutes'));
app.use('/api/auth/tasks',require('./routes/taskRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


