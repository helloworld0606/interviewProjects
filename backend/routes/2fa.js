const express = require('express');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const router = express.Router();

router.get('/generate', (req, res) => {
    const secret = speakeasy.generateSecret({ length: 20 });
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        res.json({ secret: secret.base32, qrCode: data_url });
    });
});

module.exports = router;
