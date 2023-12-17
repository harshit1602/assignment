// db.js

const { Sequelize } = require('sequelize');
const ParticipantModel = require('./models/Participant');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // SQLite database file
});

const Participant = ParticipantModel(sequelize);

// Synchronize the models with the database
sequelize.sync();

module.exports = {
  Participant,
};
