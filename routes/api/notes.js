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

module.exports = router;