const express = require('express');
const mysql = require("mysql2")

const app = express();
const port = 3333; // Change the port number if needed

const db = mysql.createConnection({
  host: 'localhost',
  user: 'lora',
  password: 'your_password_here',
  database: 'LoRa'
});

db.connect((err) => {
  //nif (err) throw err;
  console.log('Connected to MySQL database!');
});


// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST requests
app.post('/webhook', async (req, res) => {
  reqBody = req.body.decoded_payload

  console.log(req.body.uplink_message.decoded_payload)

  const moistSens = {
    devId: req.body.uplink_message.decoded_payload.id,
    humidity: req.body.uplink_message.decoded_payload.humidity,
    time: new Date(req.body.uplink_message.settings.time) 
  }
  console.log("moist: ", moistSens)
  saveHumidityData(moistSens.devId, moistSens.humidity, moistSens.time);
  res.status(200).json({ message: 'Success!' });
});

app.get("/humidity", async(_req, _res) => {
    _res.send(JSON.stringify(getHumid())).status(200);
})

async function saveHumidityData(_id, _humidity, _time) {
 

  try {
    const query = 'INSERT INTO HumidSens (devId, humidity, Date) VALUES (?)';
    await db.execute(query, [_id, _humidity, _time]);
    console.log(`Saved humidity value ${_humidity} to the database with id: ${_id} collected ${time.toString()}.`);
  } catch (error) {
    console.error('Error saving humidity data:', error.message);
  }
}

async function getHumid() {

  const query = 'SELECT * FROM HumidSens';

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return "bababababa";
    }
    console.log('Retrieved values from HumidSens table:', results);
    return "Hohohohohohoho"
  });
}



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});