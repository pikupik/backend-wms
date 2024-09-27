const { format } = require('date-fns');
const db = require('../config/db');

// Get all inbound deliveries
const getAllInboundDeliveries = async () => {
  const [rows] = await db.query('SELECT * FROM inbound_deliveries');
  return rows;
};

// Filter inbound deliveries based on criteria (e.g., by supplier name or warehouse id)
const filterInboundDeliveries = async (criteria) => {
  
  
  let query = 'SELECT * FROM inbound_deliveries WHERE 1=1';
  const values = [];

  // Build query based on provided criteria
  if (criteria.po_id) {
    query += ' AND po_id = ?';
    values.push(criteria.po_id);
  }
  if (criteria.supplier_name) {
    query += ' AND supplier_name = ?';
    values.push(criteria.supplier_name);
  }
  if (criteria.warehouse_id) {
    query += ' AND warehouse_id = ?';
    values.push(criteria.warehouse_id);
  }
  if (criteria.quantity_expected) {  // Changed received_date to expected_delivery_date
    query += ' AND quantity_expected = ?';
    values.push(criteria.quantity_expected);
  }
  // Add more filters as needed

  const [rows] = await db.query(query, values);
  return rows;
};

// Find a single inbound delivery by ID
const findInboundDeliveryById = async (inbound_id) => {
  const [rows] = await db.query('SELECT * FROM inbound_deliveries WHERE inbound_id = ?', [inbound_id]);
  return rows.length > 0 ? rows[0] : null;
};

// Add new inbound delivery
const addInboundDelivery = async (data) => {
    const {
        po_id, supplier_name, warehouse_id,
        item_description, quantity_expected // Changed quantity_received to quantity_expected
    } = data;

    // Get the current date as expected delivery date
    const expectedDeliveryDate = new Date(); // Now represents the expected date
    const formattedDate = format(expectedDeliveryDate, 'yyyy-MM-dd');

    const [result] = await db.query(
        'INSERT INTO inbound_deliveries (po_id, supplier_name, warehouse_id, expected_delivery_date, item_description, quantity_expected) VALUES (?, ?, ?, ?, ?, ?)',
        [po_id, supplier_name, warehouse_id, formattedDate, item_description, quantity_expected]
    );
    return result;
};

// Delete inbound delivery by ID
const deleteInboundDelivery = async (inbound_id) => {
  const [result] = await db.query('DELETE FROM inbound_deliveries WHERE inbound_id = ?', [inbound_id]);
  return result;
};

module.exports = {
  getAllInboundDeliveries,
  filterInboundDeliveries,
  findInboundDeliveryById,
  addInboundDelivery,
  deleteInboundDelivery
};
