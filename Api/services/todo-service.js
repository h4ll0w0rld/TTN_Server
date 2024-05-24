const db = require('../config/db');
const HumidService = require('../services/humiditiy-service');

function createTodo({ headline, description, isDone = false }) {
    console.log("Getting", headline, description, isDone)
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO todos (headline, description, isDone) VALUES (?, ?, ?)';
        db.query(query, [headline, description, isDone], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

function getTodos() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM todos';
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

function deleteTodoById(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM todos WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


function todoDone(id) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE todos SET isDone = true WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

async function createAutoTask() {

    db.query('SELECT * FROM Pot WHERE autoWateringEnabled = TRUE', (error, pots) => {
        if (error) throw error;

        pots.forEach(async pot => {
            console.log(pot, "POT")
            var humidity = await HumidService.getHumid()
            const sensor = humidity[humidity.length - 1]
            console.log(sensor.humidity, pot.waterthreshhold, "SENSOR VALUES")
            if (sensor.humidity < pot.waterthreshhold) {

                console.log("DATA: ", pot)
                const headline = `${pot.name} Braucht wasser`;
                const description = `Der Wassergehalt von Topf nr ${pot.id} ist niedrig`;

                const exists = await todoExists(headline);
                if (exists) {

                    console.log("Creating ToDo Task")
                    createTodo({ headline, description });
                }
            }

        });
    });

}

async function todoExists(headline) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM todos WHERE headline = ?', [headline], (err, res) => {
            if (err) return reject(err);
            resolve(res.length > 0); // Resolve with true if a ToDo with the headline exists, otherwise false
        });
    });
}


module.exports = {
    createTodo,
    getTodos,
    deleteTodoById,
    todoDone,
    createAutoTask

};