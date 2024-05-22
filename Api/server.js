const express = require('express');
const mysql = require("mysql2")
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/jwt-middleware');
const key = "x4MU7dkgvJxVaZZL9MM4z3hVwkhUHLxP" //JWT Key 
//const { authenticateUser } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3334; 


const authRoutes = require('./routs/auth-routes');
const todoRoutes = require('./routs/todo-routes');

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
app.use(authRoutes)
app.use(todoRoutes)
// Register user
// app.post('/register', async (req, res) => {
//   const { username, password } = req.body
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);


//     if (await userExists(username)) {
//       console.log("user exists")
//       return res.send("username already used").status(301)

//     } else {
//       const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
//       db.execute(query, [username, hashedPassword]);
//       res.send("User crated").status(200);
//       console.log(`Saved User ${username} to the database`);
//     }


//   } catch (error) {
//     console.log("Error with Hashing Password", error)
//   }

// });
// Login user
// app.post('/login', async (req, res) => {

//   const { username, password } = req.body;

//   user = await getUserByName(username);
//   if (!user) return res.status(401).json({ message: 'Invalid username or password' });

//   try {
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       console.log("Falsches PW")
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }
//     const token = jwt.sign({ userId: user.id }, key, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     console.log("Wrong credentials", err)
//   }

// });

// function getUserByJWT(_key){

//   jwt.verify(token, key, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Failed to authenticate token' });
//     }
//     return decoded
//   });
//   console.log("Can not extract user")
// }



// app.post('/todos', (req, res) => {
//   const { headline, description, isDone } = req.body;
//   const todo = { headline, description, isDone };
//   console.log("Hey ja", headline, description
//   )
//   const query = 'INSERT INTO todos SET ?';

//   db.query(query, todo, (err, result) => {
//     if (err) {
//       console.error('Error creating ToDo task:', err);
//       res.status(500).send('Error creating ToDo task.');
//     } else {
//       console.log('New ToDo task created:', result.insertId);
//       res.status(201).send('New ToDo task created.');
//     }
//   });
// });

app.post("/todo/done", (req, res) => {

  const query = 'UPDATE todos SET isDone = true WHERE id = ?';
  db.query(query, [req.body.id], (err, result) => {
    if(err){
      console.log("Err updating ToDo", err)
      res.status(500).send("Err updating ToDo")
    } else {
      res.status(201).send('ToDo task updated.');
    }

  })
 
})

// app.get('/todos', (req,res) => {
//   const query = "SELECT * FROM todos";
//   db.query(query, (err,results) => {
//     if(err){
//       console.log('Error executing query:', err)
//       res.status(500).send('Error creating ToDo task.');
     
//     }else {
//       res.status(200).send(JSON.stringify(results));
      
//     }
//   })
// })

// app.delete('/todo', (req, res) => {
//   console.log("req: ", req.params)
//   const query = `DELETE FROM todos WHERE id = ${req.body.id};`;
//   db.query(query, (err, result) => {
//     if(err){
//       console.log('Error executing query:', err)
//       res.status(500).send('Error deleting ToDo task.');
//     }else{
//       console.log("Todo deleted");
//       res.status(200).send("Task Deleted");
//     }
//   })

//   console.log(req.body)
// })

async function getUsers() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err)
      } else {
        resolve(results);
      }
    });
  });
}

async function userExists(_username) {
  const user = await getUserByName(_username)

  if (user) {

    return true;
  }

  return false
}

async function getUserByName(_username) {
  const users = await getUsers();
  if (!users) {
    console.log("No User found");
    return null;
  } else {
    const user = users.find(user => user.username === _username);
    console.log("user found: ", user);
    return user;
  }
}


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

app.get("/humidity", authenticateToken, async (_req, _res) => {
  try {
    const humidData = await getHumid();
    _res.status(200).send(JSON.stringify(humidData));
  } catch (error) {
    console.error('Error getting humidity data:', error);
    _res.status(500).send('Internal Server Error');
  }
})

app.get("/addProject", authenticateToken, async (_req, _res) => {
  try {
    const query = '';
    db.execute(query, [])
  } catch (err) {

  }
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
        //console.log('Retrieved values from HumidSens table:', results);
        resolve(results);
      }
    });
  });


}



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
