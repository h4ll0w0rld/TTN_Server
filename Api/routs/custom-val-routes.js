const express = require('express');
const { getTypes, addType,setValForType, getValByTypeId } = require('../controllers/custom-val-controller');
const authenticateToken = require('../middleware/jwt-middleware');

const router = express.Router();

//Routing requests to controller using authenticateToken as middleware to validate jwt token
router.get('/types', authenticateToken, getTypes);
router.get('/type-val/:id', authenticateToken, getValByTypeId)
router.post('/types', authenticateToken, addType );
router.post('/setval', authenticateToken, setValForType);

module.exports = router;