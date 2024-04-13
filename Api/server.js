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
  if (err) throw err;
  console.log('Connected to MySQL database!');
});


// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST requests
app.post('/webhook', async (req, res) => {
  reqBody = req.body.decoded_payload

  console.log(req.body.uplink_message.decoded_payload)
  saveHumidityData(req.body.uplink_message.decoded_payload.humidity);
});

app.get("/humidity", async(req, res) => {
    res.send(getHumid());
})

async function saveHumidityData(humidity) {
  try {
    const query = 'INSERT INTO HumidSens (humidity) VALUES (?)';
    await db.execute(query, [humidity]);
    console.log(`Saved humidity value ${humidity} to the database.`);
  } catch (error) {
    console.error('Error saving humidity data:', error.message);
  }
}

function getHumid() {

  const query = 'SELECT * FROM HumidSens';

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Retrieved values from HumidSens table:', results);
    return results
  });
}



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});