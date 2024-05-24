const db = require('../config/db');

function createTodo({ headline, description, isDone }) {
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

function createAutoTask(){

    db.query('SELECT id, autoWateringEnabled FROM Pot WHERE autoWateringEnabled = TRUE', (error, pots) => {
        if (error) throw error;
        
        pots.forEach(pot => {
            db.query('SELECT value FROM Sensor WHERE potId = ?', [pot.id], (error, sensors) => {
                if (error) throw error;
                
                sensors.forEach(sensor => {
                    if (sensor.value < pot.waterthreshhold) {
                        const title = `${pot.title} Braucht wasser`;
                        const description = `Der Wassergehalt von Topf nr ${pot.id} ist niedrig`;
                        createTodo(title, description, false);

                     
                    }
                });
            });
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