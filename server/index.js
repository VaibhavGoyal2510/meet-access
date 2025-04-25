const express = require('express');
const app = express();
const cors = require('cors');
const { generateOTP, validateOTP } = require('./Otputils');

// Middleware
app.use(express.json());  // Ensure you're parsing JSON bodies
app.use(cors());          // Enable CORS

// In-memory store for used OTPs (for demo purposes)
const usedOTPs = new Set();

// Generate OTP endpoint
app.post('/generate', (req, res) => {
  const otp = generateOTP();
  usedOTPs.add(otp);  // Mark the OTP as used
  console.log(`Generated OTP: ${otp}`);
  res.json({ otp });  // Send the OTP in response
});

// Validate OTP endpoint
app.post('/validate', (req, res) => {
  const { otp } = req.body;
  if (validateOTP(otp, usedOTPs)) {
    res.json({ success: true, redirect: 'https://meet.google.com/xyz-abcd-efg' });
  } else {
    res.json({ success: false, message: 'Invalid or already used OTP' });
  }
});

// Default route for testing
app.get('/', (req, res) => {
  res.send('✅ OTP Server is Running');
});

// Port configuration (required for Render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
