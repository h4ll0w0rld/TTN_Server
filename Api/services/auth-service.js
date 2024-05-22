const db = require('../config/db');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

async function loginUser(username, password) {
    const user = await getUserByName(username);
    if (!user) {
        throw new Error('Invalid username or password');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid username or password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });
    return token;
};

function getUserByName(username) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

async function userExists(username) {
    const user = await getUserByName(username);
    return !!user;
}

function createUser(username, hashedPassword) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}



module.exports = {
    getUserByName,
    userExists,
    createUser
};