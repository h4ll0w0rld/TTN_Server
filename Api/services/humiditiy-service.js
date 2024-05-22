const db = require('../config/db');

function getHumid() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM HumidSens';

        // Execute the query
        db.query(query, (err, results) => {
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
    getHumid
};