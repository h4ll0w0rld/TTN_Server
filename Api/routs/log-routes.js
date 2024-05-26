const express = require('express');
const { addLog, getLog } = require('../controllers/log-controller');
const authenticateToken = require('../middleware/jwt-middleware');
const { upload } = require('../middleware');


const router = express.Router();

router.post('/log', upload.single('image'), authenticateToken, addLog);
router.get('/logs/:potId',authenticateToken,  getLog);

module.exports = router;