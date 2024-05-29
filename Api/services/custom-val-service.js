const db = require('../config/db');

function getTypes() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM types';

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
function addType(name) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO types (name) VALUES (?)';
        console.log("NAME IS: ", name)
        // Execute the query
        db.query(query, [name], (err, results) => {
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

function getValByTypeId(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM type_values WHERE id = ?';

        // Execute the query
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                console.log('Retrieved values from type_values table:', results);
                resolve(results);
            }
        });
    });

}

function setValForType(id, val) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO type_values (type_id, value) VALUES (?, ?)';

        // Execute the query
        db.query(query, [id, val], (err, results) => {
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


module.exports = {
    getTypes,
    addType,
    getValByTypeId,
    setValForType

};