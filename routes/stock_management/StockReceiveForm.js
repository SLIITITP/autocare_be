let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add Good Receive Details*/
router.post("/api/receiveStock/add-receiveStock", (req, res, next) => {
  try {
    let  ReceiveDetails = req.body. ReceiveDetails;
   

    let sqlQuery = `call USP_AddReceiveStock(?)`;
    dbConnection.query(
      sqlQuery,
      [ ReceiveDetails],
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