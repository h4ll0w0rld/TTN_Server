const e = require('express');
const db = require('../config/db');
const HumidService = require('../services/humiditiy-service');


//adds a new todo task
function createTodo({ headline, description, isDone = false }) {
   
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO todos (headline, description, isDone) VALUES (?, ?, ?)';
        db.query(query, [headline, description, isDone], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

//returns every todo
function getTodos() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM todos';
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

//deleteing todo by id
function deleteTodoById(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM todos WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

//mark todo as done
function todoDone(id) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE todos SET isDone = true WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

//creating automaticly new todo task if humidity drops under a certain threshhold
async function createAutoTask() {

    db.query('SELECT * FROM Pot WHERE autoWateringEnabled = TRUE', (error, pots) => {
        if (error) throw error;

        pots.forEach(async pot => { //iterating every pot
        
            var humidity = await HumidService.getHumid()  //get humidity 
            const sensor = humidity[humidity.length - 1] //only use newest value 
          
            if (sensor.humidity < pot.autoWateringTodo) {   //check if current humidity is lower than the threshhold
                //creating new todo task
                const headline = `${pot.name} braucht wasser`;  
                const description = `Der Wassergehalt von Topf ${pot.id} ist zu gering`;
                const exists = await todoExists(headline);
            
                if (!exists) {  //checks if todo is already created

                    console.log("Creating ToDo Task")
                    createTodo({ headline, description });
                }
            }

        });
    });

}

//checks if a given todo exists already
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