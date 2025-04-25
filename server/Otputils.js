function generateOTP(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return otp;
  }
  
  function validateOTP(otp, usedOTPs) {
    if (usedOTPs.has(otp)) {
      usedOTPs.delete(otp);
      return true;
    }
    return false;
  }
  
  module.exports = { generateOTP, validateOTP };
  