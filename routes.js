const express = require('express');
const router = express.Router();

const db = require('./dbConnection'); 

// Retrieve data from MySQL and send it as JSON
router.get('/moisture', (req, res) => {
    db.query('SELECT * FROM moisture_data', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});



module.exports = router;