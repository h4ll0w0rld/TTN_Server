const express = require('express');
const db = require('./dbConnection');

const app = express();
const port = 3333; // Change the port number if needed

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST requests
app.post('/webhook', async (req, res) => {
  reqBody= { humidity: 10.7, temperature: 22.55 } // req.body.decoded_payload
  
  saveHumidityData(reqBody.humidity);
});

async function saveHumidityData(humidity) {
  try {
      const query = 'INSERT INTO HumidSens (humidity) VALUES (?)';
      await db.execute(query, [humidity]);
      console.log(`Saved humidity value ${humidity} to the database.`);
  } catch (error) {
      console.error('Error saving humidity data:', error.message);
  }
}



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});