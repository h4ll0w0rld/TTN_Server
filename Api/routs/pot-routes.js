const express = require('express');
const { addPot, addLog, getPots, delLog, delPot, updateAutoWatering, updateThreshhold, getHumidThreshhold, autoWateringEnabled } = require('../controllers/pot-controller');
const authenticateToken = require('../middleware/jwt-middleware');

const router = express.Router();

//routing every pot req. to its coresponding controller and function
router.post('/addPot', authenticateToken, addPot);  
router.get('/pots', authenticateToken, getPots);
router.post('/addLog', authenticateToken, addLog);
router.delete('/pot', authenticateToken, delPot)
router.delete('/pot/log', authenticateToken, delLog)

router.post('/pot/:id/auto-watering', authenticateToken, updateAutoWatering)
router.post('/pot/:id/threshold', authenticateToken, updateThreshhold)
router.get('/pot/:id/threshhold', authenticateToken, getHumidThreshhold);
router.get('/pot/:id/autoWateringEnabled', authenticateToken, autoWateringEnabled)

module.exports = router;