const bcrypt = require('bcryptjs');
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
      res.status(200).json({ message: 'Login successful', userId: user.id });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error comparing password:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addGoogleUser = async (req, res) => {
  const data = readData();
  const { account, password, uid } = req.body;

  const userExists = data.users.some(user => user.account === account);
  if (userExists) {
    return res.status(200).json({ message: 'User already exists', userId: uid });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    data.users.push({ id: uid, account, password: hashedPassword });
    writeData(data);
    res.status(201).json({ message: 'Google user added successfully', userId: uid });
  } catch (err) {
    console.error('Error saving Google user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUsers,
  addUser,
  loginUser,
  addGoogleUser
};
