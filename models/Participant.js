// models/Participant.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Participant = sequelize.define('Participant', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batchPreference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  

  return Participant;
};
