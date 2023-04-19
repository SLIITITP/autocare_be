let express = require("express");
let router = express.Router();
let dbConnection = require("../../util/db-helper/db_connection");

router.get("/api/customer/delete-appointment", (req, res, next) => {
   
    try {
        let BasicInfo = req.body.BasicInfo;

        let sqlQuery = `call USP_DeleteAppointmentInfo(${demail})`;
        dbConnection.query(
          sqlQuery,
          [DeleteAppointmentInfo],
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