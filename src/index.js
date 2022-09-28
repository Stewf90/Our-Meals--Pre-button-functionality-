import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({

// host:
// smtp.mailtrap.io,
// Port:
// 2525,
// auth: {
//   user:
//   "69534fc88e058b",
//   pass:
//   "e79a3a4fa04e9f"
// }
// });

// exports.emailSender = functions.https.onRequest((req, res) => {...});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

