const HumidService = require('../services/humiditiy-service');

async function getHumid(req, res){
    try {
        const todos = await HumidService.getHumid();
        res.status(200).json(todos);
    } catch (err) {
        console.error('Error fetching ToDo tasks:', err);
        res.status(500).send('Error fetching ToDo tasks.');
    }
}
module.exports = {
    getHumid
}