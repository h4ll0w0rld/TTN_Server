const HumidService = require('../services/humiditiy-service');

//returns all available humidity data
async function getHumid(req, res){
    try {
        const response = await HumidService.getHumid();
        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching ToDo tasks:', err);
        res.status(500).send('Error fetching ToDo tasks.');
    }
}
module.exports = {
    getHumid
}