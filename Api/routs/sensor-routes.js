const express = require('express');
const {getHumid } = require('../controllers/sensor-controller');
const authenticateToken = require('../middleware/jwt-middleware');

const router = express.Router();


router.get('/humidity', authenticateToken, getHumid);


module.exports = router;