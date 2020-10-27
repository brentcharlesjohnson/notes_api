"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = void 0;
exports.NoteModel = (sequelize, type) => {
    return sequelize.define('note', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        message: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        tags: type.STRING
    }, {
        timestamps: false
    });
};
