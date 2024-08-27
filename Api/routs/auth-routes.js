const express = require('express');
const { register, login } = require('../controllers/auth-controller');

const router = express.Router();
//Routing register and login requests to their coresponding controller
router.post('/register', register);
router.post('/login', login);

module.exports = router;