const express = require('express');
const {addSensVal } = require('../controllers/webhook-controller');
const authenticateToken = require('../middleware/jwt-middleware');

const router = express.Router();


router.get('/webhook', authenticateToken, addSensVal);


module.exports = router;