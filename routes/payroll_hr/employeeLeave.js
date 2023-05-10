let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");
let SendEmail = require("./../../util/notifications/email_util");
const nodemailer = require("nodemailer"); //new

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
      "SELECT AutoID, EmployeeID, FirstName, LastName,  Email, Position, LeaveCategory, LeaveType, DATE_FORMAT(LeaveFrom, '%m/%d/%Y') AS LeaveFrom, DATE_FORMAT(LeaveTo, '%m/%d/%Y') AS LeaveTo, DATEDIFF(LeaveTo, LeaveFrom) AS DayCount, Status FROM EmployeeLeaveRequest;",
      (_error, result, fields) => {
        if (_error) console.error(_error);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

//approve or reject a leave
router.put("/api/employee/leave-request-approval", (req, res, next) => {
  try {
    let _recordID = req.body.RecordID;
    let _employeeID = req.body.EmployeeID;
    let _statusValue = req.body.Status;
    let _daycountVal = req.body.DayCount;
    let _receiverEmail = req.body.EmployeeEmail;
    let apporvalStatus = "";
    let _leaveCategory = req.body.LeaveCategory

    if (_statusValue == 0) apporvalStatus = "is still pending";
    else if (_statusValue == 1) apporvalStatus = "has been accepted";
    else if (_statusValue == 2) apporvalStatus = "has been rejected";

    let sqlQuery = `call USP_UpdateLeaveRequest(?,?,?,?)`;
    dbConnection.query(
      sqlQuery,
      [_recordID, _employeeID, _statusValue, _daycountVal, _leaveCategory],
      (_error, result, fields) => {
        if (_error) {
          console.error(_error);
          res.status(500).send({ error: "Internal Server Error" });
          return;
        }

        console.log(result);

        // send email notification
        try {
          // retrieve email from database
          let emailQuery = `SELECT Email FROM EmployeeLeaveRequest WHERE EmployeeID = ?`;
          dbConnection.query(
            emailQuery,
            [_employeeID],
            (error, emailResult, fields) => {
              if (error) {
                console.error(error);
                return;
              }

              console.log(emailResult);

              //set & pass necessary info as like line 161 and pass it to the function line 169
              let emailObject = {
                receiverEmail: _receiverEmail,
                emailSubject: "Leave Approval Notice",
                emailTextBody: "",
                emailHtmlBody: `<h1>Leave Approval Notice</h1>
                <p>Dear Employee, <br><br> This is to inform you that your leave ${apporvalStatus}.
                  <br><br>Thanks & Regards,<br><b>AutoCare HR Team</b></p>`,
              };
              SendEmail(emailObject);
            }
          );
        } catch (error) {
          console.error(error);
        }

        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
