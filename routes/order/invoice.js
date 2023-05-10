let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

// Route to get last entered order data
router.get("/invoicedata/last", (req, res) => {
  dbConnection.query(
    "SELECT OrderID, FName, LName, Email, Address, PayMethod FROM Orders ORDER BY OrderID DESC LIMIT 1",
    (error, results) => {
      if (error) {
        res.status(500).send("Error retrieving order data");
      } else {
        res.status(200).send(results[0]);
      }
    }
  );
});

module.exports = router;
