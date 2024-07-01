const express = require('express');
const { getUsers, addUser, loginUser, verifyOtp, guestLogin, addGoogleUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.post('/add', addUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOtp);
router.post('/guest-login', guestLogin);
router.post('/addGoogleUser', addGoogleUser);

module.exports = router;
