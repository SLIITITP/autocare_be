let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//Add an employee
router.post("/api/employee/add-employee", (req, res, next) => {
  try {
    let BasicInfo = req.body.BasicInfo;
    let JobInfo = req.body.JobInfo;
    let LeaveInfo = req.body.LeaveInfo;
    let PayrollInfo = req.body.PayrollInfo;

    let sqlQuery = `call USP_AddEmployee(?,?,?,?)`;
    dbConnection.query(
      sqlQuery,
      [BasicInfo, JobInfo, LeaveInfo, PayrollInfo],
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

//update an employee
router.put("/api/employee/update-employee", (req, res, next) => {
  try {
    let EmpID = req.body.EmployeeID;
    let BasicInfo = req.body.BasicInfo;
    let JobInfo = req.body.JobInfo;
    let LeaveInfo = req.body.LeaveInfo;
    let PayrollInfo = req.body.PayrollInfo;

    let sqlQuery = `call USP_UpdateEmployee(?,?,?,?,?)`;
    dbConnection.query(
      sqlQuery,
      [EmpID, BasicInfo, JobInfo, LeaveInfo, PayrollInfo],
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

//list employee
router.get("/api/employee/list-employee", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM EmployeeBasicInfo",
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
router.get("/api/employee/get-employee", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.EmpID;
    dbConnection.query(
      `call USP_GetEmployeeInfo(${id})`,
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

//get all employee info
router.get("/api/employee/list-employee-info", (req, res, next) => {
  try {
    dbConnection.query(
      `select B.AutoID as EmployeeID, B.EPFNo, B.FName, B.LName, B.Email, B.EmpStatus, 
      P.BasicSalary, P.OTRate, P.FuelAllowance, P.LCAllowance, P.HourlyRate, L.AnnualCount, L.CasualCount 
      from EmployeeBasicInfo B
      inner join EmployeePayrollInfo P on B.AutoID = P.EmployeeID 
      inner join EmployeeLeaveInfo L on B.AutoID = L.EmployeeID 
      inner join EmployeeJobInfo J on B.AutoID = J.EmployeeID
      order by B.AutoID`,
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
