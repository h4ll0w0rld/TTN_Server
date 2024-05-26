const db = require('../config/db');


function addLog(headline, description, imagePath, potId) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO logs (headline, description, image, potId) VALUES (?, ?, ?, ?)';

        // Execute the query
        console.log("Pot ID", potId)
        db.query(query, [headline, description, imagePath, potId], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                //console.log('Retrieved values from HumidSens table:', results);
                resolve(results);
            }
        });
    });

}

function getLogs(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM logs WHERE potId = ? ORDER BY timestamp DESC';

        // Execute the query
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                //console.log('Retrieved values from HumidSens table:', results);
                resolve(results);
            }
        });
    });
};


module.exports = {
    getLogs,
    addLog

}