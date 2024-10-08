const HumidService = require('../services/humiditiy-service');

//add sensor value to db
async function addSensVal(req, res) {
    const reqBody = req.body.decoded_payload

    const moistSens = {
        devId: req.body.uplink_message.decoded_payload.id,
        humidity: req.body.uplink_message.decoded_payload.humidity,
        time: new Date(req.body.uplink_message.settings.time)
    }
   
    HumidService.saveHumidityData(moistSens.devId, moistSens.humidity, moistSens.time);
    res.status(200).json({ message: 'Success!' });

}
module.exports = {
    addSensVal
}