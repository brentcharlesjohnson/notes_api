"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const pluralize = require('pluralize');
const sequelize_1 = require("../../sequelize");
const router = express.Router();
const handler = (req, res, next, value) => {
    sequelize_1.Note.findByPk(value).then(note => {
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
router.get('/', (req, res) => sequelize_1.Note.findAll().then(notes => res.json(notes)));
router.get('/:id', (req, res) => {
    res.json(req.note);
});
router.post('/', (req, res) => {
    sequelize_1.Note.create(req.body)
        .then(created => res.status(201).json({ msg: "Note Created", note: created }))
        .catch(error => res.status(400).json(error));
});
router.put('/:id', (req, res) => {
    req.note.update(req.body)
        .then((updated) => res.json({ msg: "Note Updated", note: updated }))
        .catch((error) => res.status(400).json(error));
});
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
