const express = require('express');
const path = require('path');
const notes = require('./Notes');

const app = express();

const logger = (req, res, next) => { console.log('hello'); next(); };

// Init middleware
app.use(logger);

// Get all notes
app.get('/api/notes', (req, res) => res.json(notes));

// Get single note
app.get('/api/notes/:id', (req, res) => res.json(notes.filter(note => note.id == parseInt(req.params.id))));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
