let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");
const nodemailer = require("nodemailer");  //new

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
      "SELECT AutoID, EmployeeID, FirstName, LastName, Position, LeaveCategory, LeaveType, DATE_FORMAT(LeaveFrom, '%m/%d/%Y') AS LeaveFrom, DATE_FORMAT(LeaveTo, '%m/%d/%Y') AS LeaveTo, DATEDIFF(LeaveTo, LeaveFrom) AS DayCount, Status FROM EmployeeLeaveRequest;",
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
/*router.put("/api/employee/leave-request-approval", (req, res, next) => {
  try {
    let _employeeID = req.body.EmployeeID;
    let _statusValue = req.body.Status;
    let _daycountVal = req.body.DayCount;

    let sqlQuery = `call USP_UpdateLeaveRequest(?,?,?)`;
    dbConnection.query(
      sqlQuery,
      [_employeeID, _statusValue,_daycountVal],
      (_error, result, fields) => {
        if (_error) console.error(_error);

        console.log(result);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
///////////////////////////////NEW///////////////////////////
try {
  const transporter = nodemiller.createTransport({
    service: "gmail",
    auth:{
      user: process.env.EMAIL ,
      pass: process.env.PASSWORD 
    }
  });

  const mailOptions = {
    from : process.env.EMAIL,
    to : dbConnection.query(
        "SELECT Email FROM EmployeeLeaveRequest;",
    (_error, result, fields) => {
      if (_error) console.error(_error);
      res.json(result);
    }
  ),
    subject : "Leave Request Form",
    html : '<h3>Your leave request is approved/rejected</h3>'

  }

  transporter.sendMail(mailOptions,(error,info) => {
    if(error) {
      console.log("Error",error)
    }else{
      console.log("Email sent" + info.response);
      res.status(201).json({status:201,info})
    }
  })

} catch (error) {
  res.status(201).json({status:401,error})
}

});*/

//new //update leave-request
router.put("/api/employee/leave-request-approval", (req, res, next) => {
  try {
    let _employeeID = req.body.EmployeeID;
    let _statusValue = req.body.Status;
    let _daycountVal = req.body.DayCount;

    let sqlQuery = `call USP_UpdateLeaveRequest(?,?,?)`;
    dbConnection.query(
      sqlQuery,
      [_employeeID, _statusValue, _daycountVal],
      (_error, result, fields) => {
        if (_error) {
          console.error(_error);
          res.status(500).send({ error: "Internal Server Error" });
          return;
        }

        console.log(result);

        // send email notification
        try {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });

          // retrieve email from database
          let emailQuery = `SELECT Email FROM EmployeeLeaveRequest WHERE EmployeeID = ?`;
          dbConnection.query(emailQuery, [_employeeID], (error, emailResult, fields) => {
            if (error) {
              console.error(error);
              return;
            }

            console.log(emailResult);

            const mailOptions = {
              from: process.env.EMAIL,
              to: emailResult[0].Email,
              subject: "Leave Request Form",
              html: "<h3>Your leave request is approved/rejected</h3>",
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log("Error", error);
              } else {
                console.log("Email sent" + info.response);
              }
            });
          });
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


//new
//send e-mail notification
/*router.post("/register", (req,res) => {
  

  try {
    const transporter = nodemiller.createTransport({
      service: "gmail",
      auth:{
        user: process.env.EMAIL ,
        pass: process.env.PASSWORD 
      }
    });

    const mailOptions = {
      from : process.env.EMAIL,
      to : dbConnection.query(
          "SELECT Email FROM EmployeeLeaveRequest;",
      (_error, result, fields) => {
        if (_error) console.error(_error);
        res.json(result);
      }
    ),
      subject : "Leave Request Form",
      html : '<h3>Your leave request is approved/rejected</h3>'

    }

    transporter.sendMail(mailOptions,(error,info) => {
      if(error) {
        console.log("Error",error)
      }else{
        console.log("Email sent" + info.response);
        res.status(201).json({status:201,info})
      }
    })

  } catch (error) {
    res.status(201).json({status:401,error})
  }
});


*/
module.exports = router;
