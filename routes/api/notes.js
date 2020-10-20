const express = require('express');
const router = express.Router();
const notes = require('../../Notes');

// Get all notes
router.get('/', (req, res) => res.json(notes));

// Get single note
router.get('/:id', (req, res) => {

    const found = notes.some(note => note.id == parseInt(req.params.id));
    if(found) {
        res.json(notes.filter(note => note.id == parseInt(req.params.id)));
    } else {
        res.status(400).json({
            msg: `Note with id: ${req.params.id} not found.` 
        });
    }
});

// Create note
router.post('/', (req, res) => {
    const newNote = {
        id: notes.reduce((max, note) => (note.id > max ? note.id : max), notes[0].id) + 1,
        title: req.body.title,
        message: req.body.message,
        tags: !req.body.tags ? "" : req.body.tags
    };

    if (!newNote.title || !newNote.message) {
        return res.status(400).json({ msg: "Title and Message are required" });
    }
    notes.push(newNote);
    res.json(newNote);
});

// Update note
router.put('/:id', (req, res) => {

    const found = notes.some(note => note.id == parseInt(req.params.id));
    if(found) {
        const idx = notes.findIndex(note => note.id === parseInt(req.params.id));
        if(req.body.title) notes[idx].title = req.body.title;
        if(req.body.message) notes[idx].message = req.body.message;
        if(req.body.tags) notes[idx].tags = req.body.tags;
        res.json({msg: "Note updated", note: notes[idx]});
    } else {
        res.status(400).json({
            msg: `Note with id: ${req.params.id} not found.` 
        });
    }
});

module.exports = router;