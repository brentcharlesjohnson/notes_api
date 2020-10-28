"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteFactory = exports.Note = void 0;
const sequelize_1 = require("sequelize");
class Note extends sequelize_1.Model {
}
exports.Note = Note;
exports.NoteFactory = (sequelize) => {
    return sequelize.define('note', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        message: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        tags: sequelize_1.DataTypes.STRING
    }, {
        timestamps: false
    });
};
