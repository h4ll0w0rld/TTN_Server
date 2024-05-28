const CustValService = require('../services/custom-val-service');
const path = require('path');
require('dotenv').config();


async function getTypes(req, res) {
   
    try {
        const response = await CustValService.getTypes();
        res.status(200).json(response);
    } catch (error) {
        console.error('Error adding log :', error);
        res.status(400).send(error.message);
    }
};




async function addType(req, res) {
    const { name } = req.body;
    console.log("name: ", name, "req.param: ", req.params)
    try {
        const results = await CustValService.addType(name);
        
        res.status(200).send("Added Succsesfully");
    } catch (error) {
        console.error('Error getting logs:', error);
        res.status(400).send(error.message);
    }
};
async function setValForType(req, res) {
    const { id, val } = req.body;
    try {
        const results = await CustValService.setValForType(id, val);
        
        res.status(200).send("Added Succsesfully");
    } catch (error) {
        console.error('Error getting logs:', error);
        res.status(400).send(error.message);
    }
};
async function getValByTypeId(req, res) {
    const id = req.params.id;
   
    try {
        const results = await CustValService.getValByTypeId(id);
        
        res.status(200).json(results);
    } catch (error) {
        console.error('Error getting logs:', error);
        res.status(400).send(error.message);
    }
};

module.exports = {
    getTypes,
    addType,
    setValForType,
    getValByTypeId


}