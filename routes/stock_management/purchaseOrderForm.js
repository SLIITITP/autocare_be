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

//list purchase order stock
router.get("/api/stockOrder/list-stockOrder", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM StockPurchaseOrder",
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

//get purchase order stock by id
router.get("/api/stockOrder/get-stockOrder", (req, res, next) => {
try {
  console.log(req.query);
  let id = req.query.PurchaseID;
  dbConnection.query(
    `call USP_GetStockPurchaseDetails(${id})`,
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