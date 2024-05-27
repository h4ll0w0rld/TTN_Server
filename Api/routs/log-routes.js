const express = require('express');
const { addLog, getLog } = require('../controllers/log-controller');
const authenticateToken = require('../middleware/jwt-middleware');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


//const upload = multer({ dest: './uploads/' })



const router = express.Router();
router.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      }
      // Add other content types as needed
    }
  }));
//router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
router.post('/log', upload.single('image'), authenticateToken, addLog);

router.get('/logs/:potId', authenticateToken, getLog);

module.exports = router;