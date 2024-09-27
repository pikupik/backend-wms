// backend/routes/inboundDelivery.js
const express = require('express');
const router = express.Router();
const inboundDeliveryController = require('../controllers/inboundDeliveryController');

// Route untuk mendapatkan semua inbound deliveries
router.get('/', inboundDeliveryController.getAllInboundDeliveries);

// Route untuk menambahkan inbound delivery baru
router.post('/add', inboundDeliveryController.addInboundDelivery);

// Route untuk menghapus inbound delivery berdasarkan ID
router.delete('/:id', inboundDeliveryController.deleteInboundDelivery);

// Route untuk menemukan satu inbound delivery berdasarkan ID
router.get('/find/:id', inboundDeliveryController.findInboundDeliveryById);

// Route untuk memfilter inbound deliveries berdasarkan kriteria tertentu
router.get('/filter', inboundDeliveryController.filterInboundDeliveries);

module.exports = router;
