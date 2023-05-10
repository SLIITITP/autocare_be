let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//update an courier
router.put("/api/courier/update-courier", (req, res, next) => {
    try {
        let CourierDetails = req.body.CourierDetails
  
      let sqlQuery = `call USP_UpdateCourier(?)`;
      dbConnection.query(
        sqlQuery,
        [CourierDetails],
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