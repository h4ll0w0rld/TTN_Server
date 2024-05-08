const express = require('express');
const mysql = require("mysql2")
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { authenticateUser } = require('./middleware/authenticate');

const app = express();
const port = 3333; // Change the port number if needed

const db = mysql.createConnection({
  host: 'localhost',
  user: 'lora',
  password: 'your_password_here',
  database: 'LoRa',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.connect((err) => {
  //nif (err) throw err;
  console.log('Connected to MySQL database!');
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Register user
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    try {
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      await db.execute(query, [username, password]);
      res.send("User crated").status(200);
      console.log(`Saved User ${username} to the database`);
    } catch (error) {
      console.error('Error saving User:', error.message);
    }
  } catch (error) {
    console.log("Error with Hashing Password", error)
  }

});
// Login user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("Tryy")
  try {
    const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Protected route
// app.get('/profile', authenticateUser, (req, res) => {
//     // Access user information from req.user
//     res.json(req.user);
// });

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

app.get("/humidity", async (_req, _res) => {
  try {
    const humidData = await getHumid();
    _res.status(200).send(JSON.stringify(humidData));
  } catch (error) {
    console.error('Error getting humidity data:', error);
    _res.status(500).send('Internal Server Error');
  }
  //_res.send(JSON.stringify(getHumid())).status(200);
})

async function saveHumidityData(_id, _humidity, _time) {


  try {
    const query = 'INSERT INTO HumidSens (devId, humidity, Date) VALUES (?, ?, ?)';
    await db.execute(query, [_id, _humidity, _time]);
    console.log(`Saved humidity value ${_humidity} to the database with id: ${_id} collected ${_time.toString()}.`);
  } catch (error) {
    console.error('Error saving humidity data:', error.message);
  }
}

async function getHumid() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM HumidSens';

    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
      } else {
        console.log('Retrieved values from HumidSens table:', results);
        resolve(results);
      }
    });
  });


}



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
