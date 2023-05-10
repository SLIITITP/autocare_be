let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//Add an employee
router.post("/api/customer/add-carwash-appointment", (req, res, next) => {
  try {
    let AppointmentInfo = req.body.AppointmentInfo;

    let sqlQuery = `call USP_AddAppointment(?)`;
    dbConnection.query(
      sqlQuery,
      [AppointmentInfo],
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
router.put("/api/customer/update-carwash-appointment", (req, res, next) => {
  try {
    let ID = req.body.ID;
    let AppointmentInfo = req.body.AppointmentInfo;

    let sqlQuery = `call USP_UpdateAppointment(?,?)`;
    dbConnection.query(
      sqlQuery,
      [ID, AppointmentInfo],
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
router.get("/api/customer/list-carwash-appointment", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM SchedulingAppointment",
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
router.get("/api/customer/get-carwash-appointment", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.carwashID;
    dbConnection.query(
      `call USP_GetAppointInfo(${id})`,
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
