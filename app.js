const express = require('express');
const app = express();
const morgan = require('morgan');

const studentRouter = require('./routes/students');

app.use(morgan('dev'));
app.use('/students', studentRouter);

module.exports = app;