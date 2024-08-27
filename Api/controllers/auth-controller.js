const AuthService = require('../services/auth-service');

//Register User
async function register(req, res) {
    const { username, password } = req.body;
    try {
        await AuthService.registerUser(username, password);
        res.status(200).send('User created');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).send(error.message);
    }
};

//Login User
async function login(req, res) {
  
    const { username, password } = req.body;
    if (await AuthService.userExists()) return res.status(401).json({ message: 'Invalid username or password' }); //returns 401 if user doasnt exist
    
    //Calling Authentification Service to Log in
    try {
        const jwtToken = await AuthService.loginUser(username, password)
        res.json({ jwtToken });
    } catch (err) {
        console.log("Wrong credentials", err);
        return res.status(401).json({ message: 'Invalid username or password' });
    }
};


module.exports = {
    register,
    login
};