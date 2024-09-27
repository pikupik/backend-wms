const { format } = require('date-fns');
const db = require('../config/db');

//mengambil data goods receiving
const getAllGoodReceivings = async () => {
  const [rows] = await db.query('SELECT * FROM good_receiving')
  return rows
}

//filter good receiving records base on criteria (e.g.. by po id, supplier name)
const filterGoodReceivings = async (criteria) => {
  let query = 'SELECT * FROM good_receiving WHERE 1=1'
  const values = []
  
  //membuat query berdasarkan kriteria
  if(criteria.po_id) {
    query += ' AND po_id = ?'
    values.push(criteria.po_id)
  }
  if(criteria.supplier_name) {
    query += ' AND supplier_name = ?'
    values.push(criteria.supplier_name)
  }
  if(criteria.warehouse_id) {
    query += ' AND warehouse_id = ?'
    values.push(criteria.warehouse_id)
  }
  if(criteria.received_date) {
    query += ' AND received_date = ?'
    values.push(criteria.received_date)
  }
  if(criteria.status_condition) {
    query += ' AND status_condition = ?'
    values.push(criteria.status_condition)
  }
  if(criteria.received_by) {
    query += ' AND received_by = ?'
    values.push(criteria.received_by)
  }
  const [rows] = await db.query(query, values)
  return rows
}

//mencari good receiving records by id
const findGoodReceivingById = async (receiving_id) => {
  const [rows] = await db.query('SELECT * FROM good_receiving WHERE receiving_id = ?', [receiving_id])
  return rows.length > 0 ? rows[0] : null
}

//add new good receiving records
const addGoodReceiving = async (data) => {
  const {
    receiving_id, po_id, supplier_name, warehouse_id, received_date, item_description, quantity_received, quantity_damage, status_condition, received_by
  } = data
  
  //dapatkan waktu saat ini 
  const receivedDate = new Date()
  const formattedDate = format(receivedDate, 'yyyy-MM-dd HH:mm:ss')
  
  const [result] = await db.query(
    'INSERT INTO good_receiving (receiving_id, po_id, supplier_name, warehouse_id, received_date, item_description, quantity_received, quantity_damage, status_condition, received_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [receiving_id, po_id, supplier_name, warehouse_id, formattedDate, item_description, quantity_received, quantity_damage, status_condition, received_by]
  );
  return result;
}

//delete good_receiving by id
const deleteGoodReceiving = async (receiving_id) => {
  const [result] = await db.query('DELETE FROM good_receiving WHERE receiving_id = ?', [receiving_id])
  return result
}

module.exports = {
  getAllGoodReceivings,
  filterGoodReceivings,
  findGoodReceivingById,
  addGoodReceiving,
  deleteGoodReceiving
};