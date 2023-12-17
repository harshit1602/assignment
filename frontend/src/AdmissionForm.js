// AdmissionForm.js

import React, { useState } from 'react';
import './AdmissionForm.css'; // Import the CSS file

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    contactNumber: '',
    email: '',
    emergencyContact: '',
    batchPreference: '',
    paymentDate: '',
  });

  const [response, setResponse] = useState(null); // State to store the server response
  const [validationErrors, setValidationErrors] = useState(null); // State to store validation errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const isValid = validateFormData();
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/submitAdmission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setResponse(result); // Set the server response in the state
    } catch (error) {
      console.error('Error submitting admission:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors(null); // Clear validation errors when the user modifies the form
  };

  const validateFormData = () => {
    const errors = [];

    if (!formData.fullName) {
      errors.push('Full Name is required.');
    }

    if (isNaN(formData.age) || formData.age < 18 || formData.age > 65) {
      errors.push('Age must be between 18 and 65.');
    }

    if (!formData.contactNumber) {
      errors.push('Contact Number is required.');
    }

    if (!formData.email) {
      errors.push('Email is required.');
    }

    if (!formData.emergencyContact) {
      errors.push('Emergency Contact is required.');
    }

    if (!formData.batchPreference) {
      errors.push('Batch Preference is required.');
    }

    if (!formData.paymentDate) {
      errors.push('Payment Date is required.');
    }

    setValidationErrors(errors);

    // Log validation errors to the console
    console.log('Validation Errors:', errors);

    return errors.length === 0;
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded shadow-md max-w-md">
      <h2 className="text-2xl font-bold mb-6">Yoga Class Admission Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
            Contact Number:
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emergencyContact">
            Emergency Contact:
          </label>
          <input
            type="tel"
            id="emergencyContact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="batchPreference">
            Batch Preference:
          </label>
          <select
            id="batchPreference"
            name="batchPreference"
            value={formData.batchPreference}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          >
            <option value="">Select Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentDate">
            Payment Date:
          </label>
          <input
            type="date"
            id="paymentDate"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
          Submit
        </button>
      </form>

      {/* Display validation errors */}
      {validationErrors && (
        <div className="mt-4 text-red-500">
          <p className="font-bold">Validation Errors:</p>
          <ul className="list-disc ml-6">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display server response messages */}
      {response && (
        <div className="mt-4">
          {response.success ? (
            <p className="text-green-500 font-bold">{response.message}</p>
          ) : (
            <p className="text-red-500 font-bold">{response.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdmissionForm;
