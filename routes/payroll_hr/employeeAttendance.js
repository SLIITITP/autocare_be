let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add an employee*/
router.post("/api/employee/attendance", (req, res, next) => {
  try {
    let MarkAttendance = req.body.BasicInfo;
   
    let sqlQuery = `call USP_MarkAttendance(?)`;
    dbConnection.query(
      sqlQuery,
      [BasicInfo, JobInfo],
      (_error, result, fields) => {
        if (_error) throw _error;

        console.log(result);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;