const express = require('express');
const router = express.Router();
const crimeController = require('../controllers/crimeController');
// Define routes
router.post('/', crimeController.createCrime);
router.get('/', crimeController.getCrimes);
router.get('/:id', crimeController.getCrimeById);
router.put('/:id', crimeController.updateCrime);
router.delete('/:id', crimeController.deleteCrime);
module.exports = router;