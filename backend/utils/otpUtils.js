const speakeasy = require('speakeasy');

const generateTestOtp = (secret) => {
  return speakeasy.totp({
    secret: secret,
    encoding: 'base32'
  });
};

module.exports = {
  generateTestOtp
};
