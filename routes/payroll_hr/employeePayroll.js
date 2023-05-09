let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//get all employee attendance log for given date range
router.get("/api/employee-payroll/employee-attendance", (req, res, next) => {
  try {
    let _startDate = req.query.StartDate;
    let _endDate = req.query.EndDate;

    dbConnection.query(
      `select A.AutoID, A.EmployeeID, A.RecordDate, 
      (timestampdiff(MINUTE, A.TimeIn, A.TimeOut)/60)-1 WorkedHours
      from EmployeeAttendance A where A.RecordDate between '${_startDate}' and '${_endDate}'  order by A.EmployeeID, A.RecordDate`,
      (_error, result, fields) => {
        if (_error) {
          console.error(_error);
          res.sendStatus(500);
        }
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

//get company calendar for given date range
router.get("/api/employee-payroll/company-calendar", (req, res, next) => {
  try {
    let _startDate = req.query.StartDate;
    let _endDate = req.query.EndDate;

    dbConnection.query(
      `select * from CompanyCalendar C where C.CalendarDate between '${_startDate}' and '${_endDate}' order by C.CalendarDate`,
      (_error, result, fields) => {
        {
          console.error(_error);
          //res.sendStatus(500);
        }
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
