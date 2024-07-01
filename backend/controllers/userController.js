const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { readData, writeData } = require('../utils/fileUtils');

const getUsers = (req, res) => {
  const data = readData();
  res.json(data.users);
};

const addUser = async (req, res) => {
  const data = readData();
  const newUser = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    data.users.push(newUser);
    writeData(data);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  console.log('loginUser function called with:', req.body);
  const data = readData();
  const { account, password } = req.body;
  const user = data.users.find(user => user.account === account);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      
      const secret = speakeasy.generateSecret();
      user.twoFactorSecret = secret.base32;
      writeData(data);

      const otpAuthUrl = speakeasy.otpauthURL({
        secret: secret.base32,
        label: `MyApp (${user.account})`,
        issuer: 'MyApp'
      });

      qrcode.toDataURL(otpAuthUrl, (err, data_url) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        console.log('Generated QR Code URL:', data_url); 
        return res.status(200).json({
          message: '2FA required',
          userId: user.id,
          qrCodeUrl: data_url,
          otpAuthUrl: otpAuthUrl 
        });
      });
    } else {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error comparing password:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const verifyOtp = (req, res) => {
  const data = readData();
  const { userId, otp } = req.body;
  const user = data.users.find(user => user.id === userId);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token: otp
  });

  if (verified) {
    return res.status(200).json({ message: 'OTP verification successful' });
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
};

const guestLogin = (req, res) => {
  const data = readData();
  const guestUser = data.users.find(user => user.isGuest);

  if (!guestUser) {
    return res.status(400).json({ error: 'No guest user available' });
  }

  const otp = speakeasy.totp({
    secret: guestUser.twoFactorSecret,
    encoding: 'base32'
  });

  return res.status(200).json({ otp });
};

const addGoogleUser = async (req, res) => {
  const data = readData();
  const { account, uid } = req.body;

  const userExists = data.users.some(user => user.account === account);
  if (userExists) {
    return res.status(200).json({ message: 'User already exists', userId: uid });
  }

  try {
    const secret = speakeasy.generateSecret();
    const newUser = {
      id: uid,
      account,
      password: '', 
      isGuest: false,
      twoFactorSecret: secret.base32
    };

    data.users.push(newUser);
    writeData(data);

    const otpAuthUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `MyApp (${account})`,
      issuer: 'MyApp'
    });

    qrcode.toDataURL(otpAuthUrl, (err, data_url) => {
      if (err) {
        console.error('Failed to generate QR code:', err); 
        return res.status(500).json({ error: 'Failed to generate QR code' });
      }
      console.log('Generated QR Code URL:', data_url); 
      return res.status(201).json({
        message: 'Google user added successfully',
        userId: uid,
        qrCodeUrl: data_url,
        otpAuthUrl: otpAuthUrl 
      });
    });
  } catch (err) {
    console.error('Error saving Google user:', err); 
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUsers,
  addUser,
  loginUser,
  verifyOtp,
  guestLogin,
  addGoogleUser
};
