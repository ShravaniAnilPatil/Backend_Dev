const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();
const User = require('./models/User'); 
const Admin =require('./models/Admin');
const MockTest = require('./models/MockTest');
const Question = require('./models/Question');

const app = express();
connectDB();
console.log("Database connected");

app.use(cors());
app.use(bodyParser.json());


const userRoutes = require('./routes/User');
const adminRoutes = require('./routes/Admin');
const testRoutes = require('./routes/mockTests');

app.use('/api/auth', userRoutes);
app.use('/api', adminRoutes);  
app.use('/api', testRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
