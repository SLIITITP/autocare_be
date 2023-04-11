let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/* GET users listing. */
router.get("/api/user/getuser", function (req, res, next) {
  dbConnection.query("select * from SystemUsers", (_error, result, fields) => {
    if (_error) throw _error;
    res.json(result);
  });
});

/* GET authenticate user */
router.get("/api/user/authenticate", function (req, res, next) {
  try {
    let userName = req.query.userName;
    let password = req.query.password;

    dbConnection.query(
      `select C.* from SystemUsers S
      inner join Customer C on S.CustomerID = C.AutoID
      where S.UserName = '${userName}' and S.Password = '${password}'`,
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
