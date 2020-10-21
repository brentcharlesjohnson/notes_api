const express = require('express');
const router = express.Router();
const Note = require('../../sequelize');

// Get all notes
router.get('/', (req, res) => Note.findAll().then(notes => res.json(notes)));

// Get single note
router.get('/:id', (req, res) => {

    Note.findByPk(req.params.id).then(note => {
        return note === null ? res.status(400).json({ msg: `Note with id ${req.params.id} not found!` }) : res.json(note);
    });
});

// Create note
router.post('/', (req, res) => {
    Note.create(req.body).then(note => res.json(note)).catch(error => res.status(400).json(error));
});

// Update note
router.put('/:id', (req, res) => {

    Note.findByPk(req.params.id).then(note => {
        if(note === null) {
            return res.status(400).json({ msg: `Note with id ${req.params.id} not found!` });
        } else {
            if(req.body.title) note.title = req.body.title;
            if(req.body.message) note.message = req.body.message;
            if(req.body.tags) note.tags = req.body.tags;
            return note.save().then((saved) => res.json({msg: "Note Updated", note: saved}));
        }
    });

});

// Delete Note 
router.delete('/:id', (req, res) => {

    Note.findByPk(req.params.id).then(note => {
        if(note === null) {
            return res.status(400).json({ msg: `Note with id ${req.params.id} not found!` });
        } else {
            return note.destroy().then((deleted) => res.json(deleted));
        }
    });
});

module.exports = router;