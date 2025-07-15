const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crimeRoutes = require('./routes/crimeRoutes');
const studentRoutes = require('./routes/studentRoutes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
const app = express();
app.use(bodyParser.json());
// Connect to MongoDB
connectDB();
// Use Routes
app.use('/api/students', studentRoutes);
app.use('/api/crimes', crimeRoutes);
module.exports = app;