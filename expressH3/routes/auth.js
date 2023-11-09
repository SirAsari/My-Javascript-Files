const express = require('express');
const {
    register
} = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', register);

module.exports = router