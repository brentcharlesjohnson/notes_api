const express = require('express');
const path = require('path');
const app = express();
// Init Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
// Set API routes
app.use('/api/notes', require('./routes/api/notes'));
module.exports = app;
