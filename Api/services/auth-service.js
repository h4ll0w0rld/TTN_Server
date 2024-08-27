const db = require('../config/db'); //using db connection from db.conf
const bcrypt = require('bcrypt');   //hashing lib

const jwt = require('jsonwebtoken');


async function registerUser(username, password) {
    if (await userExists(username)) {
        throw new Error('Username already used');
    }
    const hashedPassword = await bcrypt.hash(password, 10); //Hashing password
    await createUser(username, hashedPassword); //trying to create a user
};


async function loginUser(username, password) {
    const user = await getUserByName(username); //Doas user exist?
    if (!user) {
        throw new Error('Invalid username or password');  //User not known
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid username or password');    //Password incorrect
    }
 
    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });
    return token;
}; 

//returns user by name
function getUserByName(username) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

//checkts if a given user is already registerd 
async function userExists(username) {
    const user = await getUserByName(username);
    return !!user;
}

//Creates new user
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
    createUser,
    loginUser,
    registerUser
};