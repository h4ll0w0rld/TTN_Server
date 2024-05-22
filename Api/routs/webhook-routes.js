const express = require('express');
const {getHumid } = require('../controllers/webhook-controller');
const authenticateToken = require('../middleware/jwt-middleware');

const router = express.Router();


router.get('/webhook', authenticateToken, getHumid);


module.exports = router;