const Sequelize = require('sequelize');
const NoteModel = require('./models/note');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const Note = NoteModel(sequelize, Sequelize);
sequelize.sync({ force: true })
    .then(() => {
    console.log(`Database & tables created!`);
});
module.exports = Note;
