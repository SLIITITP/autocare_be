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

//update receive stock
router.put("/api/receiveStock/update-receiveStock", (req, res, next) => {
  try {
    let GoodReceiveID = req.body.GoodReceiveID ;
    let ReceiveDetails = req.body.ReceiveDetails;
   
    let sqlQuery = `call USP_UpdateReceiveStock(?,?)`;
    dbConnection.query(
      sqlQuery,
      [GoodReceiveID , ReceiveDetails],
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


//list received stock
router.get("/api/receiveStock/list-receiveStock", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM StockReceiveDetails",
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

//get received stock by id
router.get("/api/receiveStock/get-receiveStock", (req, res, next) => {
try {
  console.log(req.query);
  let id = req.query.ReceiveID;
  dbConnection.query(
    `call USP_GetStockReceiveDetails(${id})`,
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