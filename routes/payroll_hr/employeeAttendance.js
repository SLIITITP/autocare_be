let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add an employee*/
router.post("/api/employee/mark-attendance", (req, res, next) => {
  try {
    let EmpAttendance = req.body.EmpAttendance;
   
    let sqlQuery = `call USP_MarkAttendance(?)`;
    dbConnection.query(
      sqlQuery,
      [EmpAttendance],
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