const express = require('express');
const { addLog, getLog } = require('../controllers/log-controller');
const authenticateToken = require('../middleware/jwt-middleware');
//const { upload } = require('../server');

const multer  = require('multer')
const upload = multer({ dest: './uploads/' })



const router = express.Router();

router.post('/log', upload.single('photos'), authenticateToken, addLog);

router.get('/logs/:potId',authenticateToken, getLog);

module.exports = router;