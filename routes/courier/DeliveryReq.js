let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add an courier*/
router.post("/api/courier/add-courier", (req, res, next) => {
  try {
    let CourierData = req.body.CourierData;
    

    let sqlQuery = `call USP_AddCourier(?)`;
    dbConnection.query(
      sqlQuery,
      [CourierData],
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