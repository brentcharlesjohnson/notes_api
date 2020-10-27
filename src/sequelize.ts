import { Sequelize } from 'sequelize';
import { NoteModel } from './models/note';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

export const Note = NoteModel(sequelize, Sequelize);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  });
