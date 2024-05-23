const PotService = require('../services/pot-service');


async function addPot(req, res) {
    try {
        const { name, description, sensId } = req.body;
        await PotService.createPot(name, description, sensId);
        res.status(200).json("Created pot");
    } catch (err) {
        console.error('Error fetching ToDo tasks:', err);
        res.status(500).send('Error fetching ToDo tasks.');
    }
}

async function addLog(req, res) {

    try {
        const { potId, logId } = req.body;
        await PotService.addLog(potId, logId);
        res.status(200).json("Log added");
    } catch (err) {
        console.error('Error fetching ToDo tasks:', err);
        res.status(500).send('Error fetching ToDo tasks.');
    }

}

async function getPots(req, res) {
    try {
        const pots = await PotService.getPots();
        res.status(200).json(pots);
    } catch (err) {
        console.error('Error fetching ToDo tasks:', err);
        res.status(500).send('Error fetching ToDo tasks.');
    }


}

async function delPot(req, res) {
    try {
        const { potId } = req.body;
        console.log("Dealing with: ", req.body)
        const response =  await PotService.delPot(potId);
        res.status(200).json("Pot deleted", response);
    } catch (err) {
        console.error('Error deleting Pot:', err);
        res.status(500).send('Error deleting Pot');
    }

}


async function delLog(req, res) {
    try {
        const { potId, logId } = req.body;
       
        const response = await PotService.delLog(potId, logId);
        res.status(200).json("Log detatched", response);
    } catch (err) {
        console.error('Error fetching ToDo tasks:', err);
        res.status(500).send('Error fetching ToDo tasks.');
    }

}


module.exports = {
    addPot,
    addLog,
    getPots,
    delPot,
    delLog

};