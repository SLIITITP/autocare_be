let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/* GET users listing. */
router.get("/api/user/getuser", function (req, res, next) {
  dbConnection.query("select * from SystemUsers", (_error, result, fields) => {
    if (_error) {
      console.error(_error);
      res.sendStatus(500);
    }
    res.json(result);
  });
});

/* GET authenticate user */
router.get("/api/user/authenticate", function (req, res, next) {
  try {
    let userName = req.query.userName;
    let password = req.query.password;

    dbConnection.query(
      `select C.AutoID CusID, C.FirstName CusFirstName, C.LastName CusLastName, C.Email CusEmail,
      E.AutoID EmpID, E.FName EmpFirstName, E.LName EmpLastName, E.Email EmpEmail, E.EPFNo,
      SM.AutoID SysManID, SM.FName SysManFName, SM.LName SysManLName, SM.Email SysManEmail, SM.Mobile SysManMobile 
      from SystemUsers S
      left join Customer C on S.CustomerID = C.AutoID
      left join EmployeeBasicInfo E on S.EmployeeID = E.AutoID
      left join SystemManager SM on SM.AutoID = S.SysManagerID
      where S.UserName = '${userName}' and S.Password = '${password}'`,
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
