const express = require('express');
const path = require('path');
const app = express();

const logger = (req, res, next) => { console.log('hello'); next(); };

// Init middleware
app.use(logger);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set API routes
app.use('/api/notes', require('./routes/api/notes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
