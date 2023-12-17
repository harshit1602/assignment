import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AdmissionForm from './AdmissionForm'; // Update this line
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AdmissionForm /> {/* Update this line */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();