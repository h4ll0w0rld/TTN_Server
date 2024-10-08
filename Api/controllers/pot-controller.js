const PotService = require('../services/pot-service');

//Adding new Pot 
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
//Adding a log to a given pot
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
//returns all pots
async function getPots(req, res) {
    try {
        const pots = await PotService.getPots();
        res.status(200).json(pots);
    } catch (err) {
        console.error('Error fetching ToDo tasks:', err);
        res.status(500).send('Error fetching ToDo tasks.');
    }


}
//Delete pot by id
async function delPot(req, res) {
    try {
        const { id } = req.body;
        console.log("Dealing with: ", req.body)
        const response = await PotService.delPot(id);
        res.status(200).json("Pot deleted");
    } catch (err) {
        console.error('Error deleting Pot:', err);
        res.status(500).send('Error deleting Pot');
    }

}

//remove log from pot
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

//Enables or disables the automatic watering feature
async function updateAutoWatering(req, res) {
    try {
        const potId = req.params.id;
        const { autoWateringEnabled } = req.body;
        const result = await PotService.updateAutoWatering(potId, autoWateringEnabled)
        res.status(200).json("updated");

    } catch {
        console.log("Error updating auto watering");
        res.status(500).send('Error updating auto watering');
    }

}
//updates the water threshhold needed to activate automatic watering remider
async function updateThreshhold(req, res) {
    try {
        const potId = req.params.id;
        const { threshhold } = req.body;
       
        const response = await PotService.updateThreshhold(potId, threshhold)
        res.status(200).json("updated Threshhold");

    } catch {
        console.log("Error updating auto watering");
        res.status(500).send('Error updating auto watering');

    }
}
//returns true or false depending if the feature is turned on or not
async function autoWateringEnabled(req, res) {
    try {
        
        const id = req.params.id;
        const response = await PotService.autoWateringEnabled(id)
 
        res.status(200).json(response);

    } catch {
        console.log("Error getting auto watering enabled state");
        res.status(500).send("Error getting auto watering enabled state");

    }
}
//returns current humidity threshhold
async function getHumidThreshhold(req, res) {
    try {
        const id = req.params.id;
    
        const response = await PotService.getHumidThreshhold(id)
        res.status(200).json(response);

    } catch {
        console.log("Error updating auto watering");
        res.status(500).send('Error updating auto watering');

    }
}



module.exports = {
    addPot,
    addLog,
    getPots,
    delPot,
    delLog,
    updateAutoWatering,
    updateThreshhold,
    autoWateringEnabled,
    getHumidThreshhold

};