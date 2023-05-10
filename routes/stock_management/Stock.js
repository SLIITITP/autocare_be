let express = require("express");
let router = express.Router();
let dbConnection = require("../../util/db-helper/db_connection");

/*Add Stock Info*/
router.post("/api/stock/add-stock", (req, res, next) => {
  try {
    let  StockDetails = req.body.StockDetails;

    let sqlQuery = `call USP_AddStock(?)`;
    dbConnection.query(
      sqlQuery,
      [StockDetails],
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

//update an stock details
router.put("/api/stock/update-stock", (req, res, next) => {
  try {
    let StorageID = req.body.StorageID;
    let StockDetails = req.body.StockDetails;
  
    let sqlQuery = `call USP_UpdateStockDetails(?,?)`;
    dbConnection.query(
      sqlQuery,
      [StorageID, StockDetails],
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

//list stock
router.get("/api/stock/list-stock", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM StockInfo",
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

//get stock by id
router.get("/api/stock/get-stock", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.InventoryID;
    dbConnection.query(
      `call USP_GetStockDetails(${id})`,
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