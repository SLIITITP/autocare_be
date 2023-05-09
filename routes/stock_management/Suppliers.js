//import the required libraries
const express = require('express');
const router = express.Router();
const dbConnection = require('./../../util/db-helper/db_connection');

//endpoint for inserting a new supplier
router.post('/api/supplier', (req, res) => {
  try {
    const supplierData = req.body;
    const sqlQuery = 'INSERT INTO suppliers (SupplierName, Address, Email, Telephone, ProductCategory,ProductSubCategory,Product) VALUES (?, ?, ?, ?, ?,?,?)';

    dbConnection.query(sqlQuery, [supplierData.SupplierName, supplierData.Address, supplierData.Email, supplierData.Telephone, supplierData.ProductCategory, supplierData.ProductSubCategory, supplierData.Product], (error, result) => {
      if (error) throw error;
      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});


//endpoint for updating supplier data
router.put('/api/supplier/:id', (req, res) => {
    try {
      const supplierData = req.body;
      const sqlQuery = 'UPDATE suppliers SET SupplierName = ?, Address = ?, Email = ?, Telephone = ?, ProductCategory = ?, ProductSubCategory = ?, Product = ? WHERE supID = ?';
  
      dbConnection.query(sqlQuery, [supplierData.SupplierName, supplierData.Address, supplierData.Email, supplierData.Telephone, supplierData.ProductCategory, supplierData.ProductSubCategory, supplierData.Product, req.params.id], (error, result) => {
        if (error) throw error;
        console.log(result);
        res.json(result);
      });
    } catch (error) {
      console.error(error);
    }
  });
  
  //endpoint for deleting supplier data
  router.delete('/api/supplier/:id', (req, res) => {
    try {
      const sqlQuery = 'DELETE FROM suppliers WHERE supID = ?';
  
      dbConnection.query(sqlQuery, [req.params.id], (error, result) => {
        if (error) throw error;
        console.log(result);
        res.json(result);
      });
    } catch (error) {
      console.error(error);
    }
  });
  
  //endpoint for fetching all supplier data
  router.get('/api/supplier', (req, res) => {
    try {
      const sqlQuery = 'SELECT * FROM suppliers';
  
      dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.json(result);
      });
    } catch (error) {
      console.error(error);
    }
  });
  
  //endpoint for fetching a single supplier data by ID
  router.get('/api/supplier/:id', (req, res) => {
    try {
      const sqlQuery = 'SELECT * FROM suppliers WHERE supID = ?';
  
      dbConnection.query(sqlQuery, [req.params.id], (error, result) => {
        if (error) throw error;
        console.log(result);
        res.json(result);
      });
    } catch (error) {
      console.error(error);
    }
  });
  

  
module.exports = router;
