//import the required libraries
const express = require('express');
const router = express.Router();
const dbConnection = require('./../../util/db-helper/db_connection');

//endpoint for inserting a new supplier
router.post('/api/cancel-sercive-station', (req, res) => {
  try {
    const serviceData = req.body;
    const sqlQuery = 'INSERT INTO VehicleServiceAppointment (fname,lname,phone,email,vnum,vtype,date) VALUES (?, ?, ?, ?, ?,?,?)';

    dbConnection.query(sqlQuery, [serviceData.fname, serviceData.lname, serviceData.phone, serviceData.email, serviceData.vnum, serviceData.vtype, serviceData.date], (error, result) => {
      if (error) throw error;
      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});


//endpoint for updating supplier data
router.put('/api/cancel-sercive-station/:id', (req, res) => {
    try {
      const serviceData = req.body;
      const sqlQuery = 'UPDATE VehicleServiceAppointment SET fname = ?, lname = ?, phone = ?, email = ?, vnum = ?, vtype = ?, date = ? WHERE ID = ?';
  
      dbConnection.query(sqlQuery, [serviceData.fname, serviceData.lname, serviceData.phone, serviceData.email, serviceData.vnum, serviceData.vtype, serviceData.date, req.params.id], (error, result) => {
        if (error) throw error;
        console.log(result);
        res.json(result);
      });
    } catch (error) {
      console.error(error);
    }
  });
  
  //endpoint for deleting supplier data
  router.delete('/api/cancel-sercive-station/:id', (req, res) => {
    try {
      const sqlQuery = 'DELETE FROM VehicleServiceAppointment WHERE ID = ?';
  
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
  router.get('/api/cancel-sercive-station', (req, res) => {
    try {
      const sqlQuery = 'SELECT * FROM VehicleServiceAppointment';
  
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
  router.get('/api/cancel-sercive-station/:id', (req, res) => {
    try {
      const sqlQuery = 'SELECT * FROM VehicleServiceAppointment WHERE ID = ?';
  
      dbConnection.query(sqlQuery, [req.params.id], (error, result) => {
        if (error) throw error;
        console.log(result);
        res.json(result);
      });
    } catch (error) {
      console.error(error);
    }
  });
  

    //date
    router.get('/api/date-sercive-station', (req, res) => {
      try {
        const sqlQuery = 'SELECT date FROM db_vehicle_service.VehicleServiceAppointment';
    
        dbConnection.query(sqlQuery, (error, result) => {
          if (error) throw error;
          console.log(result);
          res.json(result);
        });
      } catch (error) {
        console.error(error);
      }
    });

    //date car wash
    router.get('/api/date-carwash-station', (req, res) => {
      try {
        const sqlQuery = 'SELECT date FROM db_vehicle_service.SchedulingAppointment';
    
        dbConnection.query(sqlQuery, (error, result) => {
          if (error) throw error;
          console.log(result);
          res.json(result);
        });
      } catch (error) {
        console.error(error);
      }
    });
    
  
module.exports = router;