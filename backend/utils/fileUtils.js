const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/db.json');
const guestFilePath = path.join(__dirname, '../data/user.json');

function initDataFile() {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ users: [] }, null, 2));
  }
  if (!fs.existsSync(guestFilePath)) {
    fs.writeFileSync(guestFilePath, JSON.stringify({ guest: {} }, null, 2));
  }
}

function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data file:', err);
    return {};
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing data file:', err);
  }
}

function readGuestData() {
  try {
    const data = fs.readFileSync(guestFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading guest data file:', err);
    return {};
  }
}

function writeGuestData(data) {
  try {
    fs.writeFileSync(guestFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing guest data file:', err);
  }
}

module.exports = {
  initDataFile,
  readData,
  writeData,
  readGuestData,
  writeGuestData
};
