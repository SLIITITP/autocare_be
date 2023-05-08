let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//Add order
router.post("/api/order/add-orderdet", (req, res, next) => {
  try {
    let OrderDetails = req.body.OrderDetails;
    let cartDetail = req.body.cartDetail;


    let sqlQuery = `call USP_AddOrder(?)`;
    dbConnection.query(
      sqlQuery,
      [OrderDetails/*, cartDetail*/],
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

//update order
router.put("/api/order/update-orders", (req, res, next) => {
  try {
    let OrderID = req.body.OrderID;
    let OrderDetails = req.body.OrderDetails;
    let cartDetail = req.body.cartDetail;


    let sqlQuery = `call USP_UpdateOrder(?,?,?)`;
    dbConnection.query(
      sqlQuery,
      [OrderID, OrderDetails, cartDetail],
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

//Update 2
//endpoint for updating order data by admin

router.put('/api/order/:id', (req, res) => { 

  try { 

    const orderData = req.body; 
    const sqlQuery = 'UPDATE Orders SET PayStatus = ? WHERE OrderID = ?'; 

    dbConnection.query(sqlQuery, [orderData.PayStatus, req.params.id], (error, result) => { 
      if (error) throw error; 
      console.log(result); 
      res.json(result); 
    }); 
  } catch (error) { 
    console.error(error); 
  } 

}); 

//list order
router.get("/api/order/list-orders", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM Orders",
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

//get order by id
router.get("/api/order/get-order", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.orderingID;
    dbConnection.query(
      `call USP_GetOrders(${id})`,
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


//endpoint for deleting data
router.delete('/api/order/:id', (req, res) => {
  try {
    const sqlQuery = 'DELETE FROM Orders WHERE OrderID = ?';

    dbConnection.query(sqlQuery, [req.params.id], (error, result) => {
      if (error) throw error;
      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
