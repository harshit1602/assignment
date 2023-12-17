// netlify/submitAdmission.js

exports.handler = async function (event, context) {
    try {
      const data = JSON.parse(event.body);
  
      // Your existing server logic for handling admission submission goes here
  
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Admission submitted successfully.' }),
      };
    } catch (error) {
      console.error('Error submitting admission:', error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: 'Internal Server Error' }),
      };
    }
  };
  