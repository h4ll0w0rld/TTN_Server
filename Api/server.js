const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const TodoService = require('services/todo-service');
require('dotenv').config();
 

const app = express();
const port = process.env.PORT || 3334; 


const authRoutes = require('./routs/auth-routes');
const todoRoutes = require('./routs/todo-routes');
const sensorRoutes = require('./routs/sensor-routes');
const potRoutes = require('./routs/pot-routes');



// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());



// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoutes)
app.use(todoRoutes)
app.use(sensorRoutes)
app.use(potRoutes)

setInterval(TodoService.createAutoTask(), 60000);



// app.post('/webhook', async (req, res) => {
//   const reqBody = req.body.decoded_payload

//   console.log(req.body.uplink_message.decoded_payload)

//   const moistSens = {
//     devId: req.body.uplink_message.decoded_payload.id,
//     humidity: req.body.uplink_message.decoded_payload.humidity,
//     time: new Date(req.body.uplink_message.settings.time)
//   }
//   console.log("moist: ", moistSens)
//   saveHumidityData(moistSens.devId, moistSens.humidity, moistSens.time);
//   res.status(200).json({ message: 'Success!' });
// });



// async function saveHumidityData(_id, _humidity, _time) {


//   try {
//     const query = 'INSERT INTO HumidSens (devId, humidity, Date) VALUES (?, ?, ?)';
//     await db.execute(query, [_id, _humidity, _time]);
//     console.log(`Saved humidity value ${_humidity} to the database with id: ${_id} collected ${_time.toString()}.`);
//   } catch (error) {
//     console.error('Error saving humidity data:', error.message);
//   }
// }




// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
