let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//update an request
router.put("/api/deliveryrequest/update-deliveryrequest", (req, res, next) => {
    try {
        let RequestDetails = req.body.RequestDetails
  
      let sqlQuery = `call USP_UpdateRequest(?)`;
      dbConnection.query(
        sqlQuery,
        [RequestDetails],
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