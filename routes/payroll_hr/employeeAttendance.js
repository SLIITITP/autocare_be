let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//Add employee attendance
router.post("/api/employee/mark-attendance", (req, res, next) => {
  try {
    let EmpAttendance = req.body.EmpAttendance;

    let sqlQuery = `call USP_MarkAttendance(?)`;
    dbConnection.query(sqlQuery, [EmpAttendance], (_error, result, fields) => {
      if (_error) {
        console.error(_error);
      }
      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});

//get employee attendance
router.get("/api/employee/get-attendance", (req, res, next) => {
  try {
    let employeeId = req.query.EmployeeID;
    console.log(req.query);
    dbConnection.query(
      `select * from EmployeeAttendance where EmployeeID = ${employeeId} and RecordDate = CURDATE()`,
      (_error, result, fields) => {
        if (_error) {
          console.error(_error);
          res.sendStatus(500);
        }

        console.log(result);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

//list attendance
router.get("/api/employee/list-attendance", (req, res, next) => {
  try {
    dbConnection.query(
      `SELECT    AutoID, EmployeeID,    DATE_FORMAT(RecordDate, '%m/%d/%Y') AS Date,    TimeIn,    TimeOut,
        TIMEDIFF(TimeOut, TimeIn) AS 'WorkingHours'
    FROM    EmployeeAttendance`,
      (_error, result, fields) => {
        if (_error) {
          console.error(_error);
          res.sendStatus(500);
        }

        console.log(result);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
