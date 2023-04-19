let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//update return stock
router.put("/api/employee/update-Appointment", (req, res, next) => {
    try {
      let EmpID = req.body.ID;
        
      let sqlQuery = `call USP_UpdateAppointment(?,?,?,?,?)`;
      dbConnection.query(
        sqlQuery,
        [EmpID],
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