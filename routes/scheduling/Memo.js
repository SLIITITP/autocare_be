let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");
//list employee
router.get("/api/customer/list-memo", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM SchedulingAppointment WHERE email=${email}",
      (_error, result, fields) => {
        if (_error) console.error(_error);

        console.log(result);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

//get employee by id
router.get("/api/customer/get-memo", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.carwashID;
    dbConnection.query(
      `call USP_GetMemoInfo(${email})`,
      (_error, result, fields) => {
        if (_error) console.error(_error);

        console.log(result);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

router.get('/api/get-memo-details/:email', (req, res) => {
  try {
    const sqlQuery = 'SELECT * FROM VehicleServiceAppointment WHERE email = ?';

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