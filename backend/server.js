const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();
const User = require('./models/User'); 
const Admin =require('./models/Admin');

const app = express();
connectDB();
console.log("Database connected");

app.use(cors());
app.use(bodyParser.json());


const userRoutes = require('./routes/User');
const adminRoutes = require('./routes/Admin');

app.use('/api/auth', userRoutes);
app.use('/api', adminRoutes);   
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
