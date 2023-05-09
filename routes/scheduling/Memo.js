let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

router.get('/api/get-memo-details', (req, res) => {
  try {
    const sqlQuery = 'SELECT * FROM VehicleServiceAppointment';

    dbConnection.query(sqlQuery, [req.params.id], (error, result) => {
      if (error) throw error;
      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});

router.get('/api/memo-carwash-detail', (req, res) => {
  try {
    const sqlQuery = 'SELECT * FROM SchedulingAppointment';

    dbConnection.query(sqlQuery, (error, result) => {
      if (error) throw error;
      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});

router.get('/api/memo-sercive-details', (req, res) => {
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

module.exports = router;