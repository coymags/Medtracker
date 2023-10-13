const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');

// GET all pharmacies
router.get('/pharmacies', pharmacyController.getAllPharmacies);

// CREATE a new pharmacy
router.post('/pharmacies', pharmacyController.createPharmacy);

// UPDATE a pharmacy by ID
router.put('/pharmacies/:id', pharmacyController.updatePharmacy);

// DELETE a pharmacy by ID
router.delete('/pharmacies/:id', pharmacyController.deletePharmacy);

module.exports = router;
