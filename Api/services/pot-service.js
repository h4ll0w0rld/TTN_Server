const db = require('../config/db');


//creates new pot
function createPot(name, description, sensor, autoWateringTodo = null) {
    return new Promise((resolve, reject) => {

        const query = 'INSERT INTO Pot (name, description, sensorId, autoWateringTodo) VALUES (?, ?, ?, ?)';
        db.query(query, [name, description, sensor, autoWateringTodo], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {

                resolve(results);
            }
        });
    });

}
//returns all pots
function getPots() {
    return new Promise((resolve, reject) => {

        const query = 'SELECT * FROM Pot';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {

                resolve(results);
            }
        });
    });
}
//delets a pot by id
function delPot(potId) {
  
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Pot WHERE id = ?';
        db.query(query, [potId], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {

                resolve(results);
            }
        });
    });
}

//adding a log to a pot id using pot and log uuids 
function addLog(potId, logId) {

    return new Promise((resolve, reject) => {
        const query = 'UPDATE Pot SET logId = ? WHERE id = ?';
        db.query(query, [logId, potId], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {

                resolve(results);
            }
        });
    });
}
//Enables or disables auto watering function
function updateAutoWatering(id, autoWatering) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Pot SET autoWateringEnabled = ? WHERE id = ?';
        db.query(query, [autoWatering, id], (error, result) => {
            if (error) return reject(error);
            resolve(result)
        });
    });

}

//returns true or false depending on current state 
function autoWateringEnabled(id){
    return new Promise((resolve, reject) => {
        const query = 'SELECT autoWateringEnabled FROM Pot WHERE id = ?';
        db.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                 
                    resolve(results);
                }
            });
    });


}
//update humidity threshhold for auto watering 
function updateThreshhold(id, threshhold){
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Pot SET autoWateringTodo = ? WHERE id = ?';
        db.query(query, [threshhold, id], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                 
                    resolve(results);
                }
            });
    });


}
//returns current humidity threshhold
function getHumidThreshhold(id){
   
    return new Promise((resolve, reject) => {
        const query = 'SELECT autoWateringTodo FROM Pot WHERE id = ?';
        db.query(query, [ id], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    console.log(results, "SQL RESULT")
                    resolve(results);
                }
            });
    });

}


function delLog(potId, logId) {

}


module.exports = {
    createPot,
    getPots,
    delPot,
    addLog,
    delLog,
    updateAutoWatering,
    updateThreshhold,
    autoWateringEnabled,
    getHumidThreshhold


};