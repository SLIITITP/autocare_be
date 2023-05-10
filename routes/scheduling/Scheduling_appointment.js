let express = require("express");
let router = express.Router();
let dbConnection = require("../../util/db-helper/db_connection");

/*Add leave form data*/
router.post("/api/employee/appointment-scheduling-request-form", (req, res, next) => {
    try{
        //req.body.AppoinmentInfo(json eke name)
        let AppoinmentInfo = req.body.AppoinmentInfo;
        
        let sqlQuery = `call USP_AddAppointment(?)`
        dbConnection.query(
            sqlQuery,
            [AppoinmentInfo],
            (_error, result, fields) => {
                if (_error) throw _error;

                console.log(result);
                res.json(result);
            }
        );
    }catch (error) {
        console.error(error);
    }
});


//
router.get("/api/customer/get-employee-customer", (req, res, next) => {
    try {
      console.log(req.query);
      let id = req.query.ID;
      dbConnection.query(
        `call USP_GetAppointmentInfo(${id})`,
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
