// backend/controllers/inboundDeliveryController.js
const inboundDeliveryModel = require('../models/inboundDeliveryModel');

// Mendapatkan semua inbound deliveries
const getAllInboundDeliveries = async (req, res) => {
  try {
    const deliveries = await inboundDeliveryModel.getAllInboundDeliveries();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menambahkan inbound delivery baru
const addInboundDelivery = async (req, res) => {
  try {
    const result = await inboundDeliveryModel.addInboundDelivery(req.body);
    res.status(201).json({ message: 'Inbound Delivery added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menghapus inbound delivery berdasarkan ID
const deleteInboundDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    await inboundDeliveryModel.deleteInboundDelivery(id);
    res.json({ message: 'Inbound Delivery deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menemukan satu inbound delivery berdasarkan ID
const findInboundDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await inboundDeliveryModel.findInboundDeliveryById(id);
    if (delivery) {
      res.json(delivery);
    } else {
      res.status(404).json({ message: 'Inbound Delivery not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Memfilter inbound deliveries berdasarkan kriteria tertentu
const filterInboundDeliveries = async (req, res) => {
  try {
    const filters = req.query;
    const deliveries = await inboundDeliveryModel.filterInboundDeliveries(filters);
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllInboundDeliveries,
  addInboundDelivery,
  deleteInboundDelivery,
  findInboundDeliveryById,
  filterInboundDeliveries,
};
