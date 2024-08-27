const db = require('../config/db');

//returns every known type
function getTypes() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM types';

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                
                resolve(results);
            }
        });
    });
};

//adds a new datatype 
function addType(name) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO types (name) VALUES (?)';
        console.log("NAME IS: ", name)
   
        db.query(query, [name], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
              
                resolve(results);
            }
        });
    });
}

//returns a value for a given data type using uuid 
function getValByTypeId(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM type_values WHERE type_id = ?';
       
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
//add value to data type
function setValForType(id, val) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO type_values (type_id, value) VALUES (?, ?)';

        db.query(query, [id, val], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
             
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