// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database (you may need to install sqlite3 package)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Define Sequelize model for Participants
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
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize.sync({ force: true });

// Mock function for payment completion
function completePayment(user, paymentDetails) {
  // Implement your payment logic here
  // For this example, just return a success message
  return { success: true, message: 'Payment completed successfully' };
}

app.post('/submitAdmission', async (req, res) => {
  const userData = req.body;

  // Validate the age range
  if (userData.age < 18 || userData.age > 65) {
    return res.status(400).json({ success: false, message: 'Age must be between 18 and 65.' });
  }

  // Add more validations for other fields as needed

  try {
    // Store data in the database using Sequelize model
    const participant = await Participant.create(userData);

    // Log the participant data to the console
    console.log('Participant data inserted into the database:', participant);

    // Mock payment function
    const paymentDetails = { amount: 500, date: userData.paymentDate /* add more details as needed */ };
    const paymentResponse = completePayment(userData, paymentDetails);

    // Check payment response
    if (paymentResponse.success) {
      return res.status(200).json({ success: true, message: 'Admission successful', participant });
    } else {
      return res.status(500).json({ success: false, message: 'Admission failed. Payment error.', error: paymentResponse.error });
    }
  } catch (error) {
    console.error('Error submitting admission:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
