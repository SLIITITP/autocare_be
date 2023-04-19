let express = require("express");
let router = express.Router();
let dbConnection = require("../../util/db-helper/db_connection");

router.get("/api/customer/confirm-appointment", (req, res, next) => {
    try {
      dbConnection.query(
        "SELECT * FROM SchedulingAppointment",
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

module.exports = router;