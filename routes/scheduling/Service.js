let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//Add an employee
router.post("/api/customer/add-service-appointment", (req, res, next) => {
  try {
    let ServiceInfo = req.body.ServiceInfo;
    

    let sqlQuery = `call USP_AddCusAppoint(?)`;
    dbConnection.query(
      sqlQuery,
      [ServiceInfo],
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
router.put("/api/customer/update-service-appointment", (req, res, next) => {
  try {
    let ID = req.body.ID;
    let ServiceInfo = req.body.ServiceInfo;
    

    let sqlQuery = `call USP_UpdateCusAppoint(?,?)`;
    dbConnection.query(
      sqlQuery,
      [ID, ServiceInfo],
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
router.get("/api/customer/list-service-appointment", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM VehicleServiceAppointment",
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
router.get("/api/customer/get-service-appointment", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.ServiceID;
    dbConnection.query(
      `call USP_GetServiceStationInfo(${id})`,
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
