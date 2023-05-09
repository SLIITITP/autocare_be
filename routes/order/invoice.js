let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

// Route to get last entered order data
router.get('/invoicedata/last', (req, res) => {

  db.query('SELECT OrderID, FName, LName, Email, Address, PayMethod FROM Orders ORDER BY OrderID DESC LIMIT 1', (error, results) => {
    if (error) {
      res.status(500).send('Error retrieving order data');
    } else {
      res.status(200).send(results[0]);
    }

  });

});


//list order
router.get("/api/order/list-cart-det", (req, res, next) => {
    try {
      dbConnection.query(
        "SELECT * FROM Cart",
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
