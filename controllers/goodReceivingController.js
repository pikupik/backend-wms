const goodReceivingModel = require('../models/goodReceivingModel');

// Get all good receiving records
const getAllGoodReceivings = async (req, res) => {
  try {
    const goodReceivings = await goodReceivingModel.getAllGoodReceivings();
    res.json(goodReceivings);
  } catch (error) {
    console.error("Error getting all good receivings:", error);
    res.status(500).json({ message: "Failed to get good receiving records" });
  }
};

// Filter good receiving records
const filterGoodReceivings = async (req, res) => {
  const criteria = req.query;
  try {
    const filteredGoodReceivings = await goodReceivingModel.filterGoodReceivings(criteria);
    res.json(filteredGoodReceivings);
  } catch (error) {
    console.error("Error filtering good receivings:", error);
    res.status(500).json({ message: "Failed to filter good receiving records" });
  }
};

// Get a single good receiving record by ID
const getGoodReceivingById = async (req, res) => {
  const { receiving_id } = req.params;
  try {
    const goodReceiving = await goodReceivingModel.findGoodReceivingById(receiving_id);
    if (goodReceiving) {
      res.json(goodReceiving);
    } else {
      res.status(404).json({ message: "Good receiving record not found" });
    }
  } catch (error) {
    console.error("Error getting good receiving by ID:", error);
    res.status(500).json({ message: "Failed to get good receiving record" });
  }
};

// Add a new good receiving record
const addGoodReceiving = async (req, res) => {
  const data = req.body;
  try {
    const result = await goodReceivingModel.addGoodReceiving(data);
    res.status(201).json({ message: "Good receiving record added successfully", result });
  } catch (error) {
    console.error("Error adding good receiving record:", error);
    res.status(500).json({ message: "Failed to add good receiving record" });
  }
};

// Delete a good receiving record by ID
const deleteGoodReceiving = async (req, res) => {
  const { receiving_id } = req.params;
  try {
    const result = await goodReceivingModel.deleteGoodReceiving(receiving_id);
    if (result.affectedRows > 0) {
      res.json({ message: "Good receiving record deleted successfully" });
    } else {
      res.status(404).json({ message: "Good receiving record not found" });
    }
  } catch (error) {
    console.error("Error deleting good receiving record:", error);
    res.status(500).json({ message: "Failed to delete good receiving record" });
  }
};

module.exports = {
  getAllGoodReceivings,
  filterGoodReceivings,
  getGoodReceivingById,
  addGoodReceiving,
  deleteGoodReceiving
};
