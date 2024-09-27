const express = require('express');
const router = express.Router();
const goodReceivingController = require('../controllers/goodReceivingController');

router.get('/', goodReceivingController.getAllGoodReceivings);
router.get('/filter', goodReceivingController.filterGoodReceivings);
router.get('/:receiving_id', goodReceivingController.getGoodReceivingById);
router.post('/add', goodReceivingController.addGoodReceiving);
router.delete('/:receiving_id', goodReceivingController.deleteGoodReceiving);

module.exports = router;
