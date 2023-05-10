let express = require("express");
let router = express.Router();
let dbConnection = require("../../util/db-helper/db_connection");

//add raise ticket form data
router.post("/api/customer/raise-ticket-form", (req, res, next) => {
  try {
    let TicketInfo = req.body.TicketInfo;
    console.log(TicketInfo);
    let sqlQuery = `call USP_AddTicket(?)`;
    dbConnection.query(sqlQuery, [TicketInfo], (_error, result, fields) => {
      if (_error) throw _error;

      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});

//list tickets
router.get("/api/customer/list-raise-ticket", (req, res, next) => {
  try {
    dbConnection.query("SELECT * FROM TicketInfo", (_error, result, fields) => {
      if (_error) console.error(_error);

      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
