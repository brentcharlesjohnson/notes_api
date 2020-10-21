const express = require('express');
const router = express.Router();
const notes = require('../../Notes'); // deprecated
const Note = require('../../sequelize');

// Get all notes
router.get('/', (req, res) => Note.findAll().then(notes => res.json(notes)));

// Get single note
router.get('/:id', (req, res) => {

    Note.findByPk(req.params.id).then(note => {
        return note === null ? res.json({ msg: `Note with id ${req.params.id} not found!` }) : res.json(note);
    });
});

// Create note
router.post('/', (req, res) => {
    Note.create(req.body).then(note => res.json(note));
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

// Delete Note 
router.delete('/:id', (req, res) => {

    Note.findByPk(req.params.id).then(note => {
        if(note === null) {
            return res.json({ msg: `Note with id ${req.params.id} not found!` });
        } else {
            return note.destroy().then((deleted) => res.send(deleted));
        }
    });
});

module.exports = router;