let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add Stock Orders*/
router.post("/api/stockOrder/add-stockOrder", (req, res, next) => {
  try {
    let  PurchaseOrderInfo = req.body.PurchaseOrderInfo ;
   

    let sqlQuery = `call USP_AddStockOrders(?)`;
    dbConnection.query(
      sqlQuery,
      [PurchaseOrderInfo],
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