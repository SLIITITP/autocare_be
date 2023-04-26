let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add leave form data*/
router.post("/api/employee/leave-request-form", (req, res, next) => {
  try {
    let LeaveInfo = req.body.LeaveInfo;

    let sqlQuery = `call USP_AddEmpLeave(?)`;
    dbConnection.query(sqlQuery, [LeaveInfo], (_error, result, fields) => {
      if (_error) throw _error;

      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});

//list-leave info data
router.get("/api/employee/leave-approval", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT AutoID, EmployeeID, FirstName, LastName, Position, LeaveCategory, LeaveType, DATE_FORMAT(LeaveFrom, '%m/%d/%Y') AS LeaveFrom, DATE_FORMAT(LeaveTo, '%m/%d/%Y') AS LeaveTo, DayCount, Status FROM EmployeeLeaveRequest;",
      (_error, result, fields) => {
        if (_error) console.error(_error);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

//update leave-request
router.put("/api/employee/leave-request-approval", (req, res, next) => {
  try {
    let _employeeID = req.body.EmployeeID;
    let _statusValue = req.body.Status;

    let sqlQuery = `call USP_UpdateLeaveRequest(?,?)`;
    dbConnection.query(
      sqlQuery,
      [_employeeID, _statusValue],
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
