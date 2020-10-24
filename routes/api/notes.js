const express = require('express');
const router = express.Router();
const Note = require('../../sequelize');

// Define route paramter middleware
router.param('id', (req, res, next, id) => {
    Note.findByPk(id).then((note) => {
        console.log(`inside middleware! id: ${id}`);
        if (note === null) {
            next(res.status(404).json({ msg: `Note with id ${id} not found!` }));
        } else {
            req.note = note;
            next();
        }
    }).catch((error) => {
        next(error)
    });
});

// Get all notes
router.get('/', (req, res) => Note.findAll().then(notes => res.json(notes)));

// Get single note
router.get('/:id', (req, res) => {
    res.json(req.note);
});

// Create note
router.post('/', (req, res) => {
    Note.create(req.body)
        .then(created => res.status(201).json({msg: "Note Created", note: created}))
        .catch(error => res.status(400).json(error));
});

// Update note
router.put('/:id', (req, res) => {
    req.note.update(req.body)
        .then(updated => res.json({msg: "Note Updated", note: updated}))
        .catch(error => res.status(400).json(error));
});

// Delete Note 
router.delete('/:id', (req, res) => {
    req.note.destroy().then((deleted) => res.status(200).json({msg: "Note Deleted", note: deleted}));
});

module.exports = router;