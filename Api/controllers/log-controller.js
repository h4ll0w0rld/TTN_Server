const LogService = require('../services/log-service');
const path = require('path');
require('dotenv').config();


async function addLog(req, res) {
    const { headline, description, potId } = req.body;
    const imagePath = req.file ? req.file.path : null;
    try {
        await LogService.addLog(headline, description, imagePath, potId);
        res.status(200).send('Logg added');
    } catch (error) {
        console.error('Error adding log :', error);
        res.status(400).send(error.message);
    }
};




async function getLog(req, res) {
    const { potId } = req.params;
    try {
        const results = await LogService.getLogs(potId);
        const logs = results.map(log => ({
            ...log,
            image: log.image ? `${process.env.BASE_URL}/uploads/${path.basename(log.image)}` : null
          }));
        res.status(200).send(logs);
    } catch (error) {
        console.error('Error getting logs:', error);
        res.status(400).send(error.message);
    }
};

module.exports = {
    addLog,
    getLog

}