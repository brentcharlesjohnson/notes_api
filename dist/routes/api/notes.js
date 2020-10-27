"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const pluralize = require('pluralize');
const router = express.Router();
const sequelize_1 = require("../../sequelize");
// Define route paramter middleware
const handler = (req, res, next, value) => {
    sequelize_1.Note.findByPk(value).then((note) => {
        if (note === null) {
            next(res.status(404).json({ msg: `Note with id ${value} not found!` }));
        }
        else {
            req.note = note;
            next();
        }
    }).catch((error) => {
        next(error);
    });
};
router.param('id', handler);
// Get all notes
router.get('/', (req, res) => sequelize_1.Note.findAll().then(notes => res.json(notes)));
// Get single note
router.get('/:id', (req, res) => {
    res.json(req.note);
});
// Create note
router.post('/', (req, res) => {
    sequelize_1.Note.create(req.body)
        .then(created => res.status(201).json({ msg: "Note Created", note: created }))
        .catch(error => res.status(400).json(error));
});
// Update note
router.put('/:id', (req, res) => {
    req.note.update(req.body)
        .then(updated => res.json({ msg: "Note Updated", note: updated }))
        .catch(error => res.status(400).json(error));
});
// Delete Note 
router.delete('/', (req, res) => {
    if (req.query.hasOwnProperty('id')) {
        sequelize_1.Note.destroy({
            where: {
                id: req.query.id
            }
        }).then((rows) => {
            if (rows) {
                return res.status(200).json({ msg: pluralize('Note', rows, true) + " Deleted." });
            }
            else {
                return res.status(404).json({ msg: "None of the parameters are valid!" });
            }
        });
    }
    else {
        res.status(400).json({ msg: "Please provide at least one id as a parameter" });
    }
});
exports.default = router;
