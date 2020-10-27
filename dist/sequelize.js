"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const note_1 = require("./models/note");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
exports.Note = note_1.NoteModel(exports.sequelize, sequelize_1.Sequelize);
exports.sequelize.sync({ force: true })
    .then(() => {
    console.log(`Database & tables created!`);
});
