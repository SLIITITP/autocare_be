let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add Inventory Login Info*/
router.post("/api/inventoryLogin/add-inventoryLogin", (req, res, next) => {
  try {
    let  InventoryLogDetails = req.body.InventoryLogDetails;

    let sqlQuery = `call USP_AddInventoryLoginDetails(?)`;
    dbConnection.query(
      sqlQuery,
      [InventoryLogDetails],
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