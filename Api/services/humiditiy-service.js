const db = require('../config/db');

//returns all humidity values
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
//saves humidity data 
async function saveHumidityData(_id, _humidity, _time) {
    try {
      const query = 'INSERT INTO HumidSens (devId, humidity, Date) VALUES (?, ?, ?)';
      await db.execute(query, [_id, _humidity, _time]);
      console.log(`Saved humidity value ${_humidity} to the database with id: ${_id} collected ${_time.toString()}.`);
    } catch (error) {
      console.error('Error saving humidity data:', error.message);
    }
  }

module.exports = {
    getHumid,
    saveHumidityData
};