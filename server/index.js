const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generateOTP, validateOTP } = require('./Otputils');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let OTP_DB = {}; // Replace this with real DB in production
const MEET_LINK = 'https://meet.google.com/abc-defg-hij'; // Admin's link

app.post('/generate', (req, res) => {
  const otp = generateOTP();
  OTP_DB[otp] = { used: false };
  res.json({ otp }); // Ideally, send via email or UI
});

app.post('/validate', (req, res) => {
  const { otp } = req.body;
  if (OTP_DB[otp] && !OTP_DB[otp].used) {
    OTP_DB[otp].used = true;
    res.json({ success: true, redirect: MEET_LINK });
  } else {
    res.status(400).json({ success: false, message: 'Invalid or used OTP' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
