import { Sequelize } from 'sequelize';
import { NoteFactory } from './models/note';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

export const Note = NoteFactory(sequelize);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  });
