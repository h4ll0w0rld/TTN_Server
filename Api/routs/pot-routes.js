const express = require('express');
const { addPot, addLog, getPots, delLog, delPot } = require('../controllers/pot-controller');
const authenticateToken = require('../middleware/jwt-middleware');

const router = express.Router();

router.post('/addPot', authenticateToken, addPot);
router.get('/pots', authenticateToken, getPots );
router.post('/addLog', authenticateToken, addLog);
router.delete('/pot', authenticateToken, delPot)
router.delete('/pot/log', authenticateToken, delLog)

module.exports = router;