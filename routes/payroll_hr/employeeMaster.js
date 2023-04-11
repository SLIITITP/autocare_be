let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add an employee*/
router.post("/api/employee/add-employee", (req, res, next) => {
  try {
    let BasicInfo = req.body.BasicInfo;
    let JobInfo = req.body.JobInfo;

    let sqlQuery = `call USP_AddEmployee(?,?)`;
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