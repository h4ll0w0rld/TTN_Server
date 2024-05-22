const AuthService = require('../services/auth-service');

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
      await AuthService.registerUser(username, password);
      res.status(200).send('User created');
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(400).send(error.message);
    }
  };


async function login(req, res) {
    const { username, password } = req.body;
    if (!AuthService.userExists()) return res.status(401).json({ message: 'Invalid username or password' });
    try {
        const jwtToken = AuthService.login(username, password)
        res.json(jwtToken)
    } catch (err) {
        console.log("Wrong credentials", err)
    }
};


module.exports = {
    register,
    login
  };